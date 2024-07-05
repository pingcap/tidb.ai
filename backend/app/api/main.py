from fastapi import APIRouter

from app.api.routes import (
    index,
    chat,
    user,
    api_key,
    feedback,
)
from app.api.admin_routes import (
    rag_index as admin_rag_index,
    chat_engine as admin_chat_engine,
    documents as admin_documents,
)
from app.auth.schemas import UserCreate, UserRead, UserUpdate
from app.auth.users import auth_backend, fastapi_users


api_router = APIRouter()
api_router.include_router(index.router, tags=["index"])
api_router.include_router(chat.router, tags=["chat"])
api_router.include_router(feedback.router, tags=["chat"])
api_router.include_router(user.router, tags=["user"])
api_router.include_router(api_key.router, tags=["auth"])

api_router.include_router(admin_rag_index.router, tags=["admin"])
api_router.include_router(admin_chat_engine.router, tags=["admin"])
api_router.include_router(admin_documents.router, tags=["admin"])


api_router.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth", tags=["auth"]
)
api_router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
api_router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
api_router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
