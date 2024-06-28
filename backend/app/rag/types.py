import enum
from typing import Any
from pydantic import BaseModel


class LLMProvider(str, enum.Enum):
    OPENAI = "openai"
    GEMINI = "gemini"


class OpenAIModel(str, enum.Enum):
    GPT_35_TURBO = "gpt-3.5-turbo"
    GPT_4O = "gpt-4o"


class GeminiModel(str, enum.Enum):
    GEMINI_15_FLASH = "gemini-1.5-flash"
    GEMINI_15_PRO = "gemini-1.5-pro"


class EmbeddingProvider(str, enum.Enum):
    OPENAI = "openai"


class OpenAIEmbeddingModel(str, enum.Enum):
    TEXT_EMBEDDING_3_SMALL = "text-embedding-3-small"


class RerankerProvider(str, enum.Enum):
    JINAAI = "jinaai"


class MessageRole(str, enum.Enum):
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"


# Cannot reuse the llama-index's ChatMessage
# because it use pydantic v1 and this project use pydantic v2.
# https://github.com/run-llama/llama_index/issues/13477
class ChatMessage(BaseModel):
    role: MessageRole = MessageRole.USER
    content: str = ""
    additional_kwargs: dict[str, Any] = {}
