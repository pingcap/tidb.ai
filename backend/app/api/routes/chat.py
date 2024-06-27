from typing import List, Optional, Any
from enum import Enum

from pydantic import BaseModel
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from llama_index.llms.openai import OpenAI

from app.api.deps import SessionDep
from app.rag.chat import ChatService
from app.rag.schema import ChatMessage

router = APIRouter()


class ChatRequest(BaseModel):
    messages: List[ChatMessage]


def test(session, chat_messages):
    chat_svc = ChatService(llm=OpenAI(model="gpt-3.5-turbo"))
    for i in chat_svc.chat(session, chat_messages):
        yield i




@router.post("/chats")
def chats(session: SessionDep, chat_request: ChatRequest):
    chat_svc = ChatService(llm=OpenAI(model="gpt-3.5-turbo"))
    def as_streaming_response():
        for i in chat_svc.chat(session, chat_request.messages):
            yield i
    return StreamingResponse(
        as_streaming_response(),
        media_type="text/event-stream"
    )
