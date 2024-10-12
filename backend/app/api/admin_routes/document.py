from fastapi import APIRouter, Depends, Query
from fastapi_pagination import Params, Page

from app.api.deps import SessionDep, CurrentSuperuserDep
from app.repositories import document_repo
from app.models import Document, DocIndexTaskStatus

from datetime import datetime

from app.types import MimeTypes

router = APIRouter()


@router.get("/admin/documents")
def list_documents(
    session: SessionDep,
    # user: CurrentSuperuserDep,
    params: Params = Depends(),
    source_uri: str | None = Query(
        None,
        description="[Fuzzy Match] source URI field, will search for the source URI that contains the given string."
    ),
    data_source_id: int | None = None,
    created_at_start: datetime | None = None,
    created_at_end: datetime | None = None,
    updated_at_start: datetime | None = None,
    updated_at_end: datetime | None = None,
    last_modified_at_start: datetime | None = None,
    last_modified_at_end: datetime | None = None,
    name: str | None = Query(
        None,
        description="[Fuzzy Match] name field, will search for the name that contains the given string."
    ),
    mime_type: MimeTypes | None = None,
    index_status: DocIndexTaskStatus | None = None,
) -> Page[Document]:
    return document_repo.paginate(
        session=session,
        params=params,
        source_uri=source_uri,
        data_source_id=data_source_id,
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
