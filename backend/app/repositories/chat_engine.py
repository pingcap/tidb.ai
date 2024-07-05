from typing import Optional, List
from sqlmodel import select, Session
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate

from app.models import ChatEngine
from app.repositories.base_repo import BaseRepo


class ChatEngineRepo(BaseRepo):
    model_cls = ChatEngine

    def paginate(
        self,
        session: Session,
        params: Params | None = Params(),
    ) -> Page[ChatEngine]:
        query = select(ChatEngine).where(ChatEngine.deleted_at == None)
        # Make sure the default engine is always on top
        query = query.order_by(ChatEngine.is_default.desc(), ChatEngine.name)
        return paginate(session, query, params)

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
