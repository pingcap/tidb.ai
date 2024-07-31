import secrets
import asyncio
from sqlmodel import select, func

from app.core.db import get_async_session_context
from app.auth.users import create_user
from app.models import User, ChatEngine
from app.rag.chat_config import ChatEngineConfig


async def bootstrap() -> None:
    async with get_async_session_context() as session:
        result = await session.exec(select(User).where(User.is_superuser == True))
        user = result.first()
        if not user:
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
            print(
                "[IMPORTANT] Admin user created with email: "
                f"{admin_email} and password: {admin_password}, "
                "please change the password after login"
            )
        
        result = await session.scalar(func.count(ChatEngine.id))
        if result == 0:
            chat_engine = ChatEngine(
                name="default",
                engine_options=ChatEngineConfig().model_dump(),
                is_default=True,
            )
            session.add(chat_engine)
            await session.commit()
            print("Default chat engine created.")


if __name__ == "__main__":
    print("Bootstrapping the application...")
    asyncio.run(bootstrap())
    print("Bootstrapping completed.")
