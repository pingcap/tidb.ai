from fastapi import APIRouter, Depends
from fastapi_pagination import Params, Page

from app.api.deps import SessionDep, CurrentSuperuserDep
from app.repositories import chat_engine_repo
from app.models import ChatEngine

router = APIRouter()


@router.get("/admin/chat-engines")
def list_chat_engines(
    session: SessionDep, user: CurrentSuperuserDep, params: Params = Depends()
) -> Page[ChatEngine]:
    return chat_engine_repo.paginate(session, params)


@router.get("/admin/chat-engines/{chat_engine_id}")
def get_chat_engine(
    chat_engine_id: int, session: SessionDep, user: CurrentSuperuserDep
) -> ChatEngine:
    return chat_engine_repo.get(session, chat_engine_id)
