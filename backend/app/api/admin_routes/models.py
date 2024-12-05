from typing import Optional
from uuid import UUID
from pydantic import BaseModel

from app.api.admin_routes.embedding_model.models import EmbeddingModelItem
from app.models import EvaluationTask
from app.types import LLMProvider


class LLMDescriptor(BaseModel):
    id: int
    name: str
    provider: LLMProvider
    model: str
    is_default: bool


class EmbeddingModelDescriptor(EmbeddingModelItem):
    pass


class UserDescriptor(BaseModel):
    id: UUID


class KnowledgeBaseDescriptor(BaseModel):
    id: int
    name: str


class DataSourceDescriptor(BaseModel):
    id: int
    name: str


class ChatEngineDescriptor(BaseModel):
    id: int
    name: str
    is_default: bool


class CreateEvaluationTask(BaseModel):
    name: str
    upload_id: int
    chat_engine: str = "default"
    run_size: Optional[int] = None


class EvaluationTaskSummary(BaseModel):
    task: EvaluationTask
    not_start: int
    succeed: int
    errored: int
    progressing: int
    avg_factual_correctness: Optional[float]
    avg_semantic_similarity: Optional[float]
    min_factual_correctness: Optional[float]
    min_semantic_similarity: Optional[float]
    max_factual_correctness: Optional[float]
    max_semantic_similarity: Optional[float]
    std_factual_correctness: Optional[float]
    std_semantic_similarity: Optional[float]
