import secrets
import asyncio
from sqlmodel import select, func
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.db import get_async_session_context
from app.models import User, ChatEngine


async def ensure_admin_user(session: AsyncSession) -> None:
    result = await session.exec(select(User).where(User.is_superuser == True))
    user = result.first()
    if not user:
        from app.auth.users import create_user
        admin_email = "admin@example.com"
        admin_password = secrets.token_urlsafe(16)
        user = await create_user(
            session,
            email=admin_email,
            password=admin_password,
            is_active=True,
            is_verified=True,
            is_superuser=True,
        )
        print("\n" + "!" * 80)
        print(
            "[IMPORTANT] Admin user created with email: "
            f"{admin_email} and password: {admin_password}, "
            "please change the password after login"
        )
        print("!" * 80 + "\n")


async def ensure_default_chat_engine(session: AsyncSession) -> None:
    result = await session.scalar(func.count(ChatEngine.id))
    if result == 0:
        from app.rag.chat_config import ChatEngineConfig
        chat_engine = ChatEngine(
            name="default",
            engine_options=ChatEngineConfig().model_dump(),
            is_default=True,
        )
        session.add(chat_engine)
        await session.commit()
        print("Default chat engine created.")


async def bootstrap() -> None:
    async with get_async_session_context() as session:
        await ensure_admin_user(session)
        await ensure_default_chat_engine(session)


if __name__ == "__main__":
    print("Bootstrapping the application...")
    asyncio.run(bootstrap())
    print("Bootstrapping completed.")
