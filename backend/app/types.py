import enum


class LLMProvider(str, enum.Enum):
    OPENAI = "openai"
    GEMINI = "gemini"
    ANTHROPIC_VERTEX = "anthropic_vertex"


class EmbeddingProvider(str, enum.Enum):
    OPENAI = "openai"
