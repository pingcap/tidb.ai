from fastapi import APIRouter, HTTPException, Header
from http import HTTPStatus
from pydantic import BaseModel

from app.api.deps import SessionDep, OptionalUserDep
from app.models import FeedbackType, Feedback
from app.repositories import chat_repo

router = APIRouter()


class FeedbackRequest(BaseModel):
    feedback_type: FeedbackType
    comment: str


@router.post(
    "/chat-messages/{chat_message_id}/feedback", status_code=HTTPStatus.CREATED
)
def feedback(
    session: SessionDep,
    user: OptionalUserDep,
    chat_message_id: int,
    request: FeedbackRequest,
    origin: str = Header(None),
    referer: str = Header(None),
):
    chat_message = chat_repo.get_message(session, chat_message_id)
    if not chat_message:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail="Chat message not found"
        )
    feedback = Feedback(
        feedback_type=request.feedback_type,
        comment=request.comment,
        chat_message_id=chat_message_id,
        chat_id=chat_message.chat_id,
        user_id=user.id if user else None,
        origin=origin or referer,
    )
    session.add(feedback)
    session.commit()
    return
