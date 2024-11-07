from uuid import UUID
from pydantic import BaseModel
from app.types import LLMProvider


class LLMDescriptor(BaseModel):
    id: int
    name: str
    provider: LLMProvider
    model: str
    is_default: bool


class EmbeddingModelDescriptor(BaseModel):
    id: int
    name: str
    model: str
    vector_dimension: int
    is_default: bool


class UserDescriptor(BaseModel):
    id: UUID


class KnowledgeBaseDescriptor(BaseModel):
    id: int
    name: str


class DataSourceDescriptor(BaseModel):
    id: int
    name: str