from fastapi import APIRouter
from sqlmodel import text
from pydantic import BaseModel

from app.api.deps import AsyncSessionDep, CurrentSuperuserDep
from app.auth.api_keys import api_key_manager

router = APIRouter()


class CreateApiKeyRequest(BaseModel):
    description: str


@router.post("/create-api-key")
async def create_api_key(
    session: AsyncSessionDep, user: CurrentSuperuserDep, request: CreateApiKeyRequest
):
    _, raw_api_key = await api_key_manager.create_api_key(
        session, user, request.description
    )
    return {"api_key": raw_api_key}
