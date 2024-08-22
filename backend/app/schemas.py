from uuid import UUID
from pydantic import BaseModel


class VectorIndexError(BaseModel):
    document_id: int
    document_name: str
    source_uri: str
    error: str | None = None


class KGIndexError(BaseModel):
    chunk_id: UUID
    source_uri: str
    error: str | None = None
