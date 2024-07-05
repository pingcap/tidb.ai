from fastapi import APIRouter, Depends
from fastapi_pagination import Params, Page

from app.api.deps import SessionDep, CurrentSuperuserDep
from app.repositories import document_repo
from app.models import Document

router = APIRouter()


@router.get("/admin/documents")
def list_documents(
    session: SessionDep,
    user: CurrentSuperuserDep,
    params: Params = Depends(),
    query: str | None = None,
) -> Page[Document]:
    return document_repo.paginate(session, params, query)
