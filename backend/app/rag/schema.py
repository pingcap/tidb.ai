import enum

from pydantic import BaseModel


class LLMProvider(str, enum.Enum):
    openai = "openai"
    google = "google"


class OpenAIModel(str, enum.Enum):
    gpt_35_turbo = "gpt-3.5-turbo"
    gpt_4o = "gpt-4o"


class GoogleModel(str, enum.Enum):
    gemini_15_flash = "gemini-1.5-flash"
    gemini_15_pro = "gemini-1.5-pro"


class EmbeddingProvider(str, enum.Enum):
    openai = "openai"


class OpenAIEmbeddingModel(str, enum.Enum):
    text_embedding_3_small = "text-embedding-3-small"


class RerankerProvider(str, enum.Enum):
    jinaai = "jinaai"


class JinaRerankerModel(str, enum.Enum):
    jinaai_reranker = "jinaai-reranker"


class LLMOption(BaseModel):
    provider: LLMProvider = LLMProvider.openai
    openai_model: OpenAIModel = OpenAIModel.gpt_35_turbo
    google_model: GoogleModel = GoogleModel.gemini_15_flash

    embedding_provider: EmbeddingProvider = EmbeddingProvider.openai
    openai_embedding_model: OpenAIEmbeddingModel = (
        OpenAIEmbeddingModel.text_embedding_3_small
    )

    reranker_provider: RerankerProvider = RerankerProvider.jinaai
    jina_reranker_model: JinaRerankerModel = JinaRerankerModel.jinaai_reranker


class PromptOption(BaseModel):
    qa_prompt: str = ""
    refine_prompt: str = ""


class KnowledgeGraphOption(BaseModel):
    enabled: bool = False
    depth: int = 2
    include_meta: bool = False
    with_degree: bool = False


class ChatEngineOptions(BaseModel):
    llm: LLMOption = LLMOption()
    prompt: PromptOption = PromptOption()
    knowledge_graph: KnowledgeGraphOption = KnowledgeGraphOption()
