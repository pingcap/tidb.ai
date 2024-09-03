from typing import Optional
from datetime import datetime, timezone
from sqlmodel import SQLModel, Field, Column, JSON, func
from sqlalchemy.dialects.mysql import DATETIME


class SiteSetting(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=256, unique=True)
    data_type: str = Field(max_length=256)
    value: str = Field(sa_column=Column(JSON))
    created_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(DATETIME(timezone=True, fsp=6), server_default=func.now()),
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(
            # SiteSetting needs more time precision to avoid timestamp collision between each other,
            # so we use mysql.DATETIME rather than base.UpdatableBaseModel
            DATETIME(timezone=True, fsp=6),
            server_default=func.now(),
            onupdate=datetime.now(timezone.utc),
        ),
    )

    __tablename__ = "site_settings"
