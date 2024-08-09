from typing import List
from pydantic import BaseModel

from app.types import LLMProvider


class LLMOption(BaseModel):
    provider: LLMProvider
    provider_display_name: str | None = None
    provider_description: str | None = None
    provider_url: str | None = None
    default_llm_model: str
    llm_model_description: str
    default_credentials: str | dict = ""
    credentials_display_name: str
    credentials_description: str
    credentials_type: str = "str"


admin_llm_options: List[LLMOption] = [
    LLMOption(
        provider=LLMProvider.OPENAI,
        provider_display_name="OpenAI",
        provider_description="The OpenAI API provides a simple interface for developers to create an intelligence layer in their applications, powered by OpenAI's state of the art models.",
        provider_url="https://platform.openai.com",
        default_llm_model="gpt-4o",
        llm_model_description="",
        credentials_display_name="OpenAI API Key",
        credentials_description="The API key of OpenAI, you can find it in https://platform.openai.com/api-keys",
        credentials_type="str",
        default_credentials="sk-****",
    ),
    LLMOption(
        provider=LLMProvider.OPENAI_LIKE,
        provider_display_name="OpenAI Like",
        default_llm_model="gpt-4o",
        llm_model_description="",
        credentials_display_name="API Key",
        credentials_description="The API key of the third-party OpenAI-like service, such as OpenRouter, you can find it in their official website",
        credentials_type="str",
        default_credentials="sk-****",
    ),
    LLMOption(
        provider=LLMProvider.GEMINI,
        provider_display_name="Gemini",
        provider_description="The Gemini API and Google AI Studio help you start working with Google's latest models. Access the whole Gemini model family and turn your ideas into real applications that scale.",
        provider_url="https://ai.google.dev/gemini-api",
        default_llm_model="models/gemini-1.5-flash",
        llm_model_description="Find the model code at https://ai.google.dev/gemini-api/docs/models/gemini",
        credentials_display_name="Google API Key",
        credentials_description="The API key of Google AI Studio, you can find it in https://aistudio.google.com/app/apikey",
        credentials_type="str",
        default_credentials="AIza****",
    ),
    LLMOption(
        provider=LLMProvider.ANTHROPIC_VERTEX,
        provider_display_name="Anthropic Vertex AI",
        provider_description = "Anthropic’s Claude models are now generally available through Vertex AI.",
        provider_url = "https://docs.anthropic.com/en/api/claude-on-vertex-ai",
        default_llm_model="claude-3-5-sonnet@20240620",
        llm_model_description="",
        credentials_display_name="Google Credentials JSON",
        credentials_description="The JSON Object of Google Credentials, refer to https://cloud.google.com/docs/authentication/provide-credentials-adc#on-prem",
        credentials_type="dict",
        default_credentials={
            "type": "service_account",
            "project_id": "****",
            "private_key_id": "****",
        },
    ),
    LLMOption(
        provider=LLMProvider.BEDROCK,
        default_llm_model="anthropic.claude-3-5-sonnet-20240620-v1:0",
        llm_model_description="",
        credentials_display_name="AWS Bedrock Credentials JSON",
        credentials_description="The JSON Object of AWS Credentials, refer to https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-global",
        credentials_type="dict",
        default_credentials={
            "aws_access_key_id": "****",
            "aws_secret_access_key": "****",
            "aws_region_name": "us-west-2"
        },
    ),
]
