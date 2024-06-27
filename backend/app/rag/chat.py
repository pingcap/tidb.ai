import json
import logging
from typing import List, Iterator

from sqlmodel import Session
from llama_index.core import VectorStoreIndex, Settings
from llama_index.core.base.llms.base import BaseLLM, ChatMessage
from llama_index.core.chat_engine.types import ChatMode, StreamingAgentChatResponse
from llama_index.core.chat_engine.condense_question import DEFAULT_TEMPLATE as CONDENSE_QUESTION_TEMPLATE
from llama_index.core.callbacks import CallbackManager
from llama_index.core.prompts.base import PromptTemplate
from llama_index.embeddings.openai import OpenAIEmbedding, OpenAIEmbeddingModelType
from langfuse.decorators import langfuse_context, observe

from app.rag.vector_store.tidb_vector_store import TiDBVectorStore
from app.rag.knowledge_graph.graph_store import TiDBGraphStore
from app.rag.knowledge_graph import KnowledgeGraphIndex

logger = logging.getLogger(__name__)


class ChatService:
    def __init__(
        self,
        llm: BaseLLM,
    ) -> None:
        self._llm = llm
        self._embed_model = OpenAIEmbedding(
            model=OpenAIEmbeddingModelType.TEXT_EMBED_3_SMALL
        )

    @observe()
    def chat(self, session: Session, chat_messages: List[ChatMessage]) -> Iterator[str]:
        user_question, chat_history = self._parse_chat_messages(chat_messages)

        langfuse_handler = langfuse_context.get_current_llama_index_handler()
        Settings.callback_manager = CallbackManager([langfuse_handler])

        # 1. Retrieve entities, relations, and chunks from the knowledge graph
        graph_store = TiDBGraphStore(dspy_lm=None, embed_model=self._embed_model)
        graph_index: KnowledgeGraphIndex = KnowledgeGraphIndex.from_existing(
            dspy_lm=None, kg_store=graph_store, callback_manager=Settings.callback_manager
        )
        entities, relations, chunks = graph_index.retrieve_with_weight(
            user_question, [], include_meta=True
        )

        # 2. Refine the user question using graph information and chat history
        # 3. Retrieve the related chunks from the vector store
        # 4. Generate a response using the refined question and related chunks
        condense_question_prompt = self._build_condense_question_prompt(entities, relations, chunks)
        vector_store = TiDBVectorStore(session=session)
        vector_index = VectorStoreIndex.from_vector_store(
            vector_store,
            embed_model=self._embed_model,
        )
        chat_engine = vector_index.as_chat_engine(
            chat_mode=ChatMode.CONDENSE_QUESTION,
            llm=self._llm,
            condense_question_prompt=condense_question_prompt,
        )
        response: StreamingAgentChatResponse = chat_engine.stream_chat(
            message=user_question, chat_history=chat_history
        )
        for word in response.response_gen:
            yield word

    def _parse_chat_messages(
        self, chat_messages: List[ChatMessage]
    ) -> tuple[str, List[ChatMessage]]:
        user_question = chat_messages[-1].content
        chat_history = chat_messages[:-1]
        return user_question, chat_history

    def _build_condense_question_prompt(
        self, entities: List[dict], relations: List[dict], chunks: List[dict]
    ) -> PromptTemplate:
        # TODO: this is a temporary solution, we need to use a prompt from the database
        template = """\
Given a list of relationships of knowledge graph, the format of description of relationship is as follows:

- SOURCE_ENTITY_NAME -> RELATIONSHIP -> TARGET_ENTITY_NAME

When there is a conflict in meaning between knowledge relationships, the relationship with the higher `weight` and newer `last_modified_at` value takes precedence.

Knowledge relationships:
"""
        relations_str = (
            (
                f"description: {r['rag_description']}\n"
                f"weight: {r['weight']}\n"
                f"meta: {json.dumps(r['meta'], indent=4)}\n\n".replace("{", "{{").replace("}", "}}")
            )
            for r in relations
        )
        template += "\n".join(relations_str)
        template += """
---------------------

Entities:
        """
        entities_str = (
            (
                f"name: {e['name']}\n"
                f"description: {e['description']}\n"
                f"meta: {json.dumps(e['meta'], indent=4)}\n\n".replace("{", "{{").replace("}", "}}")
            )
            for e in entities
        )
        template += "\n".join(entities_str)
        template += """
---------------------

"""
        template += CONDENSE_QUESTION_TEMPLATE
        with open('temp', 'w') as f:
            f.write(template)
        return PromptTemplate(template=template)