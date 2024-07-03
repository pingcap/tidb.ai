import logging
import dspy
from dspy.functional import TypedChainOfThought
from typing import List, Optional
from pydantic import BaseModel, Field

from app.knowledge_graph.model import Relationship
from app.core.settings import COMPLIED_INTENT_ANALYSIS_PROGRAM_PATH

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
2. Establish Relationships:
  - Ensure that the source entity and target entities in each relationship are present in the list of extracted entities.
  - Carefully examine the text to identify all relationships between clearly-related entities, ensuring each relationship is correctly captured with accurate details about the interactions.
  - Clearly define the relationships, ensuring accurate directionality that reflects the logical or functional dependencies among entities. \
    This means identifying which entity is the source, which is the target, and what the nature of their relationship is (e.g., $source_entity depends on $target_entity for $relationship).

## Instructions:

- Limit to no more than 3 pairs. These pairs must accurately reflect the user's real (sub)questions.
- Ensure that the extracted pairs are of high quality and do not introduce unnecessary search elements.
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
        self.prog = TypedChainOfThought(DecomposeQuery)

    def forward(self, query):
        with dspy.settings.context(lm=self.dspy_lm):
            return self.prog(query=query)


class IntentAnalyzer:
    def __init__(self,  dspy_lm: dspy.LM, complied_program_path: Optional[str] = None):
        self.intent_anlysis_prog = DecomposeQueryModule(dspy_lm=dspy_lm)
        if complied_program_path is not None:
            self.intent_anlysis_prog.load(complied_program_path)

    def analyze(self, query: str) -> DecomposedFactors:
        return self.intent_anlysis_prog(query=query).factors
