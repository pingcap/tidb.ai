from typing import Type

from sqlmodel import select, Session

from app.exceptions import DBRerankerNotFoundError, DefaultRerankerNotFoundError
from app.models import (
    RerankerModel as DBReranker
)


class RerankerRepo:
    model_cls: DBReranker

    def get_db_reranker(self, session: Session, reranker_id: int) -> Type[DBReranker] | None:
        return session.get(DBReranker, reranker_id)


    def must_get_reranker(self, session: Session, reranker_id: int) -> Type[DBReranker]:
        db_reranker = self.get_db_reranker(session, reranker_id)
        if db_reranker is None:
            raise DBRerankerNotFoundError(reranker_id)
        return db_reranker


    def get_default_reranker(self, session: Session) -> Type[DBReranker] | None:
        stmt = select(DBReranker).where(DBReranker.is_default == True).order_by(DBReranker.updated_at.desc()).limit(1)
        return session.exec(stmt).first()


    def must_get_default_reranker(self, session: Session) -> Type[DBReranker]:
        db_reranker = self.get_default_reranker(session)
        if db_reranker is None:
            raise DefaultRerankerNotFoundError()
        return db_reranker


reranker_repo = RerankerRepo()