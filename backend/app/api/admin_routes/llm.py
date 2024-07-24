from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import select

from app.api.deps import SessionDep, CurrentSuperuserDep
from app.rag.llm_option import admin_llm_options, LLMOption
from app.models import (
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


@router.get("/admin/llms/{llm_id}")
def get_llm(
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
    session.delete(llm)
    session.commit()
    return llm
