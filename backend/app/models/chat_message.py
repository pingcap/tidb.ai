from uuid import UUID
from typing import Optional
from datetime import datetime

from sqlmodel import (
    Field,
    Column,
    DateTime,
    Text,
    Relationship as SQLRelationship,
)

from .base import UpdatableBaseModel


class ChatMessage(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    ordinal: int = Field(default=0)
    role: str = Field(max_length=64)
    content: str = Field(sa_column=Column(Text))
    error: Optional[str] = Field(sa_column=Column(Text))
    trace_url: Optional[str] = Field(max_length=512)
    finshed_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime))
    chat_id: UUID = Field(foreign_key="chats.id")
    chat: "Chat" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "ChatMessage.chat_id == Chat.id",
        },
    )

    __tablename__ = "chat_messages"
