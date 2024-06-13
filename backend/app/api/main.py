from fastapi import APIRouter

from app.api.routes import index


api_router = APIRouter()
api_router.include_router(index.router, tags=["index"])
