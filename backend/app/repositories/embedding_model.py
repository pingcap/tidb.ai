from typing import Type

from sqlmodel import Session, select
from app.exceptions import EmbeddingModelNotFoundError
from app.models import (
    EmbeddingModel as DBEmbeddingModel
)

def get_default_db_embed_model(session: Session) -> Type[DBEmbeddingModel]:
    stmt = (select(DBEmbeddingModel)
            .where(DBEmbeddingModel.is_default == True)
            .order_by(DBEmbeddingModel.updated_at.desc())
            .limit(1))
    return session.exec(stmt).first()


def get_db_embed_model(session: Session, model_id: int) -> Type[DBEmbeddingModel]:
    stmt = select(DBEmbeddingModel).where(DBEmbeddingModel.id == model_id)
    return session.exec(stmt).first()


def must_get_db_embed_model(session, model_id: int) -> Type[DBEmbeddingModel]:
    db_embed_model = get_db_embed_model(session, model_id)
    if db_embed_model is None:
        raise EmbeddingModelNotFoundError(model_id)
    return db_embed_model
