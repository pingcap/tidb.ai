import enum
from typing import Optional, List

from sqlmodel import (
    SQLModel,
    Field,
    Column,
    JSON,
)

from .base import UpdatableBaseModel


class FeedbackType(str, enum.Enum):
    like = "like"
    dislike = "dislike"

    @classmethod
    def adjust_relationship_weight(cls, feedback_type):
        weights = {cls.like: 10, cls.dislike: -10}
        return weights.get(feedback_type, 0)


class Feedback(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    feedback_type: FeedbackType = FeedbackType.like
    query: str
    langfuse_link: str
    relationships: List[int] = Field(default=[], sa_column=Column(JSON))

    __tablename__ = "feedback"


class FeedbackCreate(SQLModel):
    feedback_type: FeedbackType
    query: str
    langfuse_link: str
    relationships: List[int]
