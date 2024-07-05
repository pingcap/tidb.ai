import enum
from typing import Any

from sqlmodel import (
    Field,
    Column,
    Text,
    JSON,
    Relationship as SQLRelationship,
)
from tidb_vector.sqlalchemy import VectorType
from llama_index.core.schema import TextNode

from .base import UpdatableBaseModel, UUIDBaseModel


class KgIndexStatus(str, enum.Enum):
    NOT_STARTED = "not_started"
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class Chunk(UUIDBaseModel, UpdatableBaseModel, table=True):
    hash: str = Field(max_length=64)
    text: str = Field(sa_column=Column(Text))
    meta: dict | list = Field(default={}, sa_column=Column(JSON))
    embedding: Any = Field(
        sa_column=Column(VectorType(1536), comment="hnsw(distance=cosine)")
    )
    document_id: int = Field(foreign_key="documents.id", nullable=True)
    document: "Document" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "Chunk.document_id == Document.id",
        },
    )
    relations: dict | list = Field(default={}, sa_column=Column(JSON))
    source_uri: str = Field(max_length=512, nullable=True)
    index_status: KgIndexStatus = KgIndexStatus.NOT_STARTED
    index_result: str = Field(sa_column=Column(Text, nullable=True))

    __tablename__ = "chunks"

    def to_llama_text_node(self) -> TextNode:
        return TextNode(
            id_=self.id.hex,
            text=self.text,
            embedding=list(self.embedding),
            metadata=self.meta,
        )
