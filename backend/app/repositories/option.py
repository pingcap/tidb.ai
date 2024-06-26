from typing import Optional, List
from sqlmodel import select, Session

from app.models import Option
from app.repositories.base_repo import BaseRepo


class OptionRepo(BaseRepo):
    model_cls = Option

    def get_option_by_name(self, session: Session, name: str) -> Optional[Option]:
        return session.exec(select(Option).where(Option.name == name)).first()

    def get_options_by_group(self, session: Session, group_name: str) -> List[Option]:
        return session.exec(select(Option).where(Option.group_name == group_name)).all()


option_repo = OptionRepo()
