import dspy
from dspy.functional import TypedPredictor
import logging
from pydantic import BaseModel, Field
from typing import List, Optional

logger = logging.getLogger(__name__)


class Step(BaseModel):
    explanation: str
    sql: str


class SQLSample(BaseModel):
    no_reasonable_example: bool = Field(
        description="Whether it is not possible to provide a reasonable example"
    )
    steps: List[Step] = Field(
        description="List of steps to execute the SQL query in TiDB Serverless"
    )


class SampleGen(dspy.Signature):
    """You are a technical assistant at TiDB, dedicated to providing users with precise and actionable guidance.
    Your mission is to ensure that users receive not only accurate answers but also valuable learning opportunities through practical, step-by-step examples.
    To achieve this, adhere to the following instructions:

    1. Understand the User's question and answer: Carefully review the user's question and answer provided. Ensure you fully grasp the technical context, the core issue, and any relevant background information.
    2. Determine the Feasibility of Providing a Complete Example:
        - Evaluate whether a step-by-step example can be provided to help the user better understand the topic at hand. Consider the technical details involved,
        and ensure that any example you provide is fully executable without requiring additional adjustments.
        - Ensure the example is comprehensive, and is designed to be directly usable in TiDB Serverless.
    3. Generate and Present a Complete Example:
        - Create a clear, detailed SQLs guide that the user can follow step-by-step. This example should include all necessary SQL commands and should be self-contained without requiring additional adjustments.
        - **Each step should include a single SQL Query (only SQL are allowed)**. he example should be self-contained, requiring no additional adjustments or assumptions from the user.
        Avoid combining multiple SQL commands within a single step to maintain clarity and prevent confusion.

    By following these instructions, you will help the user not only resolve their current query but also deepen their understanding of the topic through practical application.
    """

    QA_content: str = dspy.InputField(
        desc="The user's query that requires a step-by-step example to be generated."
    )
    sample: SQLSample = dspy.OutputField(
        desc="Step-by-step example to execute the SQL query in TiDB Serverless."
    )


class SQLGenModule(dspy.Module):
    def __init__(self, dspy_lm: dspy.LM):
        super().__init__()
        self.dspy_lm = dspy_lm
        self.prog = TypedPredictor(SampleGen)

    def forward(self, QA_content: str):
        with dspy.settings.context(lm=self.dspy_lm):
            return self.prog(QA_content=QA_content)


class SQlGenerator:
    def __init__(self, dspy_lm: dspy.LM, complied_program_path: Optional[str] = None):
        self.prog = SQLGenModule(dspy_lm=dspy_lm)
        if complied_program_path is not None:
            self.prog.load(complied_program_path)

    def gen(self, QA_content: str) -> SQLSample:
        return self.prog(QA_content).sample
