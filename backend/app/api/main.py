from fastapi import APIRouter

from app.api.routes import index, chat


api_router = APIRouter()
api_router.include_router(index.router, tags=["index"])
api_router.include_router(chat.router, tags=["chat"])
