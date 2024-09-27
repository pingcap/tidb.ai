import logging
from typing import Optional, Sequence
from llama_index.llms.openai import OpenAI
from llama_index.core.tools.types import BaseTool

logger = logging.getLogger(__name__)


class QueryRouter:
    def __init__(self, llm: OpenAI, system_prompt: Optional[str] = None):
        if system_prompt is None:
            system_prompt = (
                "You are a highly skilled customer assistant responsible for routing user queries to the appropriate tools. "
                "Your primary role is to ensure that each query is handled by the most suitable tool or resource to provide an accurate and efficient solution.\n"
                "Based on the conversation context, your task is to extract the user's query and transform it into a standalone, well-defined question. "
                "This query should be clear, independent, and specific enough to be processed by external tools without additional context, enabling the tools to directly resolve the user's issue. "
                "If necessary, you may rephrase or clarify the query to ensure it's structured in a way that maximizes the chances of a successful resolution.\n"
            )

        self._llm = llm
        self._llm.system_prompt = system_prompt

    def route(self, query: str, tools: Sequence["BaseTool"]) -> str:
        response = self._llm.chat_with_tools(tools, query)

        try:
            tool_calls = self._llm.get_tool_calls_from_response(
                response, error_on_no_tool_call=True
            )
        except Exception as e:
            logger.exception(e)
            return f"An error occurred while processing the query: {query}"

        return tool_calls[0]
