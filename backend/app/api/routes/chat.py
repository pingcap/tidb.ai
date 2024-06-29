from typing import List

from pydantic import BaseModel
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.api.deps import SessionDep, OptionalUserDep
from app.rag.chat import ChatService
from app.rag.types import ChatMessage

router = APIRouter()


class ChatRequest(BaseModel):
    messages: List[ChatMessage]


@router.post("/chats")
def chats(session: SessionDep, user: OptionalUserDep, chat_request: ChatRequest):
    chat_svc = ChatService(session, user, 'default')

    def as_streaming_response():
        for i in chat_svc.chat(chat_request.messages):
            yield i

    return StreamingResponse(as_streaming_response(), media_type="text/event-stream")
