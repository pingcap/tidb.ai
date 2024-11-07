from typing import Optional, cast

from sqlalchemy import String
from sqlmodel import select, Session, col, func
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate

from app.models import Document, DocIndexTaskStatus
from app.repositories.base_repo import BaseRepo

from datetime import datetime

from app.types import MimeTypes


class DocumentRepo(BaseRepo):
    model_cls = Document

    def paginate(
        self,
        session: Session,
        params: Params | None = Params(),
        source_uri: Optional[str] = None,
        data_source_id: Optional[int] = None,
        knowledge_base_id: Optional[int] = None,
        created_at_start: Optional[datetime] = None,
        created_at_end: Optional[datetime] = None,
        updated_at_start: Optional[datetime] = None,
        updated_at_end: Optional[datetime] = None,
        last_modified_at_start: Optional[datetime] = None,
        last_modified_at_end: Optional[datetime] = None,
        name: Optional[str] = None,
        mime_type: Optional[MimeTypes] = None,
        index_status: Optional[DocIndexTaskStatus] = None,
    ) -> Page[Document]:
        # build the select statement via conditions
        stmt = select(Document)
        if source_uri:
            stmt = stmt.where(col(Document.source_uri).contains(source_uri))
        if knowledge_base_id:
            stmt = stmt.where(Document.knowledge_base_id == knowledge_base_id)
        if data_source_id:
            stmt = stmt.where(Document.data_source_id == data_source_id)
        if created_at_start:
            stmt = stmt.where(Document.created_at >= created_at_start)
        if created_at_end:
            stmt = stmt.where(Document.created_at <= created_at_end)
        if updated_at_start:
            stmt = stmt.where(Document.updated_at >= updated_at_start)
        if updated_at_end:
            stmt = stmt.where(Document.updated_at <= updated_at_end)
        if last_modified_at_start:
            stmt = stmt.where(Document.last_modified_at >= last_modified_at_start)
        if last_modified_at_end:
            stmt = stmt.where(Document.last_modified_at <= last_modified_at_end)
        if name:
            stmt = stmt.where(col(Document.name).contains(name))
        if mime_type:
            stmt = stmt.where(Document.mime_type == mime_type)
        if index_status:
            stmt = stmt.where(Document.index_status == index_status)

        # Make sure the newer edited record is always on top
        stmt = stmt.order_by(Document.updated_at.desc())
        return paginate(session, stmt, params)


document_repo = DocumentRepo()
