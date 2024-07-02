from uuid import UUID
from typing import List, Optional
from http import HTTPStatus

from pydantic import (
    BaseModel,
    field_validator,
)
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from fastapi_pagination import Params, Page

from app.api.deps import SessionDep, OptionalUserDep, CurrentUserDep
from app.repositories import chat_repo
from app.models import Chat
from app.rag.chat import ChatService
from app.rag.types import (
    MessageRole,
    ChatMessage,
    ChatEventType,
    ChatMessageSate,
)

router = APIRouter()


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    chat_engine: str = "default"
    chat_id: Optional[UUID] = None
    stream: bool = True

    @field_validator("messages")
    @classmethod
    def check_messages(cls, messages: List[ChatMessage]) -> List[ChatMessage]:
        if not messages:
            raise ValueError("messages cannot be empty")
        for m in messages:
            if m.role not in [MessageRole.USER, MessageRole.ASSISTANT]:
                raise ValueError("role must be either 'user' or 'assistant'")
            if len(m.content) > 1000:
                raise ValueError("message content cannot exceed 1000 characters")
        if messages[-1].role != MessageRole.USER:
            raise ValueError("last message must be from user")
        return messages


@router.post("/chats")
def chats(session: SessionDep, user: OptionalUserDep, chat_request: ChatRequest):
    chat_svc = ChatService(session, user, chat_request.chat_engine)

    if chat_request.stream:
        return StreamingResponse(
            chat_svc.chat(chat_request.messages, chat_request.chat_id),
            media_type="text/event-stream",
        )
    else:
        trace, sources, content = None, [], ""
        for m in chat_svc.chat(chat_request.messages, chat_request.chat_id):
            if m.event_type == ChatEventType.MESSAGE_PART:
                if m.payload.state == ChatMessageSate.SOURCE_NODES:
                    sources = m.payload.context
                elif m.payload.state == ChatMessageSate.TRACE:
                    trace = m.payload.context
            elif m.event_type == ChatEventType.TEXT_PART:
                content += m.payload
            else:
                pass
        return {
            "trace": trace,
            "sources": sources,
            "content": content,
        }


@router.get("/chats")
def list_chats(
    session: SessionDep, user: OptionalUserDep, params: Params = Depends()
) -> Page[Chat]:
    return chat_repo.paginate(session, user, params)


@router.get("/chats/{chat_id}")
def get_chat(session: SessionDep, user: OptionalUserDep, chat_id: UUID):
    chat = chat_repo.get(session, chat_id)
    if not chat:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Chat not found")
    if not chat.user_id or user.is_superuser or chat.user_id == user.id:
        return {
            "chat": chat,
            "messages": chat_repo.get_messages(session, chat),
        }
    else:
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN, detail="Access denied")


@router.delete("/chats/{chat_id}")
def delete_chat(session: SessionDep, user: CurrentUserDep, chat_id: UUID):
    chat = chat_repo.get(session, chat_id)
    if not chat:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Chat not found")
    if user.is_superuser or (chat.user_id and chat.user_id == user.id):
        return chat_repo.delete(session, chat)
    else:
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN, detail="Access denied")
