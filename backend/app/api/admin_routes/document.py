from typing import Annotated

from fastapi import APIRouter, Depends, Query
from fastapi_pagination import Params, Page

from app.api.deps import SessionDep, CurrentSuperuserDep
from app.repositories import document_repo
from app.models import Document

from app.repositories.document import DocumentFilters

router = APIRouter()

@router.get("/admin/documents")
def list_documents(
    session: SessionDep,
    user: CurrentSuperuserDep,
    filters: Annotated[DocumentFilters, Query()],
    params: Params = Depends(),
) -> Page[Document]:
    return document_repo.paginate(
        session=session,
        filters=filters,
        params=params,
    )
