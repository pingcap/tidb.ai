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


class RequiredConfigStatus(BaseModel):
    default_llm: bool
    default_embedding_model: bool
    datasource: bool


class OptionalConfigStatus(BaseModel):
    langfuse: bool


class SystemConfigStatusResponse(BaseModel):
    required: RequiredConfigStatus
    optional: OptionalConfigStatus


@router.get("/system/bootstrap-status")
def system_bootstrap_status(session: SessionDep) -> SystemConfigStatusResponse:
    has_default_llm, has_default_embedding_model, has_datasource = (
        check_rag_required_config(session)
    )
    return SystemConfigStatusResponse(
        required=RequiredConfigStatus(
            default_llm=has_default_llm,
            default_embedding_model=has_default_embedding_model,
            datasource=has_datasource,
        ),
        optional=OptionalConfigStatus(
            langfuse=bool(
                SiteSetting.langfuse_host
                and SiteSetting.langfuse_secret_key
                and SiteSetting.langfuse_public_key
            )
        ),
    )
