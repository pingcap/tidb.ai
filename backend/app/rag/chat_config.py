import os
import logging
from typing import Optional

import dspy
from pydantic import BaseModel
from llama_index.llms.openai import OpenAI
from llama_index.llms.gemini import Gemini
from llama_index.core.llms.llm import LLM
from llama_index.core.base.embeddings.base import BaseEmbedding
from llama_index.core.postprocessor.types import BaseNodePostprocessor
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.postprocessor.jinaai_rerank import JinaRerank
from sqlmodel import Session, select
from google.oauth2 import service_account
from google.auth.transport.requests import Request

from app.types import LLMProvider, EmbeddingProvider
from app.rag.default_prompt import (
    DEFAULT_INTENT_GRAPH_KNOWLEDGE,
    DEFAULT_NORMAL_GRAPH_KNOWLEDGE,
    DEFAULT_CONDENSE_QUESTION_PROMPT,
    DEFAULT_TEXT_QA_PROMPT,
    DEFAULT_REFINE_PROMPT,
)
from app.models import (
    ChatEngine,
    LLM as DBLLM,
    EmbeddingModel as DBEmbeddingModel,
)
from app.repositories import chat_engine_repo
from app.rag.llms.anthropic_vertex import AnthropicVertex
from app.utils.dspy import get_dspy_lm_by_llama_llm

logger = logging.getLogger(__name__)


class LLMOption(BaseModel):
    intent_graph_knowledge: str = DEFAULT_INTENT_GRAPH_KNOWLEDGE
    normal_graph_knowledge: str = DEFAULT_NORMAL_GRAPH_KNOWLEDGE
    condense_question_prompt: str = DEFAULT_CONDENSE_QUESTION_PROMPT
    text_qa_prompt: str = DEFAULT_TEXT_QA_PROMPT
    refine_prompt: str = DEFAULT_REFINE_PROMPT


class KnowledgeGraphOption(BaseModel):
    enabled: bool = True
    depth: int = 2
    include_meta: bool = True
    with_degree: bool = False
    using_intent_search: bool = True


class ChatEngineConfig(BaseModel):
    llm: LLMOption = LLMOption()
    knowledge_graph: KnowledgeGraphOption = KnowledgeGraphOption()

    __db_chat_engine: Optional[ChatEngine] = None
    __db_llm: Optional[DBLLM] = None
    __db_fast_llm: Optional[DBLLM] = None

    def set_db_chat_engine(self, db_chat_engine: ChatEngine):
        self.__db_chat_engine = db_chat_engine
        self.__db_llm = db_chat_engine.llm
        self.__db_fast_llm = db_chat_engine.fast_llm

    def get_db_chat_engine(self) -> Optional[ChatEngine]:
        return self.__db_chat_engine

    @classmethod
    def load_from_db(cls, session: Session, engine_name: str) -> "ChatEngineConfig":
        if not engine_name or engine_name == "default":
            db_chat_engine = chat_engine_repo.get_default_engine(session)
        else:
            db_chat_engine = chat_engine_repo.get_engine_by_name(session, engine_name)

        if not db_chat_engine:
            logger.warning(
                f"Chat engine {engine_name} not found in DB, using default engine"
            )
            return cls()

        obj = cls.model_validate(db_chat_engine.engine_options)
        obj.set_db_chat_engine(db_chat_engine)
        return obj

    def get_llama_llm(self, session: Session) -> LLM:
        if not self.__db_llm:
            return get_default_llm(session)
        return get_llm(
            self.__db_llm.provider,
            self.__db_llm.model,
            self.__db_llm.config,
            self.__db_llm.credentials,
        )

    def get_dspy_lm(self, session: Session) -> dspy.LM:
        llama_llm = self.get_llama_llm(session)
        return get_dspy_lm_by_llama_llm(llama_llm)

    def get_fast_llama_llm(self, session: Session) -> LLM:
        if not self.__db_fast_llm:
            return get_default_llm(session)
        return get_llm(
            self.__db_fast_llm.provider,
            self.__db_fast_llm.model,
            self.__db_fast_llm.config,
            self.__db_fast_llm.credentials,
        )

    def get_fast_dspy_lm(self, session: Session) -> dspy.LM:
        llama_llm = self.get_fast_llama_llm(session)
        return get_dspy_lm_by_llama_llm(llama_llm)

    def get_reranker(self, session: Session) -> BaseNodePostprocessor:
        return get_default_reranker(session)

    def screenshot(self) -> dict:
        return self.model_dump_json(
            exclude={
                "llm": [
                    "condense_question_prompt",
                    "text_qa_prompt",
                    "refine_prompt",
                ]
            }
        )


def get_llm(
    provider: LLMProvider,
    model: str,
    config: dict,
    credentials: str | list | dict | None,
) -> LLM:
    match provider:
        case LLMProvider.OPENAI:
            return OpenAI(model=model, api_key=credentials, **config)
        case LLMProvider.GEMINI:
            os.environ["GOOGLE_API_KEY"] = credentials
            return Gemini(model=model, api_key=credentials, **config)
        case LLMProvider.ANTHROPIC_VERTEX:
            google_creds: service_account.Credentials = (
                service_account.Credentials.from_service_account_info(
                    credentials,
                    scopes=["https://www.googleapis.com/auth/cloud-platform"],
                )
            )
            google_creds.refresh(request=Request())
            if "max_tokens" not in config:
                config.update(max_tokens=4096)
            return AnthropicVertex(model=model, credentials=google_creds, **config)
        case _:
            raise ValueError(f"Got unknown LLM provider: {provider}")


def get_default_llm(session: Session) -> LLM:
    db_llm = session.exec(select(DBLLM)).first()
    if not db_llm:
        raise ValueError("No default LLM found in DB")
    return get_llm(
        db_llm.provider,
        db_llm.model,
        db_llm.config,
        db_llm.credentials,
    )


def get_embedding_model(
    provider: EmbeddingProvider,
    model: str,
    config: dict,
    credentials: str | list | dict | None,
) -> BaseEmbedding:
    match provider:
        case EmbeddingProvider.OPENAI:
            return OpenAIEmbedding(model=model, api_key=credentials, **config)
        case _:
            raise ValueError(f"Got unknown embedding provider: {provider}")


def get_default_embedding_model(session: Session) -> BaseEmbedding:
    db_embedding_model = session.exec(select(DBEmbeddingModel)).first()
    if not db_embedding_model:
        raise ValueError("No default embedding model found in DB")
    return get_embedding_model(
        db_embedding_model.provider,
        db_embedding_model.model,
        db_embedding_model.config,
        db_embedding_model.credentials,
    )


def get_default_reranker(session: Session) -> BaseNodePostprocessor:
    return JinaRerank(
        model="jina-reranker-v2-base-multilingual",
        top_n=10,
    )
