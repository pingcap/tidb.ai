import logging
from typing import Annotated

from fastapi import APIRouter, Depends, Query
from fastapi_pagination import Params, Page

from app.api.admin_routes.knowledge_base.data_sources.models import KBDataSource
from app.api.admin_routes.knowledge_base.document.models import KBDocumentUpload, DocumentFilters, DocumentItem
from app.api.admin_routes.knowledge_base.models import ChunkItem
from app.api.admin_routes.knowledge_base.routes import logger
from app.api.deps import SessionDep, CurrentSuperuserDep
from app.exceptions import (
    InternalServerError,
    KBDataSourceNotFoundError,
    KnowledgeBaseNotFoundError
)
from app.models import DataSource
from app.models.chunk import get_kb_chunk_model
from app.repositories import knowledge_base_repo, document_repo
from app.repositories.chunk import ChunkRepo
from app.tasks import build_index_for_document, build_kg_index_for_chunk
from app.tasks.knowledge_base import (
    import_documents_from_kb_datasource,
    purge_kb_datasource_related_resources
)


router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/admin/knowledge_bases/{kb_id}/documents/upload")
def upload_kb_document(
    session: SessionDep,
    user: CurrentSuperuserDep,
    kb_id: int,
    upload: KBDocumentUpload
) -> KBDataSource:
    try:
        kb = knowledge_base_repo.must_get(session, kb_id)
        new_data_source = DataSource(
            name=upload.name,
            description="",
            data_source_type=upload.data_source_type,
            config=upload.config,
        )
        new_data_source = knowledge_base_repo.add_kb_datasource(session, kb, new_data_source)

        import_documents_from_kb_datasource.delay(kb_id, new_data_source.id)

        return new_data_source
    except KnowledgeBaseNotFoundError as e:
        raise e
    except Exception as e:
        logger.error(f"Failed to create data source for knowledge base #{kb_id}: {e}", exc_info=e)
        raise InternalServerError()


@router.get("/admin/knowledge_bases/{kb_id}/documents")
def list_kb_documents(
    session: SessionDep,
    user: CurrentSuperuserDep,
    kb_id: int,
    filters: Annotated[DocumentFilters, Query()],
    params: Params = Depends(),
) -> Page[DocumentItem]:
    try:
        kb = knowledge_base_repo.must_get(session, kb_id)
        filters.knowledge_base_id = kb.id
        return document_repo.paginate(
            session=session,
            filters=filters,
            params=params,
        )
    except KnowledgeBaseNotFoundError as e:
        raise e
    except Exception as e:
        logger.exception(e)
        raise InternalServerError()


@router.get("/admin/knowledge_bases/{kb_id}/documents/{doc_id}/chunks")
def list_kb_chunks(
    session: SessionDep,
    user: CurrentSuperuserDep,
    kb_id: int,
    doc_id: int,
) -> list[ChunkItem]:
    try:
        kb = knowledge_base_repo.must_get(session, kb_id)
        chunk_repo = ChunkRepo(get_kb_chunk_model(kb))
        return chunk_repo.get_document_chunks(session, doc_id)
    except KnowledgeBaseNotFoundError as e:
        raise e
    except Exception as e:
        logger.exception(e)
        raise InternalServerError()


@router.post("/admin/knowledge_bases/{kb_id}/documents/reindex")
def batch_reindex_kb_documents(
    session: SessionDep,
    user: CurrentSuperuserDep,
    kb_id: int,
    document_ids: list[int]
) -> dict:
    try:
        kb = knowledge_base_repo.must_get(session, kb_id)
        chunk_repo = ChunkRepo(get_kb_chunk_model(kb))

        for document_id in document_ids:
            build_index_for_document.delay(kb.id, document_id)

            chunks = chunk_repo.get_document_chunks(session, document_id)
            for chunk in chunks:
                build_kg_index_for_chunk.delay(kb.id, chunk.id)

        return {
            "detail": f"Triggered {len(document_ids)} documents to reindex knowledge base #{kb_id} successfully"
        }
    except KnowledgeBaseNotFoundError as e:
        raise e
    except Exception as e:
        logger.exception(e)
        raise InternalServerError()


@router.delete("/admin/knowledge_bases/{kb_id}/documents/{document_id}")
def remove_kb_document(
    session: SessionDep,
    user: CurrentSuperuserDep,
    kb_id: int,
    data_source_id: int,
):
    try:
        kb = knowledge_base_repo.must_get(session, kb_id)
        data_source = kb.must_get_data_source_by_id(data_source_id)

        # Flag the data source to be deleted, it will be deleted completely by the background job.
        knowledge_base_repo.remove_kb_document(session, kb, data_source)

        purge_kb_datasource_related_resources.delay(kb_id, data_source_id)

        return {
            "detail": "success"
        }
    except KnowledgeBaseNotFoundError as e:
        raise e
    except KBDataSourceNotFoundError as e:
        raise e
    except Exception as e:
        logger.error(f"Failed to remove data source #{data_source_id} from knowledge base #{kb_id}: {e}", exc_info=e)
        raise InternalServerError()