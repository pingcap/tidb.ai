from uuid import UUID
from typing import Optional

from sqlmodel import (
    Field,
    Relationship as SQLRelationship,
)

from app.models.base import UpdatableBaseModel


class ApiKey(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    description: str = Field(max_length=100)
    hashed_secret: str = Field(max_length=255, unique=True)
    api_key_display: str = Field(max_length=100)
    is_active: bool = True
    user_id: UUID = Field(foreign_key="users.id", nullable=False)
    user: "User" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "ApiKey.user_id == User.id",
        },
    )

    __tablename__ = "api_keys"
