from fastapi import Depends
from fastapi_users_db_sqlmodel import SQLModelUserDatabaseAsync
from fastapi_users_db_sqlmodel.access_token import SQLModelAccessTokenDatabaseAsync
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models import User, UserSession
from app.core.db import get_db_async_session


async def get_user_db(session: AsyncSession = Depends(get_db_async_session)):
    yield SQLModelUserDatabaseAsync(session, User)


async def get_user_session_db(
    session: AsyncSession = Depends(get_db_async_session),
):
    yield SQLModelAccessTokenDatabaseAsync(session, UserSession)
