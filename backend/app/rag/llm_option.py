from typing import List
from pydantic import BaseModel

from app.types import LLMProvider


class LLMOption(BaseModel):
    provider: LLMProvider
    default_model: str
    model_description: str
    credentials_display_name: str
    credentials_description: str
    credentials_type: str = "str"


admin_llm_options: List[LLMOption] = [
    LLMOption(
        provider=LLMProvider.OPENAI,
        default_model="gpt-4o",
        model_description="",
        credentials_display_name="OpenAI API Key",
        credentials_description="The API key of OpenAI, you can find it in https://platform.openai.com/api-keys",
        credentials_type="str",
    ),
    LLMOption(
        provider=LLMProvider.GEMINI,
        default_model="models/gemini-1.5-flash",
        model_description="Find the model code at https://ai.google.dev/gemini-api/docs/models/gemini",
        credentials_display_name="Google API Key",
        credentials_description="The API key of Google AI Studio, you can find it in https://aistudio.google.com/app/apikey",
        credentials_type="str",
    ),
    LLMOption(
        provider=LLMProvider.ANTHROPIC_VERTEX,
        default_model="claude-3-5-sonnet@20240620",
        model_description="",
        credentials_display_name="Google Credentials JSON",
        credentials_description="The JSON Object of Google Credentials, refer to https://cloud.google.com/docs/authentication/provide-credentials-adc#on-prem",
        credentials_type="dict",
    ),
]
