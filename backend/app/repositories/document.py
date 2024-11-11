from typing import Optional

from pydantic import Field, BaseModel
from sqlmodel import select, Session, col
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate

from app.models import Document, DocIndexTaskStatus
from app.repositories.base_repo import BaseRepo

from datetime import datetime

from app.types import MimeTypes


class DocumentFilters(BaseModel):
    name: Optional[str] = Field(
        None,
        description="[Fuzzy Match] name field, will search for the name that contains the given string."
    )
    source_uri: Optional[str] = Field(
        None,
        description="[Fuzzy Match] source URI field, will search for the source URI that contains the given string."
    )
    data_source_id: Optional[int]  = Field(None)
    created_at_start: Optional[datetime] = Field(None)
    created_at_end: Optional[datetime] = None
    updated_at_start: Optional[datetime] = None
    updated_at_end: Optional[datetime] = None
    last_modified_at_start: Optional[datetime] = None
    last_modified_at_end: Optional[datetime] = None
    mime_type: Optional[MimeTypes | None] = None
    index_status: Optional[DocIndexTaskStatus | None] = None


class DocumentRepo(BaseRepo):
    model_cls = Document

    def paginate(
        self,
        session: Session,
        filters: DocumentFilters,
        params: Params | None = Params()
    ) -> Page[Document]:
        # build the select statement via conditions
        stmt = select(Document)
        if filters.source_uri:
            stmt = stmt.where(col(Document.source_uri).contains(filters.source_uri))
        if filters.data_source_id:
            stmt = stmt.where(Document.data_source_id == filters.data_source_id)
        if filters.created_at_start:
            stmt = stmt.where(Document.created_at >= filters.created_at_start)
        if filters.created_at_end:
            stmt = stmt.where(Document.created_at <= filters.created_at_end)
        if filters.updated_at_start:
            stmt = stmt.where(Document.updated_at >= filters.updated_at_start)
        if filters.updated_at_end:
            stmt = stmt.where(Document.updated_at <= filters.updated_at_end)
        if filters.last_modified_at_start:
            stmt = stmt.where(Document.last_modified_at >= filters.last_modified_at_start)
        if filters.last_modified_at_end:
            stmt = stmt.where(Document.last_modified_at <= filters.last_modified_at_end)
        if filters.name:
            stmt = stmt.where(col(Document.name).contains(filters.name))
        if filters.mime_type:
            stmt = stmt.where(Document.mime_type == filters.mime_type)
        if filters.index_status:
            stmt = stmt.where(Document.index_status == filters.index_status)

        # Make sure the newer edited record is always on top
        stmt = stmt.order_by(Document.updated_at.desc())
        return paginate(session, stmt, params)


document_repo = DocumentRepo()
