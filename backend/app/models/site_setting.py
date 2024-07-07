from typing import Optional

from sqlmodel import Field, Column, JSON

from .base import UpdatableBaseModel


class SiteSetting(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=256, unique=True)
    data_type: str = Field(max_length=256)
    value: str = Field(sa_column=Column(JSON))

    __tablename__ = "site_settings"
