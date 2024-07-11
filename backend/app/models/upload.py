from uuid import UUID
from typing import Optional

from sqlmodel import (
    Field,
    Relationship as SQLRelationship,
)

from app.models.base import UpdatableBaseModel


class Upload(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=255)
    size: int = Field(default=0)
    path: str = Field(max_length=255)
    mime_type: str = Field(max_length=64, default="text/plain")
    user_id: UUID = Field(foreign_key="users.id", nullable=True)
    user: "User" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "Upload.user_id == User.id",
        },
    )

    __tablename__ = "uploads"
