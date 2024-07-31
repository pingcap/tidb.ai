from typing import List
from pydantic import BaseModel

from app.types import EmbeddingProvider
from app.core.config import settings


class EmbeddingModelOption(BaseModel):
    provider: EmbeddingProvider
    default_embedding_model: str
    embedding_model_description: str
    default_credentials: str | dict = ""
    credentials_display_name: str
    credentials_description: str
    credentials_type: str = "str"


admin_embed_model_options: List[EmbeddingModelOption] = [
    EmbeddingModelOption(
        provider=EmbeddingProvider.OPENAI,
        default_embedding_model="text-embedding-3-small",
        embedding_model_description=f"Currently, we only support the OpenAI text embedding model with {settings.EMBEDDOMG_DIMS} dimensions.",
        credentials_display_name="OpenAI API Key",
        credentials_description="The API key of OpenAI, you can find it in https://platform.openai.com/api-keys",
        credentials_type="str",
        default_credentials="sk-****",
    ),
]
