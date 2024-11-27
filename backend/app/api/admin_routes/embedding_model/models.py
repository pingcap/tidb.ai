from typing import Any

from pydantic import BaseModel, field_validator
from typing_extensions import Optional

from app.models.embed_model import DEFAULT_VECTOR_DIMENSION
from app.types import EmbeddingProvider


class EmbeddingModelCreate(BaseModel):
    name: str
    provider: EmbeddingProvider
    model: str
    vector_dimension: int
    config: dict | list | None
    credentials: Any
    is_default: Optional[bool] = False

    @field_validator("vector_dimension")
    def name_must_not_be_blank(cls, v: int) -> int:
        if v <= 0:
            raise ValueError("The vector dimension of the Embedding model should be at least greater than 1.")
        return v


class EmbeddingModelUpdate(BaseModel):
    name: Optional[str] = None
    config: Optional[dict | list] = None
    credentials: Optional[Any] = None
    is_default: Optional[bool] = False


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
