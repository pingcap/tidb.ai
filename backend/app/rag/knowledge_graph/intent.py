import logging
import dspy
from dspy.functional import TypedChainOfThought, TypedPredictor
from typing import List, Optional
from pydantic import BaseModel, Field
from llama_index.core.tools import FunctionTool

from app.rag.knowledge_graph.schema import Relationship

logger = logging.getLogger(__name__)


class RelationshipReasoning(Relationship):
    """Relationship between two entities extracted from the query"""

    reasoning: str = Field(
        description=("Explanation of the user's intention for this step.")
    )


class DecomposedFactors(BaseModel):
    """Decomposed factors extracted from the query to form the knowledge graph"""

    relationships: List[RelationshipReasoning] = Field(
        description="List of relationships representing the user's prerequisite and step-by-step intentions extracted from the query."
    )


class DecomposeQuery(dspy.Signature):
    """You are a knowledge base graph expert and are very good at building knowledge graphs. Now you are assigned to extract the user's step-by-step intentions from the query.

    ## Instructions:

    - Break down the user's query into a sequence of prerequisite questions (e.g., identifying specific versions) and step-by-step intentions.
    - Represent each prerequisite and intention as a relationship: (Source Entity) - [Relationship] -> (Target Entity).
    - Provide reasoning for each relationship, explaining the user's intention at that step.
    - Limit to no more than 5 relationships.
    - Ensure that the extracted relationships accurately reflect the user's real intentions.
    - Ensure that the relationships and intentions are grounded and factual, based on the information provided in the query.
    """

    query: str = dspy.InputField(
        desc="The query text to extract the user's step-by-step intentions."
    )
    factors: DecomposedFactors = dspy.OutputField(
        desc="Representation of the user's step-by-step intentions extracted from the query."
    )


class DecomposeQueryModule(dspy.Module):
    def __init__(self, dspy_lm: dspy.LM):
        super().__init__()
        self.dspy_lm = dspy_lm
        self.prog = TypedPredictor(DecomposeQuery)

    def forward(self, query):
        with dspy.settings.context(lm=self.dspy_lm):
            return self.prog(query=query)


class IntentAnalyzer:
    def __init__(self, dspy_lm: dspy.LM, complied_program_path: Optional[str] = None):
        self.intent_anlysis_prog = DecomposeQueryModule(dspy_lm=dspy_lm)
        if complied_program_path is not None:
            self.intent_anlysis_prog.load(complied_program_path)

    def analyze(self, query: str) -> DecomposedFactors:
        return self.intent_anlysis_prog(query=query).factors

    def as_tool_call(self):
        def breakDownQuery(query: str) -> list[str]:
            """
            Break down a complex user query into sub-questions and solve them step-by-step.

            If the query is complex, this function decomposes it into smaller sub-questions
            and solves them individually. For simple and straightforward queries,
            avoid calling this function.

            Args:
            query (str): The user's input query.

            Returns:
            str: The final result after solving all sub-questions.
            """

            return [query]

        return FunctionTool.from_defaults(fn=breakDownQuery)
