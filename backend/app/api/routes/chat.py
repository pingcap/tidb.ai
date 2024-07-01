from typing import List

from pydantic import BaseModel
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.api.deps import SessionDep, OptionalUserDep
from app.rag.chat import ChatService, ChatEventType
from app.rag.types import ChatMessage

router = APIRouter()


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    stream: bool = True


@router.post("/chats")
def chats(session: SessionDep, user: OptionalUserDep, chat_request: ChatRequest):
    chat_svc = ChatService(session, user, "default")

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
