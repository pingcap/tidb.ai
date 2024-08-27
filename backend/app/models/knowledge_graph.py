import enum
from uuid import UUID
from typing import Optional, Any, List, Dict
from datetime import datetime

from sqlmodel import (
    SQLModel,
    Field,
    Column,
    JSON,
    Text,
    Relationship as SQLModelRelationship,
    DateTime,
)
from tidb_vector.sqlalchemy import VectorType

from app.core.config import settings


class EntityType(str, enum.Enum):
    original = "original"
    synopsis = "synopsis"

    def __str__(self):
        return self.value


class EntityBase(SQLModel):
    name: str = Field(max_length=512)
    description: str = Field(sa_column=Column(Text))
    meta: List | Dict = Field(default={}, sa_column=Column(JSON))
    entity_type: EntityType = EntityType.original
    synopsis_info: List | Dict | None = Field(default=None, sa_column=Column(JSON))


class Entity(EntityBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    description_vec: Any = Field(
        sa_column=Column(
            VectorType(settings.EMBEDDING_DIMS), comment="hnsw(distance=cosine)"
        )
    )
    meta_vec: Any = Field(
        sa_column=Column(
            VectorType(settings.EMBEDDING_DIMS), comment="hnsw(distance=cosine)"
        )
    )

    __tablename__ = "entities"

    def __hash__(self):
        return hash(self.id)

    # screenshot method is used to return a dictionary representation of the object
    # that can be used for recording or debugging purposes
    def screenshot(self):
        return self.model_dump(exclude={"description_vec", "meta_vec"})


# Public Entity model will be used in API response
class EntityPublic(EntityBase):
    id: int


class RelationshipBase(SQLModel):
    description: str = Field(sa_column=Column(Text))
    meta: List | Dict = Field(default={}, sa_column=Column(JSON))
    weight: int = 0
    source_entity_id: int = Field(foreign_key="entities.id")
    target_entity_id: int = Field(foreign_key="entities.id")
    last_modified_at: Optional[datetime] = Field(sa_column=Column(DateTime))
    document_id: Optional[int] = Field(default=None, nullable=True)
    chunk_id: Optional[UUID] = Field(default=None, nullable=True)


class Relationship(RelationshipBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    description_vec: Any = Field(
        sa_column=Column(
            VectorType(settings.EMBEDDING_DIMS), comment="hnsw(distance=cosine)"
        )
    )
    source_entity: Entity = SQLModelRelationship(
        sa_relationship_kwargs={
            "primaryjoin": "Relationship.source_entity_id == Entity.id",
            "lazy": "joined",
        },
    )
    target_entity: Entity = SQLModelRelationship(
        sa_relationship_kwargs={
            "primaryjoin": "Relationship.target_entity_id == Entity.id",
            "lazy": "joined",
        },
    )

    __tablename__ = "relationships"

    def __hash__(self):
        return hash(self.id)

    def screenshot(self):
        obj_dict = self.model_dump(
            exclude={
                "description_vec",
                "source_entity",
                "target_entity",
                "last_modified_at",
            }
        )
        return obj_dict


class RelationshipPublic(RelationshipBase):
    id: int
