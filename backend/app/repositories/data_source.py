from typing import Optional
from datetime import datetime, UTC

from sqlmodel import select, Session, func
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate

from app.models import DataSource, Document, Chunk, Relationship
from app.repositories.base_repo import BaseRepo


class DataSourceRepo(BaseRepo):
    model_cls = DataSource

    def paginate(
        self,
        session: Session,
        params: Params | None = Params(),
    ) -> Page[DataSource]:
        query = (
            select(DataSource)
            .where(DataSource.deleted_at == None)
            .order_by(DataSource.created_at.desc())
        )
        return paginate(session, query, params)

    def get(
        self,
        session: Session,
        data_source_id: int,
    ) -> Optional[DataSource]:
        return session.exec(
            select(DataSource).where(
                DataSource.id == data_source_id, DataSource.deleted_at == None
            )
        ).first()

    def delete(self, session: Session, data_source: DataSource) -> None:
        data_source.deleted_at = datetime.now(UTC)
        session.add(data_source)
        session.commit()

    def overview(self, session: Session, data_source: DataSource) -> dict:
        data_source_id = data_source.id
        documents_count = session.scalar(
            select(func.count(Document.id)).where(
                Document.data_source_id == data_source_id
            )
        )
        chunks_count = session.scalar(
            select(func.count(Chunk.id)).where(
                Chunk.document.has(Document.data_source_id == data_source_id)
            )
        )

        statement = (
            select(Document.index_status, func.count(Document.id))
            .where(Document.data_source_id == data_source_id)
            .group_by(Document.index_status)
            .order_by(Document.index_status)
        )
        results = session.exec(statement).all()
        vector_index_status = {s: c for s, c in results}

        overview_data = {
            "documents": {
                "total": documents_count,
            },
            "chunks": {
                "total": chunks_count,
            },
            "vector_index": vector_index_status,
        }

        if data_source.build_kg_index:
            relationships_count = session.scalar(
                select(func.count(Relationship.id)).where(
                    Relationship.document_id.in_(
                        select(Document.id).where(
                            Document.data_source_id == data_source_id
                        )
                    )
                )
            )
            overview_data["relationships"] = {
                "total": relationships_count,
            }

            statement = (
                select(Chunk.index_status, func.count(Chunk.id))
                .where(Chunk.document.has(Document.data_source_id == data_source_id))
                .group_by(Chunk.index_status)
                .order_by(Chunk.index_status)
            )
            results = session.exec(statement).all()
            kg_index_status = {s: c for s, c in results}
            overview_data["kg_index"] = kg_index_status

        return overview_data


data_source_repo = DataSourceRepo()
