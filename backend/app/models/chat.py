from uuid import UUID
from typing import Optional, Dict
from datetime import datetime

from sqlmodel import (
    Field,
    Column,
    DateTime,
    JSON,
    Relationship as SQLRelationship,
)

from .base import UUIDBaseModel, UpdatableBaseModel


class Chat(UUIDBaseModel, UpdatableBaseModel, table=True):
    title: str = Field(max_length=256)
    engine_id: int = Field(foreign_key="chat_engines.id", nullable=True)
    engine: "ChatEngine" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "Chat.engine_id == ChatEngine.id",
        },
    )
    engine_options: Dict = Field(default={}, sa_column=Column(JSON))
    deleted_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime))
    user_id: UUID = Field(foreign_key="users.id", nullable=True)
    user: "User" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "Chat.user_id == User.id",
        },
    )

    __tablename__ = "chats"
