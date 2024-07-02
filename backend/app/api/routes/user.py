from fastapi import APIRouter

from app.api.deps import CurrentUserDep
from app.auth.schemas import UserRead

router = APIRouter()


@router.get("/users/me", response_model=UserRead)
def me(user: CurrentUserDep):
    return user
