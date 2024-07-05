from uuid import UUID
from datetime import datetime
from typing import Optional

from sqlmodel import Field, DateTime, func, SQLModel, text

from app.utils.uuid6 import uuid7


class UUIDBaseModel(SQLModel):
    id: UUID = Field(
        default_factory=uuid7,
        primary_key=True,
        index=True,
        nullable=False,
    )


class UpdatableBaseModel(SQLModel):
    # Use sa_type instead of sa_column, refer to https://github.com/tiangolo/sqlmodel/discussions/743
    created_at: Optional[datetime] = Field(
        default=None,
        sa_type=DateTime(timezone=True),
        sa_column_kwargs={"server_default": func.now()},
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        sa_type=DateTime(timezone=True),
        sa_column_kwargs={"server_default": func.now(), "onupdate": func.now()},
    )
