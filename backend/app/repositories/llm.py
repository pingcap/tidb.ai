from typing import Type, Optional

from fastapi import Depends
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlalchemy import update
from sqlmodel import select, Session

from app.exceptions import DefaultLLMNotFound, LLMNotFound
from app.models import (
    LLM as DBLLM
)
from app.repositories.base_repo import BaseRepo


class LLMRepo(BaseRepo):
    model_cls: DBLLM

    def paginate(self, session: Session, params: Params = Depends()) -> Page[DBLLM]:
        query = select(DBLLM)
        # Make sure the default llm is always on top.
        query = query.order_by(DBLLM.is_default.desc(), DBLLM.created_at.desc())
        return paginate(session, query, params)

    def get(self, session: Session, llm_id: int) -> Optional[DBLLM]:
        return session.get(DBLLM, llm_id)

    def must_get(self, session: Session, llm_id: int) -> Type[DBLLM]:
        db_llm = self.get(session, llm_id)
        if db_llm is None:
            raise LLMNotFound(llm_id)
        return db_llm

    def get_default(self, session: Session) -> Type[DBLLM] | None:
        stmt = (
            select(DBLLM)
                .where(DBLLM.is_default == True)
                .order_by(DBLLM.updated_at.desc())
                .limit(1)
        )
        return session.exec(stmt).first()

    def must_get_default(self, session: Session) -> Type[DBLLM]:
        db_llm = self.get_default(session)
        if db_llm is None:
            raise DefaultLLMNotFound()
        return db_llm

    def create(self, session: Session, llm: DBLLM) -> DBLLM:
        # If there is no exiting model, the first model is
        # automatically set as the default model.
        if not self.exists_any_model(session):
            llm.is_default = True

        if llm.is_default:
            session.exec(update(DBLLM).values(is_default=False))

        session.add(llm)
        session.commit()
        session.refresh(llm)

        return llm

    def exists_any_model(self, session: Session) -> bool:
        stmt = select(DBLLM).with_for_update().limit(1)
        return session.exec(stmt).one_or_none() is not None

llm_repo = LLMRepo()