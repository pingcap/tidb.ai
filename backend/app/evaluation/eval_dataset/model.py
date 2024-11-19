from pydantic import BaseModel
from typing import Optional
import datetime


class Post(BaseModel):
    id: int
    raw: Optional[str] = None
    cooked: Optional[str] = None

    incoming_link_count: Optional[int] = None
    reads: Optional[int] = None
    bookmarked: Optional[int] = None
    readers_count: Optional[int] = None
    score: Optional[float] = None
    accepted_answer: Optional[int] = None
    topic_accepted_answer: Optional[int] = None

    created_at: Optional[datetime.datetime] = None
    updated_at: Optional[datetime.datetime] = None


class Topic(BaseModel):
    id: int
    title: Optional[str] = None
    fancy_title: Optional[str] = None
    slug: Optional[str] = None
    category_id: Optional[int] = None

    posts_count: Optional[int] = None
    reply_count: Optional[int] = None
    like_count: Optional[int] = None
    views: Optional[int] = None

    has_summary: Optional[int] = None
    has_accepted_answer: Optional[int] = None

    created_at: Optional[datetime.datetime] = None
    last_posted_at: Optional[datetime.datetime] = None

    question_post: Optional[Post] = None
    accepted_answer: Optional[Post] = None
