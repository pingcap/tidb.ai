import asyncio
import logging
from typing import Any, Optional, Sequence, Union, cast

from llama_index.core import ServiceContext
from llama_index.core.bridge.pydantic import BaseModel, Field
from llama_index.core.evaluation.base import BaseEvaluator, EvaluationResult
from llama_index.core.llms.llm import LLM
from llama_index.core.output_parsers import PydanticOutputParser
from llama_index.core.prompts import BasePromptTemplate, PromptTemplate
from llama_index.core.prompts.mixin import PromptDictType
from llama_index.core.settings import Settings, llm_from_settings_or_context

logger = logging.getLogger(__name__)


DEFAULT_EVAL_TEMPLATE = PromptTemplate(
    "Are the query and response language the same?\n"
    "[Query]: {query}\n"
    "[Response]: {response}\n"
    "Yes or No?"
)


class EvaluationData(BaseModel):
    passing: bool = Field(
        description="Whether the query and response language are the same."
    )


class LanguageEvaluator(BaseEvaluator):
    """Language evaluator.

    Evaluates whether query and response language are the same.

    This evaluator only considers the query string and the response string.

    Args:
        service_context(Optional[ServiceContext]):
            The service context to use for evaluation.
        guidelines(Optional[str]): User-added guidelines to use for evaluation.
            Defaults to None, which uses the default guidelines.
        eval_template(Optional[Union[str, BasePromptTemplate]] ):
            The template to use for evaluation.
    """

    def __init__(
        self,
        llm: Optional[LLM] = None,
        eval_template: Optional[Union[str, BasePromptTemplate]] = None,
        output_parser: Optional[PydanticOutputParser] = None,
        # deprecated
        service_context: Optional[ServiceContext] = None,
    ) -> None:
        self._llm = llm or llm_from_settings_or_context(Settings, service_context)

        self._eval_template: BasePromptTemplate
        if isinstance(eval_template, str):
            self._eval_template = PromptTemplate(eval_template)
        else:
            self._eval_template = eval_template or DEFAULT_EVAL_TEMPLATE

        self._output_parser = output_parser or PydanticOutputParser(
            output_cls=EvaluationData
        )
        self._eval_template.output_parser = self._output_parser

    def _get_prompts(self) -> PromptDictType:
        """Get prompts."""
        return {
            "eval_template": self._eval_template,
        }

    def _update_prompts(self, prompts: PromptDictType) -> None:
        """Update prompts."""
        if "eval_template" in prompts:
            self._eval_template = prompts["eval_template"]

    async def aevaluate(
        self,
        query: Optional[str] = None,
        response: Optional[str] = None,
        contexts: Optional[Sequence[str]] = None,
        sleep_time_in_seconds: int = 0,
        **kwargs: Any,
    ) -> EvaluationResult:
        """Evaluate whether the query and response pair passes the guidelines."""
        del contexts  # Unused
        del kwargs  # Unused
        if query is None or response is None:
            raise ValueError("query and response must be provided")

        logger.debug("prompt: %s", self._eval_template)
        logger.debug("query: %s", query)
        logger.debug("response: %s", response)

        await asyncio.sleep(sleep_time_in_seconds)

        eval_response = await self._llm.apredict(
            self._eval_template,
            query=query,
            response=response,
        )
        eval_data = self._output_parser.parse(eval_response)
        eval_data = cast(EvaluationData, eval_data)

        return EvaluationResult(
            query=query,
            response=response,
            passing=eval_data.passing,
            score=1.0 if eval_data.passing else 0.0,
            feedback="",
        )
