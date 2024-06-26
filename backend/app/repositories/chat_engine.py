from typing import Optional, List
from sqlmodel import select, Session

from app.models import ChatEngine
from app.repositories.base_repo import BaseRepo


class ChatEngineRepo(BaseRepo):
    model_cls = ChatEngine

    def get_default_engine(self, session: Session) -> Optional[ChatEngine]:
        return session.exec(
            select(ChatEngine).where(
                ChatEngine.is_default == True, ChatEngine.deleted_at == None
            )
        ).first()

    def get_engine_by_name(self, session: Session, name: str) -> Optional[ChatEngine]:
        return session.exec(
            select(ChatEngine).where(
                ChatEngine.name == name, ChatEngine.deleted_at == None
            )
        ).first()


chat_engine_repo = ChatEngineRepo()
