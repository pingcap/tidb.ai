from fastapi import APIRouter

from app.api.deps import OptionalUserDep
from app.auth.schemas import UserRead

router = APIRouter()


@router.get("/users/me", response_model=UserRead | None)
def me(user: OptionalUserDep):
    return user
