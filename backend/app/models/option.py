from typing import Optional

from sqlmodel import (
    Field,
    Column,
    JSON
)

from .base import UpdatableBaseModel


class Option(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=256)
    group_name: str = Field(max_length=256)
    value: str = Field(sa_column=Column(JSON))

    __tablename__ = "option"
