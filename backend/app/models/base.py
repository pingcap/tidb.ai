import json
from uuid import UUID
from datetime import datetime
from typing import Optional

from sqlmodel import Field, DateTime, func, SQLModel
from sqlalchemy.types import TypeDecorator, LargeBinary

from app.utils.uuid6 import uuid7
from app.utils.aes import AESCipher
from app.core.config import settings


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


def get_aes_key() -> bytes:
    return settings.SECRET_KEY.encode()[:32]


class AESEncryptedColumn(TypeDecorator):
    impl = LargeBinary

    def process_bind_param(self, value, dialect):
        if value is not None:
            json_str = json.dumps(value)
            return AESCipher(get_aes_key()).encrypt(json_str)
        return value

    def process_result_value(self, value, dialect):
        if value is not None:
            json_str = AESCipher(get_aes_key()).decrypt(value)
            return json.loads(json_str)
        return value
