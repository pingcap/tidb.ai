from typing import Optional, Dict
from datetime import datetime

from sqlmodel import (
    Field,
    Column,
    JSON,
    DateTime,
)

from .base import UpdatableBaseModel


class ChatEngine(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=256)
    engine_options: Dict = Field(default={}, sa_column=Column(JSON))
    is_default: bool = Field(default=False)
    deleted_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime))

    __tablename__ = "chat_engine"
