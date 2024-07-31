from fastapi import APIRouter
from pydantic import BaseModel
from sqlmodel import text

from app.api.deps import SessionDep
from app.site_settings import SiteSetting
from app.rag.chat import check_rag_required_config

router = APIRouter()


@router.get("/healthz")
def status(session: SessionDep):
    session.exec(text("SELECT 1"))
    return "OK"


@router.get("/site-config")
def site_config() -> dict:
    return SiteSetting.get_client_settings()


class SystemCheckResponse(BaseModel):
    has_default_llm: bool
    has_default_embedding_model: bool
    has_datasource: bool


@router.get("/system/check")
def system_check(session: SessionDep) -> SystemCheckResponse:
    has_default_llm, has_default_embedding_model, has_datasource = (
        check_rag_required_config(session)
    )
    return SystemCheckResponse(
        has_default_llm=has_default_llm,
        has_default_embedding_model=has_default_embedding_model,
        has_datasource=has_datasource,
    )
