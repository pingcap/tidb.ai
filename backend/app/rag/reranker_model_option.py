from typing import List
from pydantic import BaseModel

from app.types import RerankerProvider


class RerankerModelOption(BaseModel):
    provider: RerankerProvider
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
        default_reranker_model="rerank-multilingual-v3.0",
        reranker_model_description="Reference: https://docs.cohere.com/reference/rerank",
        default_top_n=10,
        credentials_display_name="Cohere API Key",
        credentials_description="You can get one from https://dashboard.cohere.com/api-keys",
        credentials_type="str",
        default_credentials="*****",
    ),
]
