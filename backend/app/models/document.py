import enum
from typing import Optional
from datetime import datetime

from llama_index.core.schema import Document as LlamaDocument
from sqlalchemy.dialects.mysql import MEDIUMTEXT
from sqlmodel import (
    Field,
    Column,
    Text,
    DateTime,
    JSON,
)

from .base import UpdatableBaseModel


class DocIndexTaskStatus(str, enum.Enum):
    NOT_STARTED = "not_started"
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class Document(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hash: str = Field(max_length=32)
    name: str = Field(max_length=256)
    content: str = Field(sa_column=Column(MEDIUMTEXT))
    mime_type: str = Field(max_length=64)
    source_uri: str = Field(max_length=512)
    meta: dict | list = Field(default={}, sa_column=Column(JSON))
    # the last time the document was modified in the source system
    last_modified_at: Optional[datetime] = Field(sa_column=Column(DateTime))
    index_status: DocIndexTaskStatus = DocIndexTaskStatus.NOT_STARTED
    index_result: str = Field(sa_column=Column(Text, nullable=True))
    data_source_id: int = Field(nullable=True)

    __tablename__ = "documents"

    def to_llama_document(self) -> LlamaDocument:
        return LlamaDocument(
            id_=self.id,
            text=self.content,
            metadata=self.meta,
        )
