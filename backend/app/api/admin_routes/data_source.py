from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_pagination import Params, Page

from app.api.deps import SessionDep, CurrentSuperuserDep
from app.models import (
    DataSource,
    DataSourceType,
)
from app.tasks import (
    import_documents_from_datasource,
    purge_datasource_related_resources,
)
from app.repositories import data_source_repo

router = APIRouter()


class DataSourceCreate(BaseModel):
    name: str
    description: str
    data_source_type: DataSourceType
    config: dict | list
    build_kg_index: bool = False
    llm_id: int | None = None


@router.post("/admin/datasources")
def create_datasource(
    session: SessionDep, user: CurrentSuperuserDep, request: DataSourceCreate
) -> DataSource:
    data_source = DataSource(
        name=request.name,
        description=request.description,
        data_source_type=request.data_source_type,
        config=request.config,
        build_kg_index=request.build_kg_index,
        user_id=user.id,
        llm_id=request.llm_id,
    )
    data_source = data_source_repo.create(session, data_source)
    import_documents_from_datasource.delay(data_source.id)
    return data_source


@router.get("/admin/datasources")
def list_datasources(
    session: SessionDep,
    user: CurrentSuperuserDep,
    params: Params = Depends(),
) -> Page[DataSource]:
    return data_source_repo.paginate(session, params)


@router.get("/admin/datasources/{data_source_id}")
def get_datasource(
    session: SessionDep,
    user: CurrentSuperuserDep,
    data_source_id: int,
) -> DataSource:
    data_source = data_source_repo.get(session, data_source_id)
    if data_source is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Data source not found",
        )
    return data_source


@router.delete("/admin/datasources/{data_source_id}")
def delete_datasource(
    session: SessionDep,
    user: CurrentSuperuserDep,
    data_source_id: int,
):
    data_source = data_source_repo.get(session, data_source_id)
    if data_source is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Data source not found",
        )
    data_source_repo.delete(session, data_source)
    purge_datasource_related_resources.apply_async(args=[data_source_id], countdown=5)


@router.get("/admin/datasources/{data_source_id}/overview")
def get_datasource_overview(
    session: SessionDep,
    user: CurrentSuperuserDep,
    data_source_id: int,
) -> dict:
    data_source = data_source_repo.get(session, data_source_id)
    if data_source is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Data source not found",
        )
    return data_source_repo.overview(session, data_source)
