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

# Dependency for current user, it will return None if user is not authenticated
OptionalUserDep = Annotated[User | None, Depends(optional_current_user)]

# Dependencies for current user and superuser, it will return 401 if user is not authenticated
CurrentUserDep = Annotated[User, Depends(current_user)]
CurrentSuperuserDep = Annotated[User, Depends(current_superuser)]
