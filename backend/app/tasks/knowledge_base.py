from celery.utils.log import get_task_logger
from sqlalchemy import delete
from sqlmodel import Session, select

from app.celery import app as celery_app
from app.core.db import engine
from app.exceptions import KBNotFoundError
from app.models import (
    Document, KnowledgeBaseDataSource, DataSource,
)
from app.models.knowledge_base import KnowledgeBase
from app.rag.datasource import get_data_source_loader
from app.repositories import knowledge_base_repo, data_source_repo
from .build_index import build_index_for_document
from ..models.chunk import get_kb_chunk_model
from ..models.entity import get_kb_entity_model
from ..models.relationship import get_kb_relationship_model
from ..rag.knowledge_base.index_store import get_kb_tidb_vector_store, get_kb_tidb_graph_store

logger = get_task_logger(__name__)

@celery_app.task
def import_documents_for_knowledge_base(kb_id: int):
    try:
        with Session(engine) as session:
            kb = knowledge_base_repo.must_get(session, kb_id)
            data_sources = kb.data_sources
            for data_source in data_sources:
                import_documents_from_kb_datasource(kb.id, data_source.id)

        logger.info(f"Successfully imported documents for knowledge base #{kb_id}")
    except KBNotFoundError:
        logger.error(f"Knowledge base #{kb_id} is not found")
    except Exception as e:
        logger.exception(f"Failed to import documents for knowledge base #{kb_id}", exc_info=e)


@celery_app.task
def import_documents_from_kb_datasource(kb_id: int, data_source_id: int):
    try:
        with Session(engine) as session:
            kb = knowledge_base_repo.must_get(session, kb_id)
            data_source = knowledge_base_repo.must_get_kb_datasource(session, kb, data_source_id)

            logger.info(f"Loading documents from data source #{data_source_id} for knowledge base #{kb_id}")
            loader = get_data_source_loader(
                session,
                kb_id,
                data_source.data_source_type,
                data_source.id,
                data_source.user_id,
                data_source.config,
            )

            for document in loader.load_documents():
                session.add(document)
                session.commit()

                build_index_for_document.delay(kb_id, document.id)

        stats_for_knowledge_base.delay(kb_id)
        logger.info(f"Successfully imported documents for from datasource #{data_source_id}")
    except Exception as e:
        logger.exception(
            f"Failed to import documents from data source #{data_source_id} of knowledge base #{kb_id}",
            exc_info=e
        )


@celery_app.task
def stats_for_knowledge_base(knowledge_base_id: int):
    try:
        with Session(engine) as session:
            kb = knowledge_base_repo.must_get(session, knowledge_base_id)

            documents_total = knowledge_base_repo.count_documents(session, kb)
            data_sources_total = knowledge_base_repo.count_data_sources(session, kb)

            kb.documents_total = documents_total
            kb.data_sources_total = data_sources_total

            session.add(kb)
            session.commit()

        logger.info(f"Successfully running stats for knowledge base #{knowledge_base_id}")
    except KBNotFoundError:
        logger.error(f"Knowledge base #{knowledge_base_id} is not found")
    except Exception as e:
        logger.exception(f"Failed to run stats for knowledge base #{knowledge_base_id}", exc_info=e)


@celery_app.task
def purge_knowledge_base_related_resources(knowledge_base_id: int):
    """
    Purge all resources related to a knowledge base.

    Related resources:
        - documents
        - chunks
        - indexes
            - vector index
            - knowledge graph index
        - data sources
    """

    with Session(engine) as session:
        knowledge_base = knowledge_base_repo.must_get(session, knowledge_base_id, show_soft_deleted=True)
        assert knowledge_base.deleted_at is not None

        data_source_ids = [datasource.id for datasource in knowledge_base.data_sources]

        # Drop entities_{kb_id}, relationships_{kb_id} tables.
        tidb_graph_store = get_kb_tidb_graph_store(session, knowledge_base)
        tidb_graph_store.drop_table_schema()
        logger.info(f"Dropped tidb graph store of knowledge base #{knowledge_base_id} successfully.")

        # Drop chunks_{kb_id} table.
        tidb_vector_store = get_kb_tidb_vector_store(session, knowledge_base)
        tidb_vector_store.drop_table_schema()

        logger.info(f"Dropped tidb vector store of knowledge base #{knowledge_base_id} successfully.")

        # Delete documents.
        stmt = delete(Document).where(Document.knowledge_base_id == knowledge_base_id)
        session.exec(stmt)
        logger.info(f"Deleted documents of knowledge base #{knowledge_base_id} successfully.")

        # Delete data sources and links.
        if len(data_source_ids) > 0:
            stmt = delete(KnowledgeBaseDataSource).where(KnowledgeBase.id == knowledge_base_id)
            session.exec(stmt)
            logger.info(f"Deleted linked data sources of knowledge base #{knowledge_base_id} successfully.")

            stmt = delete(DataSource).where(DataSource.id.in_(data_source_ids))
            session.exec(stmt)
            logger.info(f"Deleted data sources {', '.join([f'#{did}' for did in data_source_ids])} successfully.")

        # Delete knowledge base.
        stmt = delete(KnowledgeBase).where(KnowledgeBase.id == knowledge_base_id)
        session.exec(stmt)
        logger.info(f"Deleted knowledge base #{knowledge_base_id} successfully.")

        session.commit()


@celery_app.task
def purge_kb_datasource_related_resources(kb_id: int, datasource_id: int):
    """
    Purge all resources related to the deleted datasource in the knowledge base.
    """

    with Session(engine) as session:
        kb = knowledge_base_repo.must_get(session, kb_id, show_soft_deleted=True)
        datasource = knowledge_base_repo.must_get_kb_datasource(session, kb, datasource_id, show_soft_deleted=True)
        assert datasource.deleted_at is not None

        chunk_model = get_kb_chunk_model(kb)
        entity_model = get_kb_entity_model(kb)
        relationship_model = get_kb_relationship_model(kb)

        doc_ids_subquery = select(Document.id).where(Document.data_source_id == datasource_id)
        chunk_ids_subquery = select(chunk_model.id).where(chunk_model.document_id.in_(doc_ids_subquery))

        # Delete relationships generated by the chunks of the deleted data source.
        stmt = delete(relationship_model).where(relationship_model.chunk_id.in_(chunk_ids_subquery))
        session.exec(stmt)
        logger.info(f"Deleted relationships generated by chunks from data source #{datasource_id} successfully.")

        # Delete orphaned entities that are not referenced by any relationships.
        orphaned_entity_ids = (
            select(entity_model.id)
                .outerjoin(
                    relationship_model,
                    (relationship_model.target_entity_id == entity_model.id) |
                    (relationship_model.source_entity_id == entity_model.id)
                )
                .where(
                    relationship_model.id.is_(None)
                )
                .scalar_subquery()
        )
        stmt = delete(entity_model).where(entity_model.id.in_(orphaned_entity_ids))
        session.exec(stmt)
        logger.info(f"Deleted orphaned entities successfully.")

        # Delete chunks from deleted data source.
        stmt = delete(chunk_model).where(chunk_model.document_id.in_(doc_ids_subquery))
        session.exec(stmt)
        logger.info(f"Deleted chunks from data source #{datasource_id} successfully.")

        # Delete documents.
        stmt = delete(Document).where(Document.data_source_id == datasource_id)
        session.exec(stmt)
        logger.info(f"Deleted documents from data source #{datasource_id} successfully.")

        # Delete data sources.
        session.delete(datasource)
        logger.info(f"Deleted data source #{datasource_id} successfully.")

        session.commit()

    stats_for_knowledge_base.delay(kb_id)