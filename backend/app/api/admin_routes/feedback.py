from fastapi import APIRouter, Depends
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import select

from app.api.deps import SessionDep, CurrentSuperuserDep
from app.models import Feedback, AdminFeedbackPublic

router = APIRouter()


@router.get("/admin/feedbacks")
def list_feedbacks(
    session: SessionDep,
    user: CurrentSuperuserDep,
    params: Params = Depends(),
) -> Page[AdminFeedbackPublic]:
    return paginate(
        session,
        select(Feedback).order_by(Feedback.created_at.desc()),
        params,
        transformer=lambda items: [
            AdminFeedbackPublic(
                **item.model_dump(),
                chat_title=item.chat.title,
                chat_message_content=item.chat_message.content,
                user_email=item.user.email if item.user else None,
            )
            for item in items
        ],
    )
