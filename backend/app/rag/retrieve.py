import logging
from typing import List

from llama_index.core import VectorStoreIndex, ServiceContext
from llama_index.core.schema import NodeWithScore
from sqlmodel import Session, select

from app.models import (
    Document,
    Chunk,
)
from app.rag.chat import get_prompt_by_jinja2_template
from app.rag.chat_config import ChatEngineConfig, get_default_embedding_model
from app.rag.knowledge_graph import KnowledgeGraphIndex
from app.rag.knowledge_graph.graph_store import TiDBGraphStore
from app.rag.vector_store.tidb_vector_store import TiDBVectorStore

logger = logging.getLogger(__name__)


class RetrieveService:
    def __init__(
        self,
        db_session: Session,
        engine_name: str = "default",
    ) -> None:
        self.db_session = db_session
        self.engine_name = engine_name

        self.chat_engine_config = ChatEngineConfig.load_from_db(db_session, engine_name)
        self.db_chat_engine = self.chat_engine_config.get_db_chat_engine()
        self._reranker = self.chat_engine_config.get_reranker(db_session)

    def retrieve(self, question: str, top_k: int = 10) -> List[Document]:
        """
        Retrieve the related documents based on the user question.
        Args:
            question: The question from client.
            top_k: The number of top-k CHUNKS, and retrieve its related documents.
                   Which means it might return less than top_k documents.

        Returns:
            A list of related documents.
        """
        try:
            return self._retrieve(question, top_k)
        except Exception as e:
            logger.exception(e)

    def _retrieve(self, question: str, top_k: int) -> List[Document]:
        _embed_model = get_default_embedding_model(self.db_session)
        _llm = self.chat_engine_config.get_llama_llm(self.db_session)
        _fast_llm = self.chat_engine_config.get_fast_llama_llm(self.db_session)
        _fast_dspy_lm = self.chat_engine_config.get_fast_dspy_lm(self.db_session)

        # 1. Retrieve entities, relations, and chunks from the knowledge graph
        kg_config = self.chat_engine_config.knowledge_graph
        if kg_config.enabled:
            graph_store = TiDBGraphStore(
                dspy_lm=_fast_dspy_lm,
                session=self.db_session,
                embed_model=_embed_model,
            )
            graph_index: KnowledgeGraphIndex = KnowledgeGraphIndex.from_existing(
                dspy_lm=_fast_dspy_lm,
                kg_store=graph_store,
            )

            if kg_config.using_intent_search:
                intent_relationships = graph_index.intent_analyze(question)
                result = graph_index.intent_based_search(intent_relationships, include_meta=True)

                graph_knowledges = get_prompt_by_jinja2_template(
                    self.chat_engine_config.llm.intent_graph_knowledge,
                    sub_queries=result["queries"],
                )
                graph_knowledges_context = graph_knowledges.template
            else:
                entities, relations, chunks = graph_index.retrieve_with_weight(
                    question,
                    [],
                    depth=kg_config.depth,
                    include_meta=kg_config.include_meta,
                    with_degree=kg_config.with_degree,
                    with_chunks=False,
                )
                graph_knowledges = get_prompt_by_jinja2_template(
                    self.chat_engine_config.llm.normal_graph_knowledge,
                    entities=entities,
                    relationships=relations,
                )
                graph_knowledges_context = graph_knowledges.template
        else:
            entities, relations, chunks = [], [], []
            graph_knowledges_context = ""

        # 2. Refine the user question using graph information and chat history
        refined_question = _fast_llm.predict(
            get_prompt_by_jinja2_template(
                self.chat_engine_config.llm.condense_question_prompt,
                graph_knowledges=graph_knowledges_context,
                question=question,
            ),
        )

        # 3. Retrieve the related chunks from the vector store
        # 4. Rerank after the retrieval
        # 5. Generate a response using the refined question and related chunks
        text_qa_template = get_prompt_by_jinja2_template(
            self.chat_engine_config.llm.text_qa_prompt,
            graph_knowledges=graph_knowledges_context,
        )
        refine_template = get_prompt_by_jinja2_template(
            self.chat_engine_config.llm.refine_prompt,
            graph_knowledges=graph_knowledges_context,
        )
        service_context = ServiceContext.from_defaults(
            llm=_llm,
            embed_model=_embed_model,
        )
        vector_store = TiDBVectorStore(session=self.db_session)
        vector_index = VectorStoreIndex.from_vector_store(
            vector_store,
            service_context=service_context,
        )

        retrieve_engine = vector_index.as_retriever(
            node_postprocessors=[self._reranker],
            streaming=True,
            text_qa_template=text_qa_template,
            refine_template=refine_template,
            similarity_top_k=top_k,
            service_context=service_context,
        )

        node_list: List[NodeWithScore] = retrieve_engine.retrieve(refined_question)
        source_documents = self._get_source_documents(node_list)

        return source_documents

    def _get_source_documents(self, node_list: List[NodeWithScore]) -> List[Document]:
        source_nodes_ids = [s_n.node_id for s_n in node_list]
        stmt = select(Document).where(
            Document.id.in_(
                select(
                    Chunk.document_id,
                ).where(
                    Chunk.id.in_(source_nodes_ids),
                )
            ),
        )

        return list(self.db_session.exec(stmt).all())
