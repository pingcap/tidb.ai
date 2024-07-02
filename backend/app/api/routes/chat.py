from typing import List

from pydantic import (
    BaseModel,
    field_validator,
)
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.api.deps import SessionDep, OptionalUserDep
from app.rag.chat import ChatService, ChatEventType
from app.rag.types import ChatMessage, MessageRole

router = APIRouter()


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    chat_engine: str = "default"
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

        def as_streaming_response():
            for i in chat_svc.chat(chat_request.messages):
                yield i

        return StreamingResponse(
            as_streaming_response(), media_type="text/event-stream"
        )
    else:
        trace = None
        soruces = None
        content = ""
        for m in chat_svc.chat(chat_request.messages):
            if m.event_type == ChatEventType.CREATE:
                trace = m.payload
            elif m.event_type == ChatEventType.SOURCE_NODES:
                soruces = m.payload
            elif m.event_type == ChatEventType.TEXT_RESPONSE:
                content += m.payload
            else:
                pass
        return {
            "trace": trace,
            "sources": soruces,
            "content": content,
        }
