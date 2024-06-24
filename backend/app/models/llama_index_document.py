from typing import Optional, Any

from sqlmodel import (
    Field,
    Column,
    Text,
    JSON,
    Relationship as SQLRelationship,
)
from tidb_vector.sqlalchemy import VectorType

from .base import UpdatableBaseModel


class LlamaIndexDocument(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hash: str = Field(max_length=32)
    text: str = Field(sa_column=Column(Text))
    meta: str = Field(default={}, sa_column=Column(JSON))
    embedding: Any = Field(sa_column=Column(VectorType(1536)))
    document_id: int = Field(foreign_key="document.id")
    document: "Document" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "LlamaIndexDocument.document_id == Document.id",
        },
    )

    __tablename__ = "llama_index_document"
