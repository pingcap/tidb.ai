from typing import Type

from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import Session, select, update
from app.exceptions import EmbeddingModelNotFoundError
from app.models import  EmbeddingModel
from app.repositories.base_repo import BaseRepo


class EmbeddingModelRepo(BaseRepo):
    model_cls = EmbeddingModel

    def must_get(self, session, model_id: int) -> Type[EmbeddingModel]:
        db_embed_model = self.get(session, model_id)
        if db_embed_model is None:
            raise EmbeddingModelNotFoundError(model_id)
        return db_embed_model


    def paginate(self, session: Session, params: Params | None = Params()) -> Page[EmbeddingModel]:
        query = (
            select(EmbeddingModel)
            .order_by(EmbeddingModel.created_at.desc())
        )
        return paginate(session, query, params)


    def get_default_model(self, session: Session) -> Type[EmbeddingModel]:
        stmt = (select(EmbeddingModel)
                .where(EmbeddingModel.is_default == True)
                .order_by(EmbeddingModel.updated_at.desc())
                .limit(1))
        return session.exec(stmt).first()


    def set_default_model(self, session: Session, new_default_model_id: int):
        session.exec(
            update(EmbeddingModel)
                .values(is_default=False)
                .where(EmbeddingModel.is_default == True)
        )
        session.exec(
            update(EmbeddingModel)
                .values(is_default=True)
                .where(EmbeddingModel.id == new_default_model_id)
        )
        session.commit()


embedding_model_repo = EmbeddingModelRepo()
