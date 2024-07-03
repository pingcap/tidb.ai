from uuid import UUID
from typing import Optional, List
from datetime import datetime, UTC

from sqlmodel import select, Session
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate

from app.models import Chat, User, ChatMessage
from app.repositories.base_repo import BaseRepo


class ChatRepo(BaseRepo):
    model_cls = Chat

    def paginate(
        self,
        session: Session,
        user: User | None,
        params: Params | None = Params(),
    ) -> Page[Chat]:
        query = select(Chat).where(Chat.deleted_at == None)
        if user:
            if not user.is_superuser:
                query = query.where(Chat.user_id == user.id)
        else:
            # Anonymouse user can't list chats
            query = query.where(False)
        return paginate(session, query, params)

    def get(
        self,
        session: Session,
        chat_id: UUID,
    ) -> Optional[Chat]:
        return session.exec(
            select(Chat).where(Chat.id == chat_id, Chat.deleted_at == None)
        ).first()

    def delete(self, session: Session, chat: Chat):
        chat.deleted_at = datetime.now(UTC)
        session.add(chat)
        session.commit()

    def get_last_message(self, session: Session, chat: Chat) -> Optional[ChatMessage]:
        return session.exec(
            select(ChatMessage)
            .where(ChatMessage.chat_id == chat.id)
            .order_by(ChatMessage.ordinal.desc())
        ).first()

    def get_messages(
        self,
        session: Session,
        chat: Chat,
    ) -> List[ChatMessage]:
        return session.exec(
            select(ChatMessage)
            .where(ChatMessage.chat_id == chat.id)
            .order_by(ChatMessage.ordinal.asc())
        ).all()

    def get_message(
        self,
        session: Session,
        chat_message_id: int,
    ) -> Optional[ChatMessage]:
        return session.exec(
            select(ChatMessage).where(
                ChatMessage.id == chat_message_id,
                ChatMessage.chat.has(Chat.deleted_at == None),
            )
        ).first()

    def create_message(
        self,
        session: Session,
        chat: Chat,
        chat_message: ChatMessage,
    ) -> ChatMessage:
        if not chat_message.ordinal:
            last_message = self.get_last_message(session, chat)
            if last_message:
                ordinal = last_message.ordinal + 1
            else:
                ordinal = 1
            chat_message.ordinal = ordinal
        chat_message.chat_id = chat.id
        chat_message.user_id = chat.user_id
        session.add(chat_message)
        session.commit()
        session.refresh(chat_message)
        return chat_message


chat_repo = ChatRepo()
