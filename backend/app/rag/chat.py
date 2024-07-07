import json
import logging
from uuid import UUID
from typing import List, Generator, Optional, Tuple
from dataclasses import dataclass
from datetime import datetime, UTC

import jinja2
from sqlmodel import Session, select
from llama_index.core import VectorStoreIndex, Settings
from llama_index.core.base.llms.base import ChatMessage
from llama_index.core.prompts.base import PromptTemplate
from llama_index.core.base.response.schema import StreamingResponse
from llama_index.core.callbacks.schema import EventPayload
from llama_index.core.callbacks import CallbackManager
from langfuse import Langfuse
from langfuse.llama_index import LlamaIndexCallbackHandler

from app.models import (
    User,
    Document,
    Chunk,
    Chat as DBChat,
    ChatMessage as DBChatMessage,
)
from app.core.config import settings
from app.rag.vector_store.tidb_vector_store import TiDBVectorStore
from app.rag.knowledge_graph.graph_store import TiDBGraphStore
from app.rag.knowledge_graph import KnowledgeGraphIndex
from app.rag.chat_config import ChatEngineConfig
from app.rag.types import (
    MyCBEventType,
    ChatMessageSate,
    ChatEventType,
    MessageRole,
)
from app.repositories import chat_repo

logger = logging.getLogger(__name__)


@dataclass
class ChatStreamMessagePayload:
    chat_id: Optional[UUID] = None
    message_id: Optional[int] = None
    state: ChatMessageSate = ChatMessageSate.TRACE
    display: str = ""
    context: dict | list | str = ""


@dataclass
class ChatEvent:
    event_type: ChatEventType = ChatEventType.MESSAGE_PART
    payload: ChatStreamMessagePayload | str | None = None

    def encode(self, charset) -> bytes:
        # fastapi will use this method in streaming response
        if self.event_type in (ChatEventType.TEXT_PART, ChatEventType.ERROR_PART):
            body = self.payload
        else:
            body = {
                "chat_id": str(self.payload.chat_id),
                "message_id": self.payload.message_id,
                "state": self.payload.state.name,
            }
            if self.payload.display:
                body["display"] = self.payload.display
            if self.payload.context:
                body["context"] = self.payload.context
            body = [body]

        body = json.dumps(body, separators=(",", ":"))
        return f"{self.event_type.value}: {body}\n".encode(charset)


class ChatService:
    def __init__(
        self,
        db_session: Session,
        user: User,
        engine_name: str = "default",
    ) -> None:
        self.db_session = db_session
        self.user = user
        self.engine_name = engine_name

        self.chat_engine_config = ChatEngineConfig.load_from_db(db_session, engine_name)
        self.db_chat_engine = self.chat_engine_config.get_db_chat_engine()
        self._llm = self.chat_engine_config.get_llama_llm()
        self._dspy_lm = self.chat_engine_config.get_dspy_lm()
        self._embed_model = self.chat_engine_config.get_embedding_model()
        self._reranker = self.chat_engine_config.get_reranker()

    def chat(
        self, chat_messages: List[ChatMessage], chat_id: Optional[UUID] = None
    ) -> Generator[ChatEvent, None, None]:
        user_question, chat_history = self._parse_chat_messages(chat_messages)

        if chat_id:
            # FIXME:
            #   only chat owner or superuser can access the chat,
            #   anonymous user can only access anonymous chat by track_id
            self.db_chat_obj = chat_repo.get(self.db_session, chat_id)
            if not self.db_chat_obj:
                yield ChatEvent(
                    event_type=ChatEventType.ERROR_PART,
                    payload="Chat not found",
                )
                return
            chat_history = [
                ChatMessage(role=m.role, content=m.content, additional_kwargs={})
                for m in chat_repo.get_messages(self.db_session, self.db_chat_obj)
            ]
        else:
            self.db_chat_obj = chat_repo.create(
                self.db_session,
                DBChat(
                    title=user_question[:100],
                    engine_id=self.db_chat_engine.id,
                    engine_options=self.chat_engine_config.screenshot(),
                    user_id=self.user.id if self.user else None,
                ),
            )
            chat_id = self.db_chat_obj.id
            # slack/discord may create a new chat with history messages
            for i, m in enumerate(chat_history):
                chat_repo.create_message(
                    session=self.db_session,
                    chat=self.db_chat_obj,
                    chat_message=DBChatMessage(
                        role=m.role,
                        content=m.content,
                        ordinal=i + 1,
                    ),
                )

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
        trace_url = observation.get_trace_url()

        chat_repo.create_message(
            session=self.db_session,
            chat=self.db_chat_obj,
            chat_message=DBChatMessage(
                role=MessageRole.USER.value,
                content=user_question,
            ),
        )
        db_assistant_message = chat_repo.create_message(
            session=self.db_session,
            chat=self.db_chat_obj,
            chat_message=DBChatMessage(
                role=MessageRole.ASSISTANT.value,
                trace_url=trace_url,
                content="",
            ),
        )

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

        # Frontend requires the empty event to start the chat
        yield ChatEvent(
            event_type=ChatEventType.TEXT_PART,
            payload="",
        )
        yield ChatEvent(
            event_type=ChatEventType.MESSAGE_PART,
            payload=ChatStreamMessagePayload(
                chat_id=chat_id,
                message_id=db_assistant_message.id,
                state=ChatMessageSate.TRACE,
                display="Start knowledge graph searching ...",
                context={"langfuse_url": trace_url},
            ),
        )

        # 1. Retrieve entities, relations, and chunks from the knowledge graph
        _set_langfuse_callback_manager()
        kg_config = self.chat_engine_config.knowledge_graph
        if kg_config.enabled:
            graph_store = TiDBGraphStore(
                dspy_lm=self._dspy_lm,
                session=self.db_session,
                embed_model=self._embed_model,
            )
            graph_index: KnowledgeGraphIndex = KnowledgeGraphIndex.from_existing(
                dspy_lm=self._dspy_lm,
                kg_store=graph_store,
                callback_manager=Settings.callback_manager,
            )

            if kg_config.using_intent_search:
                with Settings.callback_manager.as_trace("retrieve_with_weight"):
                    with Settings.callback_manager.event(
                        MyCBEventType.RETRIEVE_FROM_GRAPH,
                        payload={
                            EventPayload.QUERY_STR: {
                                "query": user_question,
                                "chat_history": chat_history,
                            }
                        },
                    ) as event:
                        result = graph_index.intent_based_search(
                            user_question, chat_history, include_meta=True
                        )
                        event.on_end(payload={"graph": result["queries"]})

                entities = result["graph"]["entities"]
                relations = result["graph"]["relationships"]

                graph_knowledges = get_prompt_by_jinja2_template(
                    self.chat_engine_config.llm.intent_graph_knowledge,
                    sub_queries=result["queries"],
                )
                graph_knowledges_context = graph_knowledges.template
            else:
                entities, relations, chunks = graph_index.retrieve_with_weight(
                    user_question,
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
        yield ChatEvent(
            event_type=ChatEventType.MESSAGE_PART,
            payload=ChatStreamMessagePayload(
                chat_id=chat_id,
                message_id=db_assistant_message.id,
                state=ChatMessageSate.REFINE_QUESTION,
                display="Refine the user question ...",
            ),
        )
        _set_langfuse_callback_manager()
        with Settings.callback_manager.as_trace("condense_question"):
            with Settings.callback_manager.event(
                MyCBEventType.CONDENSE_QUESTION,
                payload={EventPayload.QUERY_STR: user_question},
            ) as event:
                refined_question = self._llm.predict(
                    get_prompt_by_jinja2_template(
                        self.chat_engine_config.llm.condense_question_prompt,
                        graph_knowledges=graph_knowledges_context,
                        chat_history=chat_history,
                        question=user_question,
                    ),
                )
                event.on_end(payload={EventPayload.COMPLETION: refined_question})

        # 3. Retrieve the related chunks from the vector store
        # 4. Rerank after the retrieval
        # 5. Generate a response using the refined question and related chunks
        yield ChatEvent(
            event_type=ChatEventType.MESSAGE_PART,
            payload=ChatStreamMessagePayload(
                chat_id=chat_id,
                message_id=db_assistant_message.id,
                state=ChatMessageSate.SEARCH_RELATED_DOCUMENTS,
                display="Search related documents ...",
            ),
        )
        _set_langfuse_callback_manager()
        text_qa_template = get_prompt_by_jinja2_template(
            self.chat_engine_config.llm.text_qa_prompt,
            graph_knowledges=graph_knowledges_context,
        )
        refine_template = get_prompt_by_jinja2_template(
            self.chat_engine_config.llm.refine_prompt,
            graph_knowledges=graph_knowledges_context,
        )
        vector_store = TiDBVectorStore(session=self.db_session)
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
            similarity_top_k=100,
        )
        response: StreamingResponse = query_engine.query(refined_question)
        source_documents = self._get_source_documents(response)

        yield ChatEvent(
            event_type=ChatEventType.MESSAGE_PART,
            payload=ChatStreamMessagePayload(
                chat_id=chat_id,
                message_id=db_assistant_message.id,
                state=ChatMessageSate.SOURCE_NODES,
                context=source_documents,
            ),
        )

        response_text = ""
        for word in response.response_gen:
            response_text += word
            yield ChatEvent(
                event_type=ChatEventType.TEXT_PART,
                payload=word,
            )

        db_assistant_message.sources = source_documents
        db_assistant_message.content = response_text
        db_assistant_message.finished_at = datetime.now(UTC)
        self.db_session.add(db_assistant_message)
        self.db_session.commit()

        yield ChatEvent(
            event_type=ChatEventType.MESSAGE_PART,
            payload=ChatStreamMessagePayload(
                chat_id=chat_id,
                message_id=db_assistant_message.id,
                state=ChatMessageSate.FINISHED,
            ),
        )

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
            for doc_id, doc_name, source_uri in self.db_session.exec(stmt).all()
        ]
        return source_documents


def get_prompt_by_jinja2_template(template_string: str, **kwargs) -> PromptTemplate:
    # use jinja2's template because it support complex render logic
    # for example:
    #       {% for e in entities %}
    #           {{ e.name }}
    #       {% endfor %}
    template = (
        jinja2.Template(template_string)
        .render(**kwargs)
        # llama-index will use f-string to format the template
        # so we need to escape the curly braces even if we do not use it
        .replace("{", "{{")
        .replace("}", "}}")
        # This is a workaround to bypass above escape,
        # llama-index will use f-string to format following variables,
        # maybe we can use regex to replace the variable name to make this more robust
        .replace("<<query_str>>", "{query_str}")
        .replace("<<context_str>>", "{context_str}")
        .replace("<<existing_answer>>", "{existing_answer}")
        .replace("<<context_msg>>", "{context_msg}")
    )
    return PromptTemplate(template=template)


def user_can_view_chat(chat: DBChat, user: Optional[User]) -> bool:
    # Anonymous chat can be accessed by anyone
    # Chat with owner can only be accessed by owner or superuser
    if chat.user_id and not (user and (user.is_superuser or chat.user_id == user.id)):
        return False
    return True


def get_chat_message_subgraph(
    session: Session, chat_message: DBChatMessage
) -> Tuple[List, List]:
    if chat_message.role != MessageRole.USER:
        return [], []

    chat: DBChat = chat_message.chat
    chat_engine_config = ChatEngineConfig.model_validate(
        # FIXME: store engine_options as dict in the database
        json.loads(chat.engine_options)
    )
    kg_config = chat_engine_config.knowledge_graph
    graph_store = TiDBGraphStore(
        dspy_lm=chat_engine_config.get_dspy_lm(),
        session=session,
        embed_model=chat_engine_config.get_embedding_model(),
    )
    entities, relations, _ = graph_store.retrieve_with_weight(
        chat_message.content,
        [],
        depth=kg_config.depth,
        include_meta=kg_config.include_meta,
        with_degree=kg_config.with_degree,
        with_chunks=False,
    )
    return entities, relations
