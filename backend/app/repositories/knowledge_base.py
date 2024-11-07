from typing import Optional, Type
from datetime import datetime, UTC

from sqlmodel import select, Session, func, update, SQLModel
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate

from app.exceptions import KnowledgeBaseNotFoundError
from app.models import (
    KnowledgeBase,
    Document,
    DocIndexTaskStatus,
    KgIndexStatus, Chunk,
)
from app.models.knowledge_base import IndexMethod
from app.rag.knowledge_base.dynamic_model import get_kb_chunk_model, get_kb_relationship_model, get_kb_entity_model
from app.repositories.base_repo import BaseRepo
from app.repositories.chunk import ChunkRepo
from app.repositories.entity import EntityRepo
from app.repositories.relationship import RelationshipRepo


class KnowledgeBaseRepo(BaseRepo):
    model_cls = KnowledgeBase

    def paginate(self, session: Session, params: Params | None = Params()) -> Page[KnowledgeBase]:
        query = (
            select(KnowledgeBase)
            .where(KnowledgeBase.deleted_at == None)
            .order_by(KnowledgeBase.created_at.desc())
        )
        return paginate(session, query, params)

    def get(self, session: Session, knowledge_base_id: int) -> Optional[KnowledgeBase]:
        return session.exec(
            select(KnowledgeBase).where(
                KnowledgeBase.id == knowledge_base_id, KnowledgeBase.deleted_at == None
            )
        ).first()
    
    def must_get(self, session: Session, knowledge_base_id: int) -> Optional[KnowledgeBase]:
        kb = self.get(session, knowledge_base_id)
        if kb is None:
            raise KnowledgeBaseNotFoundError(knowledge_base_id)
        return kb

    def delete(self, session: Session, knowledge_base: KnowledgeBase) -> None:
        knowledge_base.deleted_at = datetime.now(UTC)
        session.add(knowledge_base)
        session.commit()

    def get_index_overview(self, session: Session, kb: KnowledgeBase) -> dict:
        # TODO: store and query the count numbers in the knowledge base table.
        documents_total = self.count_documents(session, kb)
        chunks_total = self.count_chunks(session, kb)
        overview_data = {
            "documents": {
                "total": documents_total
            },
            "chunks": {
                "total": chunks_total
            },

        }

        if IndexMethod.VECTOR in kb.index_methods:
            overview_data.update(self.count_documents_by_vector_index_status(session, kb))

        if IndexMethod.KNOWLEDGE_GRAPH in kb.index_methods:
            relationships_total = self.count_relationships(session, kb)
            entities_total = self.count_entities(session, kb)
            overview_data.update({
                "entities": {
                    "total": entities_total
                },
                "relationships": {
                    "total": relationships_total
                }
            })
            overview_data.update(self.count_chunks_by_kg_index_status(session, kb))

        return overview_data

    def count_documents(self, session: Session, kb: KnowledgeBase) -> int:
        return session.scalar(
            select(func.count(Document.id)).where(Document.knowledge_base_id == kb.id)
        )

    def count_chunks(self, session: Session, kb: KnowledgeBase):
        chunk_repo = ChunkRepo(get_kb_chunk_model(kb))
        return chunk_repo.count(session)

    def count_relationships(self, session: Session, kb: KnowledgeBase):
        relationship_model = get_kb_relationship_model(kb)
        relationship_repo = RelationshipRepo(relationship_model)
        return relationship_repo.count(session)

    def count_entities(self, session: Session, kb: KnowledgeBase):
        entity_model = get_kb_entity_model(kb)
        entity_repo = EntityRepo(entity_model)
        return entity_repo.count(session)

    def count_documents_by_vector_index_status(self, session: Session, kb: KnowledgeBase) -> dict:
        stmt = (
            select(Document.index_status, func.count(Document.id))
            .where(Document.knowledge_base_id == kb.id)
            .group_by(Document.index_status)
            .order_by(Document.index_status)
        )
        results = session.exec(stmt).all()
        vector_index_status = {s: c for s, c in results}

        return {
            "vector_index": vector_index_status,
        }

    def count_chunks_by_kg_index_status(self, session: Session, kb: KnowledgeBase) -> dict:
        # FIXME: Maybe we should count the documents (instead of chunks) like vector index?
        chunk_model = get_kb_chunk_model(kb)
        stmt = (
            select(chunk_model.index_status, func.count(chunk_model.id))
            .where(chunk_model.document.has(Document.knowledge_base_id == kb.id))
            .group_by(chunk_model.index_status)
            .order_by(chunk_model.index_status)
        )
        results = session.exec(stmt).all()
        kg_index_status = {s: c for s, c in results}

        return {
            "kg_index": kg_index_status
        }

    def batch_update_document_status(self, session: Session, document_ids: list[int], status: DocIndexTaskStatus):
        stmt = (
            update(Document)
            .where(Document.id.in_(document_ids))
            .values(index_status=status)
        )
        session.exec(stmt)
        session.commit()

    def set_failed_documents_status_to_pending(self, session: Session, kb: KnowledgeBase) -> list[int]:
        stmt = select(Document.id).where(
            Document.knowledge_base_id == kb.id,
            Document.index_status == DocIndexTaskStatus.FAILED
        )
        failed_document_ids = session.exec(stmt).all()
        self.batch_update_document_status(session, failed_document_ids, DocIndexTaskStatus.PENDING)
        return failed_document_ids

    def batch_update_chunk_status(self, session: Session, chunk_model: Type[Chunk], chunk_ids: list[int], status: KgIndexStatus):
        stmt = (
            update(chunk_model)
            .where(chunk_model.id.in_(chunk_ids))
            .values(index_status=status)
        )
        session.exec(stmt)
        session.commit()

    def set_failed_chunks_status_to_pending(self, session: Session, kb: KnowledgeBase) -> list[int]:
        chunk_model = get_kb_chunk_model(kb)
        stmt = select(
            chunk_model.id
        ).where(
            chunk_model.document.has(Document.knowledge_base_id == kb.id),
            chunk_model.index_status == KgIndexStatus.FAILED
        )
        chunk_ids = session.exec(stmt).all()

        # Update status.
        self.batch_update_chunk_status(session, chunk_model, chunk_ids, KgIndexStatus.PENDING)

        return chunk_ids


knowledge_base_repo = KnowledgeBaseRepo()
