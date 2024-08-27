from typing import Optional, Any

from sqlmodel import Field, Column, JSON, String

from .base import UpdatableBaseModel, AESEncryptedColumn
from app.types import EmbeddingProvider


class BaseEmbeddingModel(UpdatableBaseModel):
    name: str = Field(max_length=64)
    provider: EmbeddingProvider = Field(sa_column=Column(String(32), nullable=False))
    model: str = Field(max_length=256)
    config: dict | list | None = Field(sa_column=Column(JSON), default={})
    is_default: bool = Field(default=False)


class EmbeddingModel(BaseEmbeddingModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    credentials: Any = Field(sa_column=Column(AESEncryptedColumn, nullable=True))

    __tablename__ = "embedding_models"


class AdminEmbeddingModel(BaseEmbeddingModel):
    id: int
