from typing import Optional

from sqlmodel import (
    Field,
    Column,
    Text,
    JSON,
    Relationship as SQLRelationship,
)

from .base import UpdatableBaseModel


class LlamaIndexChunk(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hash: str = Field(max_length=32)
    text: str = Field(sa_column=Column(Text))
    meta: str = Field(default={}, sa_column=Column(JSON))
    document_id: int = Field(foreign_key="llama_index_document.id")
    document: "LlamaIndexDocument" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "LlamaIndexChunk.document_id == LlamaIndexDocument.id",
        },
    )

    __tablename__ = "llama_index_chunk"
