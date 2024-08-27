from typing import List
from pydantic import BaseModel

from app.types import EmbeddingProvider
from app.core.config import settings


class EmbeddingModelOption(BaseModel):
    provider: EmbeddingProvider
    provider_display_name: str | None = None
    provider_description: str | None = None
    provider_url: str | None = None
    default_embedding_model: str
    embedding_model_description: str
    default_credentials: str | dict = ""
    credentials_display_name: str
    credentials_description: str
    credentials_type: str = "str"


admin_embed_model_options: List[EmbeddingModelOption] = [
    EmbeddingModelOption(
        provider=EmbeddingProvider.OPENAI,
        provider_display_name="OpenAI",
        provider_description="The OpenAI API provides a simple interface for developers to create an intelligence layer in their applications, powered by OpenAI's state of the art models.",
        provider_url="https://platform.openai.com",
        default_embedding_model="text-embedding-3-small",
        embedding_model_description=f"Please select a text embedding model with {settings.EMBEDDING_DIMS} dimensions.",
        credentials_display_name="OpenAI API Key",
        credentials_description="The API key of OpenAI, you can find it in https://platform.openai.com/api-keys",
        credentials_type="str",
        default_credentials="sk-****",
    ),
    EmbeddingModelOption(
        provider=EmbeddingProvider.JINA,
        provider_display_name="Jina",
        provider_description="Jina AI provides multimodal, bilingual long-context embeddings for search and RAG",
        provider_url="https://jina.ai/embeddings/",
        default_embedding_model="jina-embeddings-v2-base-en",
        embedding_model_description=f"Find more information about Jina AI Embeddings at https://jina.ai/embeddings/, we need a model with {settings.EMBEDDING_DIMS} dimensions.",
        credentials_display_name="Jina API Key",
        credentials_description="The API key of Jina, you can find it in https://jina.ai/embeddings/",
        credentials_type="str",
        default_credentials="jina_****",
    ),
    EmbeddingModelOption(
        provider=EmbeddingProvider.COHERE,
        provider_display_name="Cohere",
        provider_description="Cohere provides industry-leading large language models (LLMs) and RAG capabilities tailored to meet the needs of enterprise use cases that solve real-world problems.",
        provider_url="https://cohere.com/embeddings",
        default_embedding_model="embed-multilingual-v3.0",
        embedding_model_description=f"Documentation: https://docs.cohere.com/docs/cohere-embed, we need a model with {settings.EMBEDDING_DIMS} dimensions.",
        credentials_display_name="Cohere API Key",
        credentials_description="You can get one from https://dashboard.cohere.com/api-keys",
        credentials_type="str",
        default_credentials="*****",
    ),
    EmbeddingModelOption(
        provider=EmbeddingProvider.OLLAMA,
        provider_display_name="Ollama",
        provider_description="Ollama is a lightweight framework for building and running large language models and embed models.",
        provider_url="https://ollama.com",
        default_embedding_model="nomic-embed-text",
        embedding_model_description=f"https://ollama.com/blog/embedding-models, we need a model with {settings.EMBEDDING_DIMS} dimensions.",
        credentials_display_name="Ollama API Key",
        credentials_description="Ollama doesn't require an API key, set a dummy string here is ok",
        credentials_type="str",
        default_credentials="dummy",
    ),
]
