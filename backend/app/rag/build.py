import logging

import dspy
from llama_index.core import (
    VectorStoreIndex,
)
from llama_index.core.base.llms.base import BaseLLM
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.extractors import (
    SummaryExtractor,
    KeywordExtractor,
    QuestionsAnsweredExtractor,
)
from sqlmodel import Session, select

from app.rag.knowledge_graph.graph_store import TiDBGraphStore
from app.rag.knowledge_graph import KnowledgeGraphIndex
from app.rag.vector_store.tidb_vector_store import TiDBVectorStore
from app.models import (
    Document as DBDocument,
    Chunk as DBChunk,
)

logger = logging.getLogger(__name__)


class BuildService:
    """
    Service class for build vector index and graph index.
    """

    def __init__(
        self,
        llm: BaseLLM,
        dspy_llm: dspy.LM,
    ):
        self._llm = llm
        self._dspt_llm = dspy_llm
        self._transformations = [
            SentenceSplitter(),
            SummaryExtractor(llm=llm),
            KeywordExtractor(llm=llm),
            QuestionsAnsweredExtractor(llm=llm),
        ]

    def build_from_document(self, session: Session, db_document: DBDocument):
        """
        Build vector index and graph index from document.
        """
        # Build vector index will do the following:
        # 1. Parse document into nodes.
        # 2. Extract metadata from nodes by applying transformations.
        # 3. embedding text nodes.
        # 4. Insert nodes into `chunks` table.
        vector_store = TiDBVectorStore(session=session)
        vector_index = VectorStoreIndex.from_vector_store(
            vector_store,
            transformations=self._transformations,
        )
        document = db_document.to_llama_document()
        logger.info(f"Start building index for document {document.id}")
        vector_index.insert(document)
        logger.info(f"Finish building vecter index for document {document.id}")

        # Build graph index will do the following:
        # 1. load TextNode from `chunks` table.
        # 2. extract entities and relations from TextNode.
        # 3. insert entities and relations into `entities` and `relations` table.
        graph_store = TiDBGraphStore(dspy_lm=self._dspt_llm)
        graph_index = KnowledgeGraphIndex.from_existing(
            dspy_lm=self._dspt_llm, kg_store=graph_store
        )
        db_chunks = session.exec(
            select(DBChunk).where(DBChunk.document_id == db_document.id)
        )
        for chunk in db_chunks:
            node = chunk.to_llama_text_node()
            logger.info(f"Start building graph index for chunk {chunk.id}")
            graph_index.insert_nodes([node])
            logger.info(f"Finish building graph index for chunk {chunk.id}")
