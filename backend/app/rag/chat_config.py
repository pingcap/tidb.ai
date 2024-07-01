import dspy

from pydantic import BaseModel
from llama_index.llms.openai import OpenAI
from llama_index.llms.gemini import Gemini
from llama_index.core.llms.llm import LLM
from llama_index.core.base.embeddings.base import BaseEmbedding
from llama_index.core.postprocessor.types import BaseNodePostprocessor
from llama_index.embeddings.openai import OpenAIEmbedding, OpenAIEmbeddingModelType
from llama_index.postprocessor.jinaai_rerank import JinaRerank
from sqlmodel import Session

from app.rag.types import (
    LLMProvider,
    OpenAIModel,
    GeminiModel,
    RerankerProvider,
)
from app.rag.default_prompt import (
    DEFAULT_CONDENSE_QUESTION_PROMPT,
    DEFAULT_TEXT_QA_PROMPT,
    DEFAULT_REFINE_PROMPT,
)
from app.repositories import chat_engine_repo
from app.utils.dspy import get_dspy_lm_by_llama_llm


class LLMOption(BaseModel):
    provider: LLMProvider = LLMProvider.OPENAI
    openai_chat_model: OpenAIModel = OpenAIModel.GPT_35_TURBO
    gemini_chat_model: GeminiModel = GeminiModel.GEMINI_15_FLASH

    reranker_provider: RerankerProvider = RerankerProvider.JINAAI
    reranker_top_k: int = 10

    condense_question_prompt: str = DEFAULT_CONDENSE_QUESTION_PROMPT
    text_qa_prompt: str = DEFAULT_TEXT_QA_PROMPT
    refine_prompt: str = DEFAULT_REFINE_PROMPT


class KnowledgeGraphOption(BaseModel):
    enabled: bool = False
    depth: int = 2
    include_meta: bool = False
    with_degree: bool = False


class ChatEngineConfig(BaseModel):
    llm: LLMOption = LLMOption()
    knowledge_graph: KnowledgeGraphOption = KnowledgeGraphOption()

    @classmethod
    def load_from_db(cls, session: Session, engine_name: str) -> "ChatEngineConfig":
        if not engine_name or engine_name == "default":
            db_chat_engine = chat_engine_repo.get_default_engine(session)
        else:
            db_chat_engine = chat_engine_repo.get_engine_by_name(session, engine_name)

        if not db_chat_engine:
            return cls()

        return cls.model_validate(db_chat_engine.engine_options)

    def get_llama_llm(self) -> LLM:
        if self.llm.provider == LLMProvider.OPENAI:
            return OpenAI(model=self.llm.openai_chat_model.value)
        elif self.llm.provider == LLMProvider.GEMINI:
            return Gemini(model=self.llm.gemini_chat_model.value)
        else:
            raise ValueError(f"Got unknown LLM provider: {self.llm.provider}")

    def get_dspy_lm(self) -> dspy.LM:
        llama_llm = self.get_llama_llm()
        return get_dspy_lm_by_llama_llm(llama_llm)

    def get_embedding_model(self) -> BaseEmbedding:
        # The embedding model should remain the same for both building and chatting,
        # currently we do not support dynamic configuration of embedding model
        return OpenAIEmbedding(model=OpenAIEmbeddingModelType.TEXT_EMBED_3_SMALL)

    def get_reranker(self) -> BaseNodePostprocessor:
        if self.llm.reranker_provider == RerankerProvider.JINAAI:
            return JinaRerank(
                model="jina-reranker-v2-base-multilingual",
                top_n=self.llm.reranker_top_k,
            )
        else:
            raise ValueError(
                f"Got unknown reranker provider: {self.llm.reranker_provider}"
            )
