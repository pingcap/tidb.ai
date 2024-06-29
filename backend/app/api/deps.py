from typing import Annotated
from fastapi import Depends
from sqlmodel import Session

from app.core.db import get_db_session
from app.models import User
from app.auth.users import (
    current_user,
    current_superuser,
    optional_current_user,
)


SessionDep = Annotated[Session, Depends(get_db_session)]

OptionalUserDep = Annotated[User | None, Depends(optional_current_user)]
CurrentUserDep = Annotated[User, Depends(current_user)]
CurrentSuperuserDep = Annotated[User, Depends(current_superuser)]
