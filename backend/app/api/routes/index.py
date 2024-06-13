from fastapi import APIRouter
from sqlmodel import text

from app.api.deps import SessionDep

router = APIRouter()


@router.get("/healthz")
def status(session: SessionDep):
    # Check if the database is healthy
    session.exec(text("SELECT 1"))
    return "OK"
