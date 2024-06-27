from typing import Optional
from datetime import datetime

from llama_index.core.schema import Document as LlamaDocument
from sqlmodel import (
    Field,
    Column,
    Text,
    DateTime,
)

from .base import UpdatableBaseModel


class Document(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hash: str = Field(max_length=32)
    name: str = Field(max_length=256)
    content: str = Field(sa_column=Column(Text))
    mime_type: str = Field(max_length=64)
    source_uri: str = Field(max_length=512)
    # the last time the document was modified in the source system
    last_modified_at: Optional[datetime] = Field(sa_column=Column(DateTime))

    __tablename__ = "documents"

    def to_llama_document(self) -> LlamaDocument:
        return LlamaDocument(
            id_=self.id,
            text=self.content,
        )
