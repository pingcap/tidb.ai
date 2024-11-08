from typing import Any

from pydantic import BaseModel
from typing_extensions import Optional

from app.models.embed_model import DEFAULT_VECTOR_DIMENSION
from app.types import EmbeddingProvider


class EmbeddingModelCreate(BaseModel):
    name: str
    provider: EmbeddingProvider
    model: str
    vector_dimension: int = DEFAULT_VECTOR_DIMENSION
    config: dict | list | None
    credentials: Any


class EmbeddingModelUpdate(BaseModel):
    name: str
    config: dict | list | None
    credentials: Optional[Any] = None


class EmbeddingModelItem(BaseModel):
    id: int
    name: str
    provider: EmbeddingProvider
    model: str
    vector_dimension: int
    is_default: bool


class EmbeddingModelDetail(BaseModel):
    id: int
    name: str
    provider: EmbeddingProvider
    model: str
    vector_dimension: int
    config: dict | list | None
    is_default: bool


class EmbeddingModelTestResult(BaseModel):
    success: bool
    error: str = ""