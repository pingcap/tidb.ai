import enum
import json
import logging
from typing import List, Generator
from dataclasses import dataclass

import jinja2
from sqlmodel import Session, select
from llama_index.core import VectorStoreIndex, Settings
from llama_index.core.base.llms.base import ChatMessage
from llama_index.core.prompts.base import PromptTemplate
from llama_index.core.base.response.schema import StreamingResponse
from llama_index.core.callbacks.schema import EventPayload
from llama_index.core.callbacks import CallbackManager
from llama_index.core.prompts.base import PromptTemplate
from langfuse import Langfuse
from langfuse.llama_index import LlamaIndexCallbackHandler

from app.models import User, Document, Chunk
from app.core.config import settings
from app.rag.vector_store.tidb_vector_store import TiDBVectorStore
from app.rag.knowledge_graph.graph_store import TiDBGraphStore
from app.rag.knowledge_graph import KnowledgeGraphIndex
from app.rag.chat_config import ChatEngineConfig
from app.rag.types import MyCBEventType

logger = logging.getLogger(__name__)


class ChatEventType(int, enum.Enum):
    CREATE = 0
    KG_RETRIEVAL = 1
    REFINE_QUESTION = 2
    SEARCH_RELATED_DOCUMENTS = 3
    SOURCE_NODES = 4
    TEXT_RESPONSE = 8
    DONE = 9


@dataclass
class ChatEvent:
    event_type: ChatEventType = ChatEventType.CREATE
    display: str = ""
    payload: dict[str, str] | list | str = ""

    def encode(self, charset) -> bytes:
        # fastapi will use this method in streaming response
        body = {
            "event_type": self.event_type.name,
        }
        if self.payload:
            body["payload"] = self.payload
        if self.display:
            body["display"] = self.display
        body = json.dumps(body, separators=(",", ":"))
        return f"{self.event_type.value}: {body}\n".encode(charset)


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
        self._reranker = self.chat_engine_config.get_reranker()

    def chat(
        self, chat_messages: List[ChatMessage]
    ) -> Generator[ChatEvent, None, None]:
        user_question, chat_history = self._parse_chat_messages(chat_messages)

        langfuse = Langfuse()
        observation = langfuse.trace(
            name="chat",
            user_id=self.user.email if self.user else "anonymous",
            metadata={
                "chat_engine_config": self.chat_engine_config.screenshot(),
            },
            tags=[f"chat_engine:{self.engine_name}"],
            release=settings.ENVIRONMENT,
            input={
                "user_question": user_question,
                "chat_history": chat_history,
            },
        )
        trace_id = observation.trace_id

        def _set_langfuse_callback_manager():
            # Why we don't use high-level decorator `observe()` as \
            #   `https://langfuse.com/docs/integrations/llama-index/get-started` suggested?
            # track:
            #   - https://github.com/langfuse/langfuse/issues/2015
            #   - https://langfuse.com/blog/2024-04-python-decorator
            observation = langfuse.trace(id=trace_id)
            langfuse_handler = LlamaIndexCallbackHandler()
            langfuse_handler.set_root(observation)
            Settings.callback_manager = CallbackManager([langfuse_handler])
            self._llm.callback_manager = Settings.callback_manager

        yield ChatEvent(
            ChatEventType.CREATE,
            display="Start chatting",
            payload={"langfuse_url": observation.get_trace_url()},
        )

        # 1. Retrieve entities, relations, and chunks from the knowledge graph
        yield ChatEvent(
            ChatEventType.KG_RETRIEVAL,
            display="Start knowledge graph searching ...",
            payload={},
        )
        _set_langfuse_callback_manager()
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
        yield ChatEvent(
            ChatEventType.REFINE_QUESTION,
            display="Refine the user question ...",
            payload={},
        )
        _set_langfuse_callback_manager()
        with Settings.callback_manager.as_trace("condense_question"):
            with Settings.callback_manager.event(
                MyCBEventType.CONDENSE_QUESTION,
                payload={EventPayload.QUERY_STR: user_question},
            ) as event:
                refined_question = self._llm.predict(
                    PromptTemplate(
                        # use jinja2's template because it support complex render logic
                        template=jinja2.Template(
                            self.chat_engine_config.llm.condense_question_prompt
                        )
                        .render(
                            relationships=relations,
                            entities=entities,
                            chat_history=chat_history,
                            question=user_question,
                            # llama-index will use f-string to format the template
                            # so we need to escape the curly braces even if we do not use it
                        )
                        .replace("{", "{{")
                        .replace("}", "}}")
                    ),
                )
                event.on_end(payload={EventPayload.COMPLETION: refined_question})

        # 3. Retrieve the related chunks from the vector store
        # 4. Rerank after the retrieval
        # 5. Generate a response using the refined question and related chunks
        yield ChatEvent(
            ChatEventType.SEARCH_RELATED_DOCUMENTS,
            display="Search related documents ...",
            payload={},
        )
        _set_langfuse_callback_manager()
        text_qa_template = PromptTemplate(
            template=jinja2.Template(self.chat_engine_config.llm.text_qa_prompt)
            .render(
                entities=entities,
                relationships=relations,
            )
            .replace("{", "{{")
            .replace("}", "}}")
            # This is a workaround to escape the curly braces.
            # llama-index will use f-string to format following variables
            .replace("<<context_str>>", "{context_str}")
            .replace("<<query_str>>", "{query_str}")
        )
        refine_template = PromptTemplate(
            template=jinja2.Template(self.chat_engine_config.llm.refine_prompt)
            .render(
                entities=entities,
                relationships=relations,
            )
            .replace("{", "{{")
            .replace("}", "}}")
            .replace("<<query_str>>", "{query_str}")
            .replace("<<existing_answer>>", "{existing_answer}")
            .replace("<<context_msg>>", "{context_msg}")
        )
        vector_store = TiDBVectorStore(session=self.session)
        vector_index = VectorStoreIndex.from_vector_store(
            vector_store,
            embed_model=self._embed_model,
        )
        query_engine = vector_index.as_query_engine(
            llm=self._llm,
            node_postprocessors=[self._reranker],
            streaming=True,
            text_qa_template=text_qa_template,
            refine_template=refine_template,
        )
        response: StreamingResponse = query_engine.query(refined_question)

        yield ChatEvent(
            ChatEventType.SOURCE_NODES,
            payload=self._get_source_documents(response),
        )

        for word in response.response_gen:
            yield ChatEvent(
                ChatEventType.TEXT_RESPONSE,
                payload=word,
            )

        yield ChatEvent(ChatEventType.DONE)

    def _parse_chat_messages(
        self, chat_messages: List[ChatMessage]
    ) -> tuple[str, List[ChatMessage]]:
        user_question = chat_messages[-1].content
        chat_history = chat_messages[:-1]
        return user_question, chat_history

    def _get_source_documents(self, response: StreamingResponse) -> List[dict]:
        source_nodes_ids = [s_n.node_id for s_n in response.source_nodes]
        stmt = select(
            Document.id,
            Document.name,
            Document.source_uri,
        ).where(
            Document.id.in_(
                select(
                    Chunk.document_id,
                ).where(
                    Chunk.id.in_(source_nodes_ids),
                )
            ),
        )
        source_documents = [
            {
                "id": doc_id,
                "name": doc_name,
                "source_uri": source_uri,
            }
            for doc_id, doc_name, source_uri in self.session.exec(stmt).all()
        ]
        return source_documents
