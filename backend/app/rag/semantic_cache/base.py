import dspy
from typing import List, Literal, Optional
from pydantic import BaseModel, Field
from sqlmodel import Session, select, func

from llama_index.core.embeddings.utils import EmbedType, resolve_embed_model
from llama_index.core.settings import Settings

from app.core.db import engine
from app.models import SemanticCache


class QA(BaseModel):
    """A single question-answer pair."""

    question: str = Field(description="The question in the question-answer pair.")
    answer: str = Field(description="The answer corresponding to the question.")


class QASet(BaseModel):
    """A collection of question-answer pairs."""

    items: List[QA] = Field(description="A list of question-answer pairs.")


class QASemanticOutput(BaseModel):
    """The output of the semantic search operation."""

    match_type: Literal["exact_match", "partial_match", "no_match"] = Field(
        description=(
            "The type of match found in the search. Must be 'exact_match' if the query matches a question exactly, "
            "or 'partial_match' if the query is related but not an exact match, "
            "or 'no_match' if the query does not match any question."
        )
    )
    items: List[QA] = Field(
        description=(
            "The list of question-answer pairs that best match the query. "
            "These pairs must be selected from the given candidates."
        )
    )


class QASemanticSearchModule(dspy.Signature):
    """This module performs a semantic search to identify the best matching question-answer pairs from a given set of candidates.

    The semantic search process includes:
    - Comparing the query against a set of candidate question-answer pairs.
    - Returning an 'exact_match' if the query perfectly matches a candidate question and answer.
    - Returning a 'partial_match' if the query is related to a candidate question and answer but not an exact match.
    - Returning a 'no_match' if the query does not match any candidate question and answer.

    The output includes the type of match and the set of question-answer pairs that are most relevant to the query.
    Note: The output items must be selected from the provided candidates.
    """

    query: str = dspy.InputField(
        description="The query string to search for within the candidates."
    )
    candidats: QASet = dspy.InputField(
        description="A collection of frequently asked questions and their corresponding answers to search through."
    )

    output: QASemanticOutput = dspy.OutputField(
        description=(
            "The result of the semantic search, including the match type and the set of relevant question-answer pairs. "
            "The output items must be chosen from the given candidates."
        ),
    )


class SemanticSearchProgram(dspy.Module):
    def __init__(self, dspy_lm: dspy.LM):
        super().__init__()
        self.dspy_lm = dspy_lm
        self.prog = dspy.TypedChainOfThought(QASemanticSearchModule)

    def forward(self, query: str, candidats: QASet):
        with dspy.settings.context(lm=self.dspy_lm):
            return self.prog(query=query, candidats=candidats)


class SemanticCacheManager:
    def __init__(
        self,
        dspy_llm: dspy.LM,
        session: Optional[Session] = None,
        embed_model: Optional[EmbedType] = None,
        complied_sc_search_program_path: Optional[str] = None,
    ):
        self._session = session
        self._owns_session = session is None
        if self._session is None:
            self._session = Session(engine)
        self._dspy_lm = dspy_llm
        self._embed_model = (
            resolve_embed_model(embed_model) if embed_model else Settings.embed_model
        )
        self.prog = SemanticSearchProgram(dspy_lm=dspy_llm)
        if complied_sc_search_program_path is not None:
            self.prog.load(complied_sc_search_program_path)

    def close_session(self) -> None:
        # Always call this method is necessary to make sure the session is closed
        if self._owns_session:
            self._session.close()

    def get_query_embedding(self, query: str):
        return self._embed_model.get_query_embedding(query)

    def add_cache(
        self,
        candidates: List[QA],
        namespace: str,
    ):
        for qa in candidates:
            object = SemanticCache(
                query=qa.question,
                query_vec=self.get_query_embedding(qa.question),
                value=qa.answer,
                value_vec=self.get_query_embedding(qa.answer),
                meta={"namespace": namespace},
            )
            self._session.add(object)

        self._session.commit()

    def search(self, query: str, namespace: Optional[str] = None) -> QASemanticOutput:
        embedding = self.get_query_embedding(query)
        sql = (
            select(
                SemanticCache,
                SemanticCache.query_vec.cosine_distance(embedding).label("distance"),
            )
            .having(SemanticCache.query_vec.cosine_distance(embedding) < 0.5)
            .order_by("distance")
            .limit(20)
        )
        if namespace:
            sql = sql.where(
                func.json_extract(SemanticCache.meta, "$.namespace") == namespace
            )

        results = self._session.execute(sql).all()
        candidates = QASet(
            items=[
                QA(
                    question=result.SemanticCache.query,
                    answer=result.SemanticCache.value,
                )
                for result in results
            ]
        )

        pred = self.prog(query=query, candidats=candidates)

        return pred.output
