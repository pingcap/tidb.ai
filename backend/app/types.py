import enum


class LLMProvider(str, enum.Enum):
    OPENAI = "openai"
    GEMINI = "gemini"
    ANTHROPIC = "anthropic"
    OPENAI_LIKE = "openai_like"
    BEDROCK = "bedrock"
    OLLAMA = "ollama"
    AI302 = "302ai"


class EmbeddingProvider(str, enum.Enum):
    OPENAI = "openai"
    JINA = "jina"
    COHERE = "cohere"
    OLLAMA = "ollama"
    LOCAL = "local"
    OPENAI_LIKE = "openai_like"
    AI302 = "302ai"



class RerankerProvider(str, enum.Enum):
    JINA = "jina"
    COHERE = "cohere"
    BAISHENG = "baisheng"
    LOCAL = "local"
    AI302 = "302ai"


class MimeTypes(str, enum.Enum):
    PLAIN_TXT = "text/plain"
    MARKDOWN = "text/markdown"
    PDF = "application/pdf"
    DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
