from typing import Optional, Any

from sqlmodel import Field, Column, JSON

from .base import UpdatableBaseModel, AESEncryptedColumn
from app.types import EmbeddingProvider


class EmbeddingModel(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=64)
    provider: EmbeddingProvider
    model: str = Field(max_length=256)
    config: dict | list | None = Field(sa_column=Column(JSON), default={})
    credentials: Any = Field(sa_column=Column(AESEncryptedColumn, nullable=True))
    is_default: bool = Field(default=False)

    __tablename__ = "embedding_models"
