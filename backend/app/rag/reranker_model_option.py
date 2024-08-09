from typing import List
from pydantic import BaseModel

from app.types import RerankerProvider


class RerankerModelOption(BaseModel):
    provider: RerankerProvider
    provider_display_name: str | None = None
    provider_description: str | None = None
    provider_url: str | None = None
    default_reranker_model: str
    reranker_model_description: str
    default_top_n: int = 10
    default_credentials: str | dict = ""
    credentials_display_name: str
    credentials_description: str
    credentials_type: str = "str"


admin_reranker_model_options: List[RerankerModelOption] = [
    RerankerModelOption(
        provider=RerankerProvider.JINA,
        provider_display_name="Jina AI",
        provider_description="We provide best-in-class embeddings, rerankers, LLM-reader and prompt optimizers, pioneering search AI for multimodal data.",
        provider_url="https://jina.ai",
        default_reranker_model="jina-reranker-v2-base-multilingual",
        reranker_model_description="Reference: https://jina.ai/reranker/",
        default_top_n=10,
        credentials_display_name="Jina API Key",
        credentials_description="You can get one from https://jina.ai/reranker/",
        credentials_type="str",
        default_credentials="jina_****",
    ),
    RerankerModelOption(
        provider=RerankerProvider.COHERE,
        provider_display_name="Cohere",
        provider_description="Cohere provides industry-leading large language models (LLMs) and RAG capabilities tailored to meet the needs of enterprise use cases that solve real-world problems.",
        provider_url="https://cohere.com/",
        default_reranker_model="rerank-multilingual-v3.0",
        reranker_model_description="Reference: https://docs.cohere.com/reference/rerank",
        default_top_n=10,
        credentials_display_name="Cohere API Key",
        credentials_description="You can get one from https://dashboard.cohere.com/api-keys",
        credentials_type="str",
        default_credentials="*****",
    ),
]
