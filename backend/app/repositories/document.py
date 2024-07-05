from typing import Optional
from sqlmodel import select, Session, col
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate

from app.models import Document
from app.repositories.base_repo import BaseRepo


class DocumentRepo(BaseRepo):
    model_cls = Document

    def paginate(
        self,
        session: Session,
        params: Params | None = Params(),
        query: Optional[str] = None,
    ) -> Page[Document]:
        stmt = select(Document)
        if query:
            stmt = stmt.where(col(Document.source_uri).contains(query))
        # Make sure the default engine is always on top
        stmt = stmt.order_by(Document.updated_at.desc())
        return paginate(session, stmt, params)


document_repo = DocumentRepo()
