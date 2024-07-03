import enum
from uuid import UUID
from typing import Optional

from sqlmodel import (
    Field,
    Relationship as SQLRelationship,
)

from .base import UpdatableBaseModel


class FeedbackType(str, enum.Enum):
    LIKE = "like"
    DISLIKE = "dislike"

    @classmethod
    def adjust_relationship_weight(cls, feedback_type):
        weights = {cls.LIKE: 10, cls.DISLIKE: -10}
        return weights.get(feedback_type, 0)


class Feedback(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    feedback_type: FeedbackType = FeedbackType.LIKE
    comment: str = Field(max_length=500, default=None)
    chat_id: UUID = Field(foreign_key="chats.id")
    chat: "Chat" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "Feedback.chat_id == Chat.id",
        },
    )
    chat_message_id: int = Field(foreign_key="chat_messages.id")
    chat_message: "ChatMessage" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "Feedback.chat_message_id == ChatMessage.id",
        },
    )
    user_id: UUID = Field(foreign_key="users.id", nullable=True)
    user: "User" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "Feedback.user_id == User.id",
        },
    )

    __tablename__ = "feedbacks"
