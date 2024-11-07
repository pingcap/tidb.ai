import logging

from llama_index.core.base.embeddings.base import BaseEmbedding
from sqlmodel import Session

from app.models.knowledge_base import KnowledgeBase
from app.rag.chat_config import get_default_llm, get_llm, get_embedding_model, get_default_embedding_model
from app.rag.knowledge_base.dynamic_model import get_kb_chunks_table_name, get_kb_relationships_table_name, \
    get_kb_entities_table_name, get_kb_vector_dims
from app.rag.knowledge_graph.graph_store.tidb_graph_store import TiDBGraphStore
from app.rag.vector_store.tidb_vector_store import TiDBVectorStore
from app.utils.dspy import get_dspy_lm_by_llama_llm


logger = logging.getLogger(__name__)


def get_kb_llm(session: Session, kb: KnowledgeBase):
    db_llm = kb.llm
    if db_llm:
        return get_llm(db_llm.provider, db_llm.model, db_llm.config, db_llm.credentials)
    else:
        return get_default_llm(session)


def get_kb_dspy_llm(session: Session, kb: KnowledgeBase):
    llm = get_kb_llm(session, kb)
    return get_dspy_lm_by_llama_llm(llm)


def get_kb_embed_model(session: Session, kb: KnowledgeBase) -> BaseEmbedding:
    db_embed_model = kb.embedding_model
    if db_embed_model:
        return get_embedding_model(
            db_embed_model.provider,
            db_embed_model.model,
            db_embed_model.config,
            db_embed_model.credentials
        )
    else:
        return get_default_embedding_model(session)


def get_kb_tidb_vector_store(session: Session, kb: KnowledgeBase) -> TiDBVectorStore:
    vector_dimension = get_kb_vector_dims(kb)
    chunks_table_name = get_kb_chunks_table_name(kb)
    vector_store = TiDBVectorStore(
        session,
        table_name=chunks_table_name,
        vector_dimension=vector_dimension
    )
    return vector_store


def init_kb_tidb_vector_store(session: Session, kb: KnowledgeBase) -> TiDBVectorStore:
    vector_store = get_kb_tidb_vector_store(session, kb)
    vector_store.ensure_table_schema()
    return vector_store


def get_kb_tidb_graph_store(session: Session, kb: KnowledgeBase) -> TiDBGraphStore:
    dspy_lm = get_kb_dspy_llm(session, kb)
    embed_model = get_kb_embed_model(session, kb)
    relationships_table_name = get_kb_relationships_table_name(kb)
    entities_table_name = get_kb_entities_table_name(kb)
    vector_dimension = get_kb_vector_dims(kb)
    graph_store = TiDBGraphStore(
        dspy_lm=dspy_lm,
        session=session,
        embed_model=embed_model,
        relationships_table_name=relationships_table_name,
        entities_table_name=entities_table_name,
        vector_dimension=vector_dimension
    )
    return graph_store


def init_kb_tidb_graph_store(session: Session, kb: KnowledgeBase) -> TiDBGraphStore:
    graph_store = get_kb_tidb_graph_store(session, kb)
    graph_store.ensure_table_schema()
    return graph_store
