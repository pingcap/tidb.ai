from typing import Type

from sqlmodel import select, Session

from app.exceptions import DefaultLLMNotFoundError
from app.models import (
    LLM as DBLLM
)


class LLMRepo:
    model_cls: DBLLM

    def get_db_llm(self, session: Session, llm_id: int) -> Type[DBLLM] | None:
        return session.get(DBLLM, llm_id)


    def must_get_llm(self, session: Session, llm_id: int) -> Type[DBLLM]:
        db_llm = self.get_db_llm(session, llm_id)
        if db_llm is None:
            raise DefaultLLMNotFoundError(llm_id)
        return db_llm


    def get_default_llm(self, session: Session) -> Type[DBLLM] | None:
        stmt = select(DBLLM).where(DBLLM.is_default == True).order_by(DBLLM.updated_at.desc()).limit(1)
        return session.exec(stmt).first()


    def must_get_default_llm(self, session: Session) -> Type[DBLLM]:
        db_llm = self.get_default_llm(session)
        if db_llm is None:
            raise DefaultLLMNotFoundError()
        return db_llm


llm_repo = LLMRepo()