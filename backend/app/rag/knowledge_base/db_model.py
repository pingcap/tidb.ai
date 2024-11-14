import enum
import logging
from datetime import datetime
from typing import Any, Optional, List, Dict, Type
from uuid import UUID

from llama_index.core.schema import TextNode
from sqlalchemy import Text, Column, JSON, DateTime, func, Index
from sqlalchemy.orm.decl_api import RegistryType
from sqlmodel import (
    Relationship as SQLRelationship
)
from sqlmodel import Field
from sqlmodel.main import default_registry
from tidb_vector.sqlalchemy import VectorType

from app.models import KnowledgeBase, Document
from app.models.embed_model import DEFAULT_VECTOR_DIMENSION
from sqlmodel import SQLModel
from app.rag.knowledge_base.patch.sql_model import SQLModel as PatchSQLModel
from app.utils.uuid6 import uuid7


logger = logging.getLogger(__name__)


class KBSQLModelContext:
    # Each Knowledge Base has an independent sqlalchemy registry (aka. namespace), to avoid conflicts
    # between SQLModels with the same class name.
    registry: RegistryType = None

    chunk_model: Optional[PatchSQLModel] = None
    entity_model: Optional[PatchSQLModel] = None
    relationship_model: Optional[PatchSQLModel] = None

    def __init__(self, registry: RegistryType = default_registry):
        self.registry = registry


kb_sql_model_contexts:Dict[str, KBSQLModelContext] = {}


def get_kb_sql_model_context(kb: KnowledgeBase) -> KBSQLModelContext:
    ns = f"knowledge_base_{kb.id}"
    if ns not in kb_sql_model_contexts:
        registry = RegistryType(
            metadata=default_registry.metadata,
            class_registry=default_registry._class_registry.copy()
        )
        kb_sql_model_contexts[ns] = KBSQLModelContext(registry)
    return kb_sql_model_contexts[ns]


DEFAULT_CHUNKS_TABLE_NAME = "chunks"
DEFAULT_ENTITIES_TABLE_NAME = "entities"
DEFAULT_RELATIONSHIPS_TABLE_NAME = "relationships"

CHUNKS_TABLE_PREFIX = "chunks_"
ENTITIES_TABLE_PREFIX = "entities_"
RELATIONSHIPS_TABLE_PREFIX = "relationships_"


def get_kb_chunks_table_name(knowledge_base: KnowledgeBase) -> str:
    return CHUNKS_TABLE_PREFIX + str(knowledge_base.id) if knowledge_base else DEFAULT_CHUNKS_TABLE_NAME


def get_kb_relationships_table_name(knowledge_base: KnowledgeBase) -> str:
    return RELATIONSHIPS_TABLE_PREFIX + str(knowledge_base.id) if knowledge_base else DEFAULT_RELATIONSHIPS_TABLE_NAME


def get_kb_entities_table_name(knowledge_base: KnowledgeBase) -> str:
    return ENTITIES_TABLE_PREFIX + str(knowledge_base.id) if knowledge_base else DEFAULT_ENTITIES_TABLE_NAME


def get_kb_vector_dims(kb: KnowledgeBase):
    vector_dimension = DEFAULT_VECTOR_DIMENSION
    if kb.embedding_model and kb.embedding_model.vector_dimension:
        vector_dimension = kb.embedding_model.vector_dimension
    else:
        logger.warning(f"This knowledge base doesn't configured a embedding model or this vector vector_dimension of the embedding model is miss.")
    return vector_dimension


class KgIndexStatus(str, enum.Enum):
    NOT_STARTED = "not_started"
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


def get_kb_chunk_model(kb: KnowledgeBase) -> SQLModel:
    vector_dimension = get_kb_vector_dims(kb)
    chunks_table_name = get_kb_chunks_table_name(kb)
    ctx = get_kb_sql_model_context(kb)

    if ctx.chunk_model:
        return ctx.chunk_model


    class KBChunk(PatchSQLModel, table=True, registry=ctx.registry):
        __tablename__ = chunks_table_name
        __table_args__ = {'extend_existing': True}

        id: UUID = Field(primary_key=True, index=True, nullable=False, default_factory=uuid7)
        hash: str = Field(max_length=64)
        text: str = Field(sa_column=Column(Text))
        meta: dict | list = Field(default={}, sa_column=Column(JSON))
        embedding: Any = Field(
            sa_column=Column(
                VectorType(vector_dimension), comment="hnsw(distance=cosine)"
            )
        )
        document_id: int = Field(foreign_key="documents.id", nullable=True)
        document: "Document" = SQLRelationship()
        relations: dict | list = Field(default={}, sa_column=Column(JSON))
        source_uri: str = Field(max_length=512, nullable=True)

        # TODO: Add vector_index_status, vector_index_result column, vector index should be optional in the future.

        # TODO: Rename to kg_index_status, kg_index_result column.
        index_status: KgIndexStatus = KgIndexStatus.NOT_STARTED
        index_result: str = Field(sa_column=Column(Text, nullable=True))

        created_at: Optional[datetime] = Field(
            default=None,
            sa_column=Column(DateTime(timezone=True), server_default=func.now()),
        )
        updated_at: Optional[datetime] = Field(
            default=None,
            sa_type=DateTime(timezone=True),
            sa_column_kwargs={"server_default": func.now(), "onupdate": func.now()},
        )

        def to_llama_text_node(self) -> TextNode:
            return TextNode(
                id_=self.id.hex,
                text=self.text,
                embedding=list(self.embedding),
                metadata=self.meta,
            )

    ctx.chunk_model = KBChunk
    return KBChunk


class EntityType(str, enum.Enum):
    original = "original"
    synopsis = "synopsis"

    def __str__(self):
        return self.value


def get_kb_entity_model(kb) -> SQLModel:
    vector_dimension = get_kb_vector_dims(kb)
    entities_table_name = get_kb_entities_table_name(kb)
    ctx = get_kb_sql_model_context(kb)

    if ctx.entity_model:
        return ctx.entity_model

    class KBEntity(PatchSQLModel, table=True, registry=ctx.registry):
        __tablename__ = entities_table_name
        __table_args__ = (
            Index("idx_entity_type", "entity_type"),
            {'extend_existing': True}
        )

        id: Optional[int] = Field(default=None, primary_key=True)
        name: str = Field(max_length=512)
        description: str = Field(sa_column=Column(Text))
        meta: List | Dict = Field(default={}, sa_column=Column(JSON))
        entity_type: EntityType = EntityType.original
        synopsis_info: List | Dict | None = Field(default=None, sa_column=Column(JSON))
        description_vec: Any = Field(
            sa_column=Column(
                VectorType(vector_dimension), comment="hnsw(distance=cosine)"
            )
        )
        meta_vec: Any = Field(
            sa_column=Column(
                VectorType(vector_dimension), comment="hnsw(distance=cosine)"
            )
        )

        def __hash__(self):
            return hash(self.id)

        def screenshot(self):
            return self.model_dump(exclude={"description_vec", "meta_vec"})

    ctx.entity_model = KBEntity
    return KBEntity


def get_kb_relationship_model(kb: KnowledgeBase) -> SQLModel:
    vector_dimension = get_kb_vector_dims(kb)
    entities_table_name = get_kb_entities_table_name(kb)
    relationships_table_name = get_kb_relationships_table_name(kb)
    ctx = get_kb_sql_model_context(kb)

    if ctx.entity_model:
        entity_model = ctx.entity_model
    else:
        entity_model = get_kb_entity_model(kb)

    if ctx.relationship_model:
        return ctx.relationship_model

    class KBRelationship(PatchSQLModel, table=True, registry=ctx.registry):
        __tablename__ = relationships_table_name
        __table_args__ = ({'extend_existing': True},)

        id: Optional[int] = Field(default=None, primary_key=True)
        description: str = Field(sa_column=Column(Text))
        meta: List | Dict = Field(default={}, sa_column=Column(JSON))
        weight: int = 0
        source_entity_id: int = Field(foreign_key=f"{entities_table_name}.id")
        source_entity: entity_model = SQLRelationship(
            sa_relationship_kwargs={
                "primaryjoin": f"KBRelationship.source_entity_id == KBEntity.id",
                "lazy": "joined",
            },
        )
        target_entity_id: int = Field(foreign_key=f"{entities_table_name}.id")
        target_entity: entity_model = SQLRelationship(
            sa_relationship_kwargs={
                "primaryjoin": f"KBRelationship.target_entity_id == KBEntity.id",
                "lazy": "joined",
            },
        )
        last_modified_at: Optional[datetime] = Field(sa_column=Column(DateTime))
        document_id: Optional[int] = Field(default=None, nullable=True)
        chunk_id: Optional[UUID] = Field(default=None, nullable=True)
        description_vec: list[float] = Field(
            sa_column=Column(
                VectorType(vector_dimension), comment="hnsw(distance=cosine)"
            )
        )

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

    ctx.relationship_model = KBRelationship
    return KBRelationship
