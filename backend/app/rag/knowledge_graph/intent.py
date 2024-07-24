import logging
import dspy
from dspy.functional import TypedChainOfThought, TypedPredictor
from typing import List, Optional
from pydantic import BaseModel, Field

from app.rag.knowledge_graph.schema import Relationship

logger = logging.getLogger(__name__)


class RelationshipReasoning(Relationship):
    """Relationship between two entities extracted from the query"""

    reasoning: str = Field(
        description=(
            "Category reasoning for the relationship, e.g., 'the main conerns of the user', 'the problem the user is facing', 'the user case scenario', etc."
        )
    )


class DecomposedFactors(BaseModel):
    """Decomposed factors extracted from the query to form the knowledge graph"""

    relationships: List[RelationshipReasoning] = Field(
        description="List of relationships to represent critical concepts and their relationships extracted from the query."
    )


class DecomposeQuery(dspy.Signature):
    """You are a knowledge base graph expert and are very good at building knowledge graphs. Now you are assigned to extract the most critical concepts and their relationships from the query. Step-by-Step Analysis:

    1. Extract Meaningful user intents and questions:
      - Identify the question what the user itentionally asked, focusing on the the critial information about user's main concerns/questions/problems/use cases, etc.
      - Make this question simple and clear and ensure that it is directly related to the user's main concerns. Simple and clear question can improve the search accuracy.
    2. Establish Relationships to describe the user's intents:
      - Define relationships that accurately represent the user's query intent and information needs.
      - Format each relationship as: (Source Entity) - [Relationship] -> (Target Entity), where the relationship describes what the user wants to know about the connection between these entities.

    ## Instructions:

    - Limit to no more than 3 pairs. These pairs must accurately reflect the user's real (sub)questions.
    - Ensure that the extracted pairs are of high quality and do not introduce unnecessary search elements.
    - Ensure that the relationships and intents are grounded and factual, based on the information provided in the query.
    """

    query: str = dspy.InputField(
        desc="The query text to extract the most critical concepts and their relationships from the query."
    )
    factors: DecomposedFactors = dspy.OutputField(
        desc="Factors representation of the critical concepts and their relationships extracted from the query."
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
