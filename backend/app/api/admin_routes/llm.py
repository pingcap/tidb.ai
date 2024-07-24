from typing import List
from pydantic import BaseModel

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import select, update

from app.api.deps import SessionDep, CurrentSuperuserDep
from app.rag.llm_option import admin_llm_options, LLMOption
from app.rag.chat_config import get_llm
from app.models import (
    ChatEngine,
    LLM,
    AdminLLM,
    EmbeddingModel,
    AdminEmbeddingModel,
)

router = APIRouter()


@router.get("/admin/llm-options")
def get_llm_options(user: CurrentSuperuserDep) -> List[LLMOption]:
    return admin_llm_options


@router.get("/admin/llms")
def list_llms(
    session: SessionDep,
    user: CurrentSuperuserDep,
    params: Params = Depends(),
) -> Page[AdminLLM]:
    return paginate(
        session,
        select(LLM).order_by(LLM.created_at.desc()),
        params,
    )


@router.post("/admin/llms")
def create_llm(
    llm: LLM,
    session: SessionDep,
    user: CurrentSuperuserDep,
) -> AdminLLM:
    session.add(llm)
    session.commit()
    session.refresh(llm)
    return llm


class LLMTestResult(BaseModel):
    success: bool
    error: str = ""


@router.post("/admin/llms/test")
def test_llm(
    db_llm: LLM,
    user: CurrentSuperuserDep,
) -> LLMTestResult:
    try:
        llm = get_llm(
            provider=db_llm.provider,
            model=db_llm.model,
            config=db_llm.config,
            credentials=db_llm.credentials,
        )
        response = llm.complete("Who are you?")
        success = True
        error = ""
    except Exception as e:
        success = False
        error = str(e)
    return LLMTestResult(success=success, error=error)


@router.get("/admin/llms/{llm_id}")
def get_llm_detail(
    llm_id: int,
    session: SessionDep,
    user: CurrentSuperuserDep,
) -> AdminLLM:
    llm = session.get(LLM, llm_id)
    if llm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="LLM not found"
        )
    return llm


@router.delete("/admin/llms/{llm_id}")
def delete_llm(
    llm_id: int,
    session: SessionDep,
    user: CurrentSuperuserDep,
) -> AdminLLM:
    llm = session.get(LLM, llm_id)
    if llm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="LLM not found"
        )
    session.exec(
        update(ChatEngine)
        .where(ChatEngine.llm_id == llm_id)
        .values(llm_id=None)
    )
    session.exec(
        update(ChatEngine)
        .where(ChatEngine.fast_llm_id == llm_id)
        .values(fast_llm_id=None)
    )
    session.delete(llm)
    session.commit()
    return llm
