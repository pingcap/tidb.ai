import json
import logging
from typing import List, Generator

from sqlmodel import Session
from llama_index.core import VectorStoreIndex, Settings
from llama_index.core.base.llms.base import ChatMessage
from llama_index.core.chat_engine.types import ChatMode, StreamingAgentChatResponse
from llama_index.core.chat_engine.condense_question import (
    DEFAULT_TEMPLATE as CONDENSE_QUESTION_TEMPLATE,
)
from llama_index.core.callbacks import CallbackManager
from llama_index.core.prompts.base import PromptTemplate
from langfuse.decorators import langfuse_context, observe

from app.models import User
from app.core.config import settings
from app.rag.vector_store.tidb_vector_store import TiDBVectorStore
from app.rag.knowledge_graph.graph_store import TiDBGraphStore
from app.rag.knowledge_graph import KnowledgeGraphIndex
from app.rag.chat_config import ChatEngineConfig

logger = logging.getLogger(__name__)


class ChatService:
    def __init__(
        self,
        session: Session,
        user: User,
        engine_name: str,
    ) -> None:
        self.session = session
        self.user = user
        self.engine_name = engine_name

        self.chat_engine_config = ChatEngineConfig.load_from_db(session, engine_name)
        self._llm = self.chat_engine_config.get_llama_llm()
        self._dspy_lm = self.chat_engine_config.get_dspy_lm()
        self._embed_model = self.chat_engine_config.get_embedding_model()

    @observe()
    def chat(self, chat_messages: List[ChatMessage]) -> Generator[str, None, None]:
        user_question, chat_history = self._parse_chat_messages(chat_messages)

        langfuse_handler = langfuse_context.get_current_llama_index_handler()
        Settings.callback_manager = CallbackManager([langfuse_handler])
        langfuse_context.update_current_observation(
            user_id=self.user.email if self.user else "anonymous",
            release=settings.ENVIRONMENT,
            tags=[f"chat_engine:{self.engine_name}"]
        )

        # 1. Retrieve entities, relations, and chunks from the knowledge graph
        graph_store = TiDBGraphStore(
            dspy_lm=self._dspy_lm, session=self.session, embed_model=self._embed_model
        )
        graph_index: KnowledgeGraphIndex = KnowledgeGraphIndex.from_existing(
            dspy_lm=self._dspy_lm,
            kg_store=graph_store,
            callback_manager=Settings.callback_manager,
        )
        entities, relations, chunks = graph_index.retrieve_with_weight(
            user_question, [], include_meta=True
        )

        # 2. Refine the user question using graph information and chat history
        # 3. Retrieve the related chunks from the vector store
        # 4. Generate a response using the refined question and related chunks
        condense_question_prompt = self._build_condense_question_prompt(
            entities, relations, chunks
        )
        vector_store = TiDBVectorStore(session=self.session)
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
        relations_str = "\n".join([
            (
                f"description: {r['rag_description']}\n"
                f"weight: {r['weight']}\n"
                f"meta: {json.dumps(r['meta'], indent=4)}\n"
            )
            for r in relations
        ])
        entities_str = "\n".join([
            (
                f"name: {e['name']}\n"
                f"description: {e['description']}\n"
                f"meta: {json.dumps(e['meta'], indent=4)}\n"
            )
            for e in entities
        ])
        template = f"""\
{self.chat_engine_config.llm.condense_question_prompt}

Knowledge relationships:

{relations_str}

----------------------

Entities:
{entities_str}

-----------------------

"""
        template = template.replace("{", "{{").replace("}", "}}")
        template += CONDENSE_QUESTION_TEMPLATE
        with open("temp", "w") as f:
            f.write(template)
        return PromptTemplate(template=template)
