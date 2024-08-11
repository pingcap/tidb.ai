import os

import dspy

from llama_index.core.base.llms.base import BaseLLM
from llama_index.llms.openai import OpenAI
from llama_index.llms.openai_like import OpenAILike
from llama_index.llms.gemini import Gemini
from llama_index.llms.bedrock import Bedrock
from app.rag.llms.anthropic_vertex import AnthropicVertex


def get_dspy_lm_by_llama_llm(llama_llm: BaseLLM) -> dspy.LM:
    """
    Get the dspy LM by the llama LLM.

    In this project, we use both llama-index and dspy, both of them have their own LLM implementation.
    This function can help us reduce the complexity of the code by converting the llama LLM to the dspy LLM.
    """
    if isinstance(llama_llm, OpenAI):
        return dspy.OpenAI(
            model=llama_llm.model,
            max_tokens=llama_llm.max_tokens or 4096,
            api_key=llama_llm.api_key,
            api_base=enforce_trailing_slash(llama_llm.api_base),
        )
    elif isinstance(llama_llm, OpenAILike):
        return dspy.OpenAI(
            model=llama_llm.model,
            max_tokens=llama_llm.max_tokens or 4096,
            api_key=llama_llm.api_key,
            api_base=enforce_trailing_slash(llama_llm.api_base),
            model_type="chat" if llama_llm.is_chat_model else "text",
        )
    elif isinstance(llama_llm, Gemini):
        # Don't need to configure the api_key again,
        # it has already been configured to `genai` by the llama_llm.
        return dspy.Google(
            model=llama_llm.model.split("models/")[1],
            max_output_tokens=llama_llm.max_tokens or 8192,
        )
    elif isinstance(llama_llm, Bedrock):
        # Notice: dspy.Bedrock currently does not support configuring access keys through parameters.
        # Using environment variables for configuration risks contaminating global variables.
        os.environ["AWS_ACCESS_KEY_ID"] = llama_llm.aws_access_key_id
        os.environ["AWS_SECRET_ACCESS_KEY"] = llama_llm.aws_secret_access_key
        bedrock = dspy.Bedrock(region_name=llama_llm.region_name)
        if llama_llm.model.startswith("anthropic"):
            return dspy.AWSAnthropic(
                bedrock, model=llama_llm.model, max_new_tokens=llama_llm.max_tokens
            )
        elif llama_llm.model.startswith("meta"):
            return dspy.AWSMeta(
                bedrock, model=llama_llm.model, max_new_tokens=llama_llm.max_tokens
            )
        elif llama_llm.model.startswith("mistral"):
            return dspy.AWSMistral(
                bedrock, model=llama_llm.model, max_new_tokens=llama_llm.max_tokens
            )
        elif llama_llm.model.startswith("amazon"):
            return dspy.AWSModel(
                bedrock, model=llama_llm.model, max_new_tokens=llama_llm.max_tokens
            )
        else:
            raise ValueError(
                "Bedrock model " + llama_llm.model + " is not supported by dspy."
            )
    elif isinstance(llama_llm, AnthropicVertex):
        raise ValueError("AnthropicVertex is not supported by dspy.")
    else:
        raise ValueError(f"Got unknown LLM provider: {llama_llm.__class__.__name__}")


def enforce_trailing_slash(url: str):
    if url.endswith("/"):
        return url
    return url + "/"
