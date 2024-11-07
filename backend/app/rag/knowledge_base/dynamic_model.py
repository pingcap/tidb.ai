import logging

from app.models import KnowledgeBase
from app.models.chunk import get_chunk_model
from app.models.embed_model import DEFAULT_VECTOR_DIMENSION
from app.models.knowledge_graph import get_relationship_model, get_entity_model


logger = logging.getLogger(__name__)


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


def get_kb_chunk_model(kb: KnowledgeBase):
    vector_dimension = get_kb_vector_dims(kb)
    chunks_table_name = get_kb_chunks_table_name(kb)
    return get_chunk_model(chunks_table_name, vector_dimension)


def get_kb_relationship_model(kb: KnowledgeBase):
    vector_dimension = get_kb_vector_dims(kb)
    entities_table_name = get_kb_entities_table_name(kb)
    relationship_table_name = get_kb_relationships_table_name(kb)
    return get_relationship_model(relationship_table_name, entities_table_name, vector_dimension)


def get_kb_entity_model(kb):
    vector_dimension = get_kb_vector_dims(kb)
    entities_table_name = get_kb_entities_table_name(kb)
    return get_entity_model(entities_table_name, vector_dimension)