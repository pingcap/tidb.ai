import logging
import requests
import typing
import uuid
from tqdm import tqdm
from datetime import datetime
from langfuse import Langfuse
from tenacity import retry, stop_after_attempt, wait_fixed
from llama_index.core.evaluation import CorrectnessEvaluator
from llama_index.llms.gemini import Gemini
from llama_index.llms.openai import OpenAI

from app.core.config import settings
from app.evaluation.evaluators import LanguageEvaluator, ToxicityEvaluator

logger = logging.getLogger(__name__)


DEFAULT_TIDB_AI_CHAT_ENGINE = "default"


class Evaluation:
    """
    Evaluate a dataset using TiDB AI and Langfuse.

    Args:
        dataset_name: The name of the dataset in langfuse to evaluate.
        run_name: The name of the run to create. If not provided, a random name will be generated.
        llm_provider: The LLM provider to use. Can be "openai" or "google".

    Examples:

    ```python
    evaluation = Evaluation(dataset_name="my_dataset")
    evaluation.run()
    ```
    """

    def __init__(
        self,
        dataset_name: str,
        run_name: typing.Optional[str] = None,
        llm_provider: typing.Literal["openai", "gemini"] = "openai",
        tidb_ai_chat_engine: typing.Optional[str] = DEFAULT_TIDB_AI_CHAT_ENGINE,
    ) -> None:
        self.langfuse = Langfuse()
        self.dataset_name = dataset_name
        self.dataset = self.langfuse.get_dataset(dataset_name)
        self.tidb_ai_chat_engine = tidb_ai_chat_engine

        if run_name is None:
            random_str = uuid.uuid4().hex[:6]
            self.run_name = datetime.now().strftime(f"%Y-%m-%d-%H-{random_str}")
        else:
            self.run_name = run_name

        llm_provider = llm_provider.lower()
        if llm_provider == "openai":
            self._llama_llm = OpenAI(model="gpt-4o")
        elif llm_provider == "gemini":
            self._llama_llm = Gemini(model="models/gemini-1.5-flash")
        else:
            raise ValueError(f"Invalid LLM provider: {llm_provider}")
        self._correctness_evaluator = CorrectnessEvaluator(llm=self._llama_llm)
        self._language_evaluator = LanguageEvaluator(llm=self._llama_llm)
        self._toxicity_evaluator = ToxicityEvaluator(llm=self._llama_llm)

    def run(self) -> None:
        for item in tqdm(self.dataset.items):
            question = item.input["userInput"]
            output, trace_id = self._generate_answer_by_tidb_ai(question)
            item.link(
                trace_or_observation=None,
                trace_id=trace_id,
                run_name=self.run_name,
            )
            result = self._correctness_evaluator.evaluate(
                query=question,
                response=output,
                reference=item.expected_output,
            )
            self.langfuse.score(
                trace_id=trace_id,
                name="correctness",
                value=result.score,
                comment=result.feedback,
            )
            result = self._language_evaluator.evaluate(
                query=question,
                response=output,
            )
            self.langfuse.score(
                trace_id=trace_id,
                name="language",
                value=result.score,
            )
            result = self._toxicity_evaluator.evaluate(
                query=question,
                response=output,
            )
            self.langfuse.score(
                trace_id=trace_id,
                name="toxicity",
                value=result.score,
                comment=result.feedback,
            )

    @retry(stop=stop_after_attempt(2), wait=wait_fixed(5))
    def _generate_answer_by_tidb_ai(self, question: str) -> str:
        response = requests.post(
            settings.TIDB_AI_CHAT_ENDPOINT,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {settings.TIDB_AI_API_KEY}",
            },
            json={
                "messages": [
                    {
                        "role": "user",
                        "content": question,
                    }
                ],
                "index": "default",
                "chat_engine": self.tidb_ai_chat_engine,
                "stream": False,
            },
        )
        response.raise_for_status()
        data = response.json()
        trace_url = data["trace"]["langfuse_url"]
        answer = data["content"]
        return answer, parse_langfuse_trace_id_from_url(trace_url)


def parse_langfuse_trace_id_from_url(trace_url: str) -> str:
    # Example trace_url: https://us.cloud.langfuse.com/trace/87e7eb2e-b789-4b23-af60-fbcf0fd517a1
    return trace_url.split("/")[-1]
