import logging
from datetime import datetime

from fastapi import APIRouter, Depends, logger, Query
from fastapi_pagination import Params, Page

from app.models.knowledge_base import IndexMethod
from app.rag.knowledge_base.config import init_kb_tidb_graph_store, init_kb_tidb_vector_store
from app.rag.knowledge_base.dynamic_model import get_kb_chunk_model
from app.repositories.chunk import ChunkRepo
from app.repositories.embedding_model import get_default_db_embed_model
from app.repositories.llm import get_default_db_llm, must_get_llm
from app.types import MimeTypes

from .models import (
    KnowledgeBaseDetail,
    KnowledgeBaseItem,
    CreateKnowledgeBaseRequest, ChunkItem, UpdateKnowledgeBaseRequest
)
from app.api.deps import SessionDep, CurrentSuperuserDep
from app.exceptions import (
    InternalServerError,
    KnowledgeBaseNotFoundError,
    NoVectorIndexConfiguredError,
    NoLLMConfiguredError,
    NoEmbedModelConfiguredError
)
from app.models import (
    KnowledgeBase, DocIndexTaskStatus,
)
from app.models.data_source import DataSource
from app.tasks import (
    build_kg_index_for_chunk,
    build_index_for_document,
)
from app.repositories import knowledge_base_repo, data_source_repo, document_repo
from app.tasks.knowledge_base import import_documents_for_knowledge_base, purge_knowledge_base_related_resources
from ..document.models import DocumentItem

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/admin/knowledge_bases")
def create_knowledge_base(
    session: SessionDep,
    user: CurrentSuperuserDep,
    create: CreateKnowledgeBaseRequest
) -> KnowledgeBaseDetail:
    try:
        data_sources = [
            data_source_repo.create(session, DataSource(
                name=data_source.name,
                description='',
                data_source_type=data_source.data_source_type,
                config=data_source.config,
            )) for data_source in create.data_sources
        ]

        db_llm_id = create.llm_id
        if not db_llm_id:
            default_llm = get_default_db_llm(session)
            if default_llm:
                db_llm_id = default_llm.id
            else:
                raise NoLLMConfiguredError()

        db_embed_model_id = create.embedding_model_id
        if not db_embed_model_id:
            default_embed_model = get_default_db_embed_model(session)
            if default_embed_model:
                db_embed_model_id = default_embed_model.id
            else:
                raise NoEmbedModelConfiguredError()


        knowledge_base = KnowledgeBase(
            name=create.name,
            description=create.description,
            index_methods=create.index_methods,
            llm_id=db_llm_id,
            embedding_model_id=db_embed_model_id,
            data_sources=data_sources,
            created_by=user.id,
            updated_by=user.id,
        )
        knowledge_base = knowledge_base_repo.create(session, knowledge_base)

        # Ensure the knowledge-base corresponding table schema are initialized.
        if IndexMethod.VECTOR in knowledge_base.index_methods:
            init_kb_tidb_vector_store(session, knowledge_base)

        if IndexMethod.KNOWLEDGE_GRAPH in knowledge_base.index_methods:
            init_kb_tidb_graph_store(session, knowledge_base)

        # Trigger import and index documents for knowledge base
        import_documents_for_knowledge_base.delay(knowledge_base.id)

        return knowledge_base
    except NoVectorIndexConfiguredError as e:
        raise e
    except Exception as e:
        logging.exception(e)
        raise InternalServerError()


@router.get("/admin/knowledge_bases")
def list_knowledge_bases(
    session: SessionDep,
    user: CurrentSuperuserDep,
    params: Params = Depends(),
) -> Page[KnowledgeBaseItem]:
    return knowledge_base_repo.paginate(session, params)


@router.get("/admin/knowledge_bases/{knowledge_base_id}")
def get_knowledge_base(
    session: SessionDep,
    user: CurrentSuperuserDep,
    knowledge_base_id: int,
) -> KnowledgeBaseDetail:
    try:
        return knowledge_base_repo.must_get(session, knowledge_base_id)
    except KnowledgeBaseNotFoundError as e:
        raise e
    except Exception as e:
        logger.exception(e)
        raise InternalServerError()


@router.put("/admin/knowledge_bases/{knowledge_base_id}")
def update_knowledge_base_setting(
    session: SessionDep,
    user: CurrentSuperuserDep,
    knowledge_base_id: int,
    update: UpdateKnowledgeBaseRequest
) -> KnowledgeBaseDetail:
    try:
        knowledge_base = knowledge_base_repo.must_get(session, knowledge_base_id)
        knowledge_base.name = update.name
        knowledge_base.description = update.description
        knowledge_base.index_methods = update.index_methods
        knowledge_base.updated_by = user.id

        if update.llm_id:
            knowledge_base.llm_id = must_get_llm(session, update.llm_id).id
        else:
            knowledge_base.llm_id = get_default_db_llm(session).id

        data_sources = []
        for update_data_source in update.data_sources:
            if update_data_source.id is None:
                logger.info(f"Create data source <{update_data_source.name}> for knowledge base <{knowledge_base.name}>")
                data_source = data_source_repo.create(session, DataSource(
                    name=update_data_source.name,
                    description='',
                    data_source_type=update_data_source.data_source_type,
                    config=update_data_source.config,
                ))
            else:
                data_source = data_source_repo.get(session, update_data_source.id)
                data_source.name = update_data_source.name
                data_source.config = update_data_source.config
            data_sources.append(data_source)

        knowledge_base.data_sources = data_sources

        # Ensure the knowledge-base corresponding table schema are initialized.
        if IndexMethod.VECTOR in knowledge_base.index_methods:
            init_kb_tidb_vector_store(session, knowledge_base)

        if IndexMethod.KNOWLEDGE_GRAPH in knowledge_base.index_methods:
            init_kb_tidb_graph_store(session, knowledge_base)

        session.add(knowledge_base)
        session.commit()

        # TODO: trigger update the indexes.

        return knowledge_base
    except KnowledgeBaseNotFoundError as e:
        raise e
    except NoVectorIndexConfiguredError as e:
        raise e
    except Exception as e:
        logging.exception(e)
        raise InternalServerError()

@router.delete("/admin/knowledge_bases/{knowledge_base_id}")
def delete_knowledge_base(
    session: SessionDep,
    user: CurrentSuperuserDep,
    knowledge_base_id: int
):
    try:
        knowledge_base = knowledge_base_repo.must_get(session, knowledge_base_id)
        knowledge_base_repo.delete(session, knowledge_base)

        # Trigger purge knowledge base related resources after 5 seconds.
        purge_knowledge_base_related_resources.apply_async(
            args=[knowledge_base_id],
            countdown=5
        )

        return {
            "detail": f"Knowledge base #{knowledge_base_id} is deleted successfully"
        }
    except KnowledgeBaseNotFoundError as e:
        raise e
    except Exception as e:
        logger.exception(e)
        raise InternalServerError()


@router.get("/admin/knowledge_bases/{knowledge_base_id}/overview")
def get_knowledge_base_index_overview(
    session: SessionDep,
    user: CurrentSuperuserDep,
    knowledge_base_id: int,
) -> dict:
    try:
        knowledge_base = knowledge_base_repo.must_get(session, knowledge_base_id)
        return knowledge_base_repo.get_index_overview(session, knowledge_base)
    except KnowledgeBaseNotFoundError as e:
        raise e
    except Exception as e:
        logger.exception(e)
        raise InternalServerError()


@router.get("/admin/knowledge_bases/{kb_id}/documents")
def list_knowledge_base_documents(
    session: SessionDep,
    user: CurrentSuperuserDep,
    kb_id: int,
    # TODO: wrapper these parameters in a DocumentQuery model.
    params: Params = Depends(),
    name: str | None = Query(
        None,
        description="[Fuzzy Match] name field, will search for the name that contains the given string."
    ),
    source_uri: str | None = Query(
        None,
        description="[Fuzzy Match] source URI field, will search for the source URI that contains the given string."
    ),
    created_at_start: datetime | None = None,
    created_at_end: datetime | None = None,
    updated_at_start: datetime | None = None,
    updated_at_end: datetime | None = None,
    last_modified_at_start: datetime | None = None,
    last_modified_at_end: datetime | None = None,
    mime_type: MimeTypes | None = None,
    index_status: DocIndexTaskStatus | None = None,
) -> Page[DocumentItem]:
    try:
        kb = knowledge_base_repo.must_get(session, kb_id)
        return document_repo.paginate(
            session=session,
            params=params,
            source_uri=source_uri,
            knowledge_base_id=kb.id,
            created_at_start=created_at_start,
            created_at_end=created_at_end,
            updated_at_start=updated_at_start,
            updated_at_end=updated_at_end,
            last_modified_at_start=last_modified_at_start,
            last_modified_at_end=last_modified_at_end,
            name=name,
            mime_type=mime_type,
            index_status=index_status,
        )
    except KnowledgeBaseNotFoundError as e:
        raise e
    except Exception as e:
        logger.exception(e)
        raise InternalServerError()


@router.get("/admin/knowledge_bases/{kb_id}/documents/{doc_id}/chunks")
def list_knowledge_base_chunks(
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
def batch_reindex_knowledge_base_documents(
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


@router.post("/admin/knowledge_bases/{kb_id}/retry-failed-index-tasks")
def retry_failed_tasks(
    session: SessionDep,
    user: CurrentSuperuserDep,
    kb_id: int,
) -> dict:
    try:
        kb = knowledge_base_repo.must_get(session, kb_id)

        document_ids = knowledge_base_repo.set_failed_documents_status_to_pending(session, kb)
        for document_id in document_ids:
            build_index_for_document.delay(kb_id, document_id)
        logger.info(f"Reindex {len(document_ids)} documents that failed to built vector index." )

        chunk_ids = knowledge_base_repo.set_failed_chunks_status_to_pending(session, kb)
        for chunk_id in chunk_ids:
            build_kg_index_for_chunk.delay(kb_id, chunk_id)
        logger.info(f"Reindex {len(chunk_ids)} chunks that failed to built knowledge graph index." )

        return {
            "detail": f"Triggered {len(document_ids)} documents and {len(chunk_ids)} chunks to reindex knowledge base #{kb_id} successfully"
        }
    except KnowledgeBaseNotFoundError as e:
        raise e
    except Exception as e:
        logger.exception(e)
        raise InternalServerError()