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
        embedding_model_description=f"Currently, we only support the OpenAI text embedding model with {settings.EMBEDDOMG_DIMS} dimensions.",
        credentials_display_name="OpenAI API Key",
        credentials_description="The API key of OpenAI, you can find it in https://platform.openai.com/api-keys",
        credentials_type="str",
        default_credentials="sk-****",
    ),
]
