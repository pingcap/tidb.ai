from fastapi import APIRouter, Depends
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import select

from app.api.deps import SessionDep, CurrentSuperuserDep
from app.models import Feedback

router = APIRouter()


@router.get("/admin/feedbacks")
def list_feedbacks(
    session: SessionDep,
    user: CurrentSuperuserDep,
    params: Params = Depends(),
) -> Page[Feedback]:
    return paginate(
        session, select(Feedback).order_by(Feedback.created_at.desc()), params
    )
