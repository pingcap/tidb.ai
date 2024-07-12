import ssl
from typing import AsyncGenerator, Generator

from sqlmodel import create_engine, Session
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.config import settings


# TiDB Serverless clusters have a limitation: if there are no active connections for 5 minutes,
# they will shut down, which closes all connections, so we need to recycle the connections
engine = create_engine(
    str(settings.SQLALCHEMY_DATABASE_URI), pool_recycle=300, pool_pre_ping=True
)


def get_ssl_context():
    ssl_context = ssl.create_default_context(ssl.Purpose.SERVER_AUTH)
    ssl_context.options |= ssl.OP_NO_TLSv1 | ssl.OP_NO_TLSv1_1
    ssl_context.check_hostname = True
    return ssl_context


async_engine = create_async_engine(
    str(settings.SQLALCHEMY_ASYNC_DATABASE_URI),
    pool_recycle=300,
    connect_args={
        # seems config ssl in url is not working
        # we can only config ssl in connect_args
        "ssl": get_ssl_context(),
    },
)


def get_db_session() -> Generator[Session, None, None]:
    with Session(engine, expire_on_commit=False) as session:
        yield session


async def get_db_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(async_engine, expire_on_commit=False) as session:
        yield session
