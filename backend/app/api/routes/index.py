from fastapi import APIRouter
from sqlmodel import text

from app.api.deps import SessionDep
from app.site_settings import SiteSetting

router = APIRouter()


@router.get("/healthz")
def status(session: SessionDep):
    session.exec(text("SELECT 1"))
    return "OK"


@router.get("/site-config")
def site_config() -> dict:
    return SiteSetting.get_client_settings()
