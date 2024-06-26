import logging
import pandas as pd
import dspy
from dspy.functional import TypedPredictor
from pydantic import BaseModel, Field
from typing import Mapping, Optional, List
from sqlmodel import Session, select
from collections import defaultdict

from app.core import settings
from app.rag.knowledge_graph.schema import (
    Entity,
    Relationship,
    KnowledgeGraph,
    EntityCovariateInput,
    EntityCovariateOutput,
)
from app.rag.knowledge_graph.llm_openai import get_entity_description_embedding
from app.rag.knowledge_graph.store import GraphStore
from app.models import (
    Entity as EntityModel,
    Relationship as RelationshipModel,
    Chunk as ChunkModel,
    cosine_distance,
)

logger = logging.getLogger(__name__)


def get_llm_output_config():
    if settings.GRAPH_EXTRACT_LLM_PROVIDER == "openai":
        return {
            "response_format": {"type": "json_object"},
        }
    else:
        return {
            "response_mime_type": "application/json",
        }


class ExtractGraphTriplet(dspy.Signature):
    """Carefully analyze the provided text from database documentation and community blogs to thoroughly identify all entities related to database technologies, including both general concepts and specific details.

    Follow these Step-by-Step Analysis:

    1. Extract Meaningful Entities:
      - Identify all significant nouns, proper nouns, and technical terminologies that represent database-related concepts, objects, components, features, issues, key steps, execute order, user case, locations, versions, or any substantial entities.
      - Ensure that you capture entities across different levels of detail, from high-level overviews to specific technical specifications, to create a comprehensive representation of the subject matter.
      - Choose names for entities that are specific enough to indicate their meaning without additional context, avoiding overly generic terms.
      - Consolidate similar entities to avoid redundancy, ensuring each represents a distinct concept at appropriate granularity levels.

    2. Extract Metadata to claim the entities:
      - Carefully review the provided text, focusing on identifying detailed covariates associated with each entity.
      - Extract and link the covariates (which is a comprehensive json TREE, the first field is always: "topic") to their respective entities.
      - Ensure all extracted covariates is clearly connected to the correct entity for accuracy and comprehensive understanding.
      - Ensure that all extracted covariates are factual and verifiable within the text itself, without relying on external knowledge or assumptions.
      - Collectively, the covariates should provide a thorough and precise summary of the entity's characteristics as described in the source material.

    3. Establish Relationships:
      - Carefully examine the text to identify all relationships between clearly-related entities, ensuring each relationship is correctly captured with accurate details about the interactions.
      - Analyze the context and interactions between the identified entities to determine how they are interconnected, focusing on actions, associations, dependencies, or similarities.
      - Clearly define the relationships, ensuring accurate directionality that reflects the logical or functional dependencies among entities. \
         This means identifying which entity is the source, which is the target, and what the nature of their relationship is (e.g., $source_entity depends on $target_entity for $relationship).

    Some key points to consider:
      - Please endeavor to extract all meaningful entities and relationships from the text, avoid subsequent additional gleanings.

    Objective: Produce a detailed and comprehensive knowledge graph that captures the full spectrum of entities mentioned in the text, along with their interrelations, reflecting both broad concepts and intricate details specific to the database domain.

    """

    text = dspy.InputField(
        desc="a paragraph of text to extract entities and relationships to form a knowledge graph"
    )
    knowledge: KnowledgeGraph = dspy.OutputField(
        desc="Graph representation of the knowledge extracted from the text."
    )


class ExtractCovariate(dspy.Signature):
    """Please carefully review the provided text and entities list which are already identified in the text. Focusing on identifying detailed covariates associated with each entities provided.
    Extract and link the covariates (which is a comprehensive json TREE, the first field is always: "topic") to their respective entities.
    Ensure all extracted covariates is clearly connected to the correct entity for accuracy and comprehensive understanding.
    Ensure that all extracted covariates are factual and verifiable within the text itself, without relying on external knowledge or assumptions.
    Collectively, the covariates should provide a thorough and precise summary of the entity's characteristics as described in the source material.
    """

    text = dspy.InputField(
        desc="a paragraph of text to extract covariates to claim the entities."
    )

    entities: List[EntityCovariateInput] = dspy.InputField(
        desc="List of entities identified in the text."
    )
    covariates: List[EntityCovariateOutput] = dspy.OutputField(
        desc="Graph representation of the knowledge extracted from the text."
    )


class Extractor(dspy.Module):
    def __init__(self):
        super().__init__()
        self.prog_graph = TypedPredictor(ExtractGraphTriplet)
        self.prog_covariates = TypedPredictor(ExtractCovariate)

    def forward(self, text):
        pred_graph = self.prog_graph(
            text=text,
            config=get_llm_output_config(),
        )

        # extract the covariates
        entities_for_covariates = [
            EntityCovariateInput(
                name=entity.name,
                description=entity.description,
            )
            for entity in pred_graph.knowledge.entities
        ]

        pred_covariates = self.prog_covariates(
            text=text,
            entities=entities_for_covariates,
            config=get_llm_output_config(),
        )

        # replace the entities with the covariates
        for entity in pred_graph.knowledge.entities:
            for covariate in pred_covariates.covariates:
                if entity.name == covariate.name:
                    entity.metadata = covariate.covariates

        return pred_graph


class SimpleGraphExtractor:
    def __init__(self, complied_extract_program_path: Optional[str] = None):
        self.extract_prog = Extractor()
        if complied_extract_program_path is not None:
            self.extract_prog.load(complied_extract_program_path)

        self.store = GraphStore()

    def extract(self, text: str, uri: str):
        pred = self.extract_prog(text=text)
        return self._to_df(
            pred.knowledge.entities, pred.knowledge.relationships, {"doc_id": uri}
        )

    def _to_df(
        self,
        entities: list[Entity],
        relationships: list[Relationship],
        extra_meta: Mapping[str, str],
    ):
        # Create lists to store dictionaries for entities and relationships
        entities_data = []
        relationships_data = []

        # Iterate over parsed entities and relationships to create dictionaries
        for entity in entities:
            entity_dict = {
                "name": entity.name,
                "description": entity.description,
                "meta": entity.metadata,
            }
            entities_data.append(entity_dict)

        mapped_entities = {entity["name"]: entity for entity in entities_data}

        for relationship in relationships:
            source_entity_description = ""
            if relationship.source_entity not in mapped_entities:
                new_source_entity = {
                    "name": relationship.source_entity,
                    "description": (
                        f"Derived from from relationship: "
                        f"{relationship.source_entity} -> {relationship.relationship_desc} -> {relationship.target_entity}"
                    ),
                    "meta": {"status": "need-revised"},
                }
                entities_data.append(new_source_entity)
                mapped_entities[relationship.source_entity] = new_source_entity
                source_entity_description = new_source_entity["description"]
            else:
                source_entity_description = mapped_entities[relationship.source_entity][
                    "description"
                ]

            target_entity_description = ""
            if relationship.target_entity not in mapped_entities:
                new_target_entity = {
                    "name": relationship.target_entity,
                    "description": (
                        f"Derived from from relationship: "
                        f"{relationship.source_entity} -> {relationship.relationship_desc} -> {relationship.target_entity}"
                    ),
                    "meta": {"status": "need-revised"},
                }
                entities_data.append(new_target_entity)
                mapped_entities[relationship.target_entity] = new_target_entity
                target_entity_description = new_target_entity["description"]
            else:
                target_entity_description = mapped_entities[relationship.target_entity][
                    "description"
                ]

            relationship_dict = {
                "source_entity": relationship.source_entity,
                "source_entity_description": source_entity_description,
                "target_entity": relationship.target_entity,
                "target_entity_description": target_entity_description,
                "relationship_desc": relationship.relationship_desc,
                "meta": {
                    **extra_meta,
                },
            }
            relationships_data.append(relationship_dict)

        # Create DataFrames for entities and relationships
        entities_df = pd.DataFrame(entities_data)
        relationships_df = pd.DataFrame(relationships_data)
        return entities_df, relationships_df

    # if the description is similar to the existing record, then treat it as the same
    description_similarity_threshold = 0.85
    description_cosine_distance_threshold = 1 - description_similarity_threshold

    def save_to_db(
        self,
        session: Session,
        text: str,
        uri: str,
        entities_df: pd.DataFrame,
        relationships_df: pd.DataFrame,
    ):
        if entities_df.empty or relationships_df.empty:
            logger.info(
                "Entities or relationships are empty, skip saving to the database"
            )
            return

        if (
            session.query(RelationshipModel)
            .filter(RelationshipModel.meta["doc_id"] == uri)
            .first()
            is not None
        ):
            logger.info(
                f"Document with uri: {uri} already exists in the database, skip saving to the database"
            )
            return

        entities_name_map = defaultdict(list)
        for _, row in entities_df.iterrows():
            entities_name_map[row["name"]].append(
                self.store.get_or_create_entity(
                    session,
                    Entity(
                        name=row["name"],
                        description=row["description"],
                        metadata=row["meta"],
                    ),
                )
            )

        def _find_or_create_entity_for_relation(
            name: str, description: str
        ) -> EntityModel:
            _embedding = get_entity_description_embedding(name, description)
            # Check entities_name_map first, if not found, then check the database
            for e in entities_name_map.get(name, []):
                if (
                    cosine_distance(e.description_vec, _embedding)
                    < self.description_cosine_distance_threshold
                ):
                    return e
            return self.store.get_or_create_entity(
                session,
                Entity(
                    name=name,
                    description=description,
                    metadata={"status": "need-revised"},
                ),
            )

        for _, row in relationships_df.iterrows():
            source_entity = _find_or_create_entity_for_relation(
                row["source_entity"], row["source_entity_description"]
            )
            target_entity = _find_or_create_entity_for_relation(
                row["target_entity"], row["target_entity_description"]
            )

            self.store.create_relationship(
                session,
                source_entity,
                target_entity,
                Relationship(
                    source_entity=source_entity.name,
                    target_entity=target_entity.name,
                    relationship_desc=row["relationship_desc"],
                ),
                relationship_meatadata=row["meta"],
            )


def get_chunk_by_uri(session: Session, uri: str) -> Optional[ChunkModel]:
    return session.exec(select(ChunkModel).where(ChunkModel.doc_id == uri)).first()


# If the document already exists, then we should not to extract the graph again
# Currently, we are checking if the document with the same URI exists in the database
def document_already_exists(session: Session, uri: str):
    return get_chunk_by_uri(session, uri) is not None


class GraphGleanings(BaseModel):
    """Response to whether all entities and relationships have been captured based on the provided text."""

    all_captured: bool = Field(
        description="Response to whether all entities and relationships have been captured based on the provided text."
    )

    additional_entities: List[Entity] = Field(
        description="List of additional entities identified in the text, missing in the initial extraction."
    )

    additional_relationships: List[Relationship] = Field(
        description="List of additional relationships identified in the text, missing in the initial extraction."
    )


class ExtractGleanings(dspy.Signature):
    """After reviewing the initial extraction results, assess whether all relevant entities and their relationships have been identified from the text.

    Firstly, consider if any key details, entities, or relationships might still be missing, focusing particularly on technical terms, named entities, and interactions that may not have been captured in the first round.
    - Please respond with 'YES' if you believe all entities and relationships have been captured, based on the provided text only, ensuring that no external knowledge or assumptions are used.
    - Respond with 'NO' if you identify gaps and think additional entities or relationships need to be identified.

    In the case of a 'NO' response, please revisit the text, paying close attention to potentially overlooked or subtle entities and their connections.
    List any additional entities and relationships you find, ensuring each is clearly defined, contextualized, and strictly based on the text.

    Some key points to follow while identifying additional entities and relationships are:
    - Entitie must be meaningful, and it should be specific object or concept, avoid ambiguous entities.
      1. Specificity: Entity names must be specific and indicative of their nature.
      2. Diversity: Entities should be identified at multiple levels of detail, from general overviews to specific functionalities.
      3. Uniqueness: Similar entities should be consolidated to avoid redundancy, with each entity distinctly represented.

    - Metadata must directly relate to and describe their respective entities.
      1. Accuracy: All metadata should be factual, verifiable from the text, and not based on external assumptions.
      2. Structure: Metadata should be organized in a comprehensive JSON tree, with the first field labeled "topic", facilitating structured data integration and retrieval.

    - Relationships:
      1. Entities must be in entities list, don't use non-existing entities.
      2. Carefully examine the text to identify all relationships between clearly-related entities, ensuring each relationship is correctly captured with accurate details about the interactions.
      3. Clearly define the relationships, ensuring accurate directionality that reflects the logical or functional dependencies among entities. \
         This means identifying which entity is the source, which is the target, and what the nature of their relationship is (e.g., $source_entity depends on $target_entity for $relationship).
      4. Extract as many relationships as possible.


    - Please endeavor to extract all meaningful entities and relationships from the text, avoid subsequent additional gleanings.
    - Maintain language consistency in the terminology used to describe these entities and relationships, except it is necessary to preserve the original meaning.

    Your task is to ensure that all extracted entities and their relationships are factual and verifiable directly from the text itself, without relying on external knowledge or assumptions."""

    text = dspy.InputField(
        desc="a paragraph of text to extract entities and relationships to form a knowledge graph"
    )
    knowledge: KnowledgeGraph = dspy.InputField(
        desc="Graph representation of the knowledge extracted from the text."
    )
    gleanings: GraphGleanings = dspy.OutputField(
        desc="Response to whether all entities and relationships have been captured based on the provided text."
    )


class GleanMissingModule(dspy.Module):
    """After reviewing the initial extraction results, assess whether all relevant entities and their relationships have been identified from the text."""

    def __init__(self, gleaning_count=1, enable_covariates=True):
        super().__init__()

        if gleaning_count < 1:
            self.gleaning_count = 1
        self.gleaning_count = gleaning_count
        self.enable_covariates = enable_covariates

        self.prog_gleanings = TypedPredictor(ExtractGleanings)
        self.prog_covariates = TypedPredictor(ExtractCovariate)

    def forward(self, text, knowledge):
        # copy the knowledge to existing_knowledge
        entitiy_names = set([entity.name for entity in knowledge.entities])
        additional_entities = []
        additional_relationships = []

        for _ in range(self.gleaning_count):
            pred_graph = self.prog_gleanings(
                text=text,
                knowledge=knowledge,
            )

            if pred_graph.gleanings.all_captured:
                break

            # add the additional entities to the existing knowledge
            for entity in pred_graph.gleanings.additional_entities:
                if entity.name in entitiy_names:
                    continue

                additional_entities.append(entity)
                entitiy_names.add(entity.name)

            for relationship in pred_graph.gleanings.additional_relationships:
                additional_relationships.append(relationship)

        if self.enable_covariates:
            # extract the covariates
            entities_for_covariates = [
                EntityCovariateInput(
                    name=entity.name,
                    description=entity.description,
                )
                for entity in additional_entities
            ]

            pred_covariates = self.prog_covariates(
                text=text,
                entities=entities_for_covariates,
                config=get_llm_output_config(),
            )

            # replace the entities with the covariates
            for entity in additional_entities:
                for covariate in pred_covariates.covariates:
                    if entity.name == covariate.name:
                        entity.metadata = covariate.covariates

        return KnowledgeGraph(
            entities=additional_entities,
            relationships=additional_relationships,
        )


class SimpleGleaninger:
    def __init__(self, complied_gleaning_program_path: Optional[str] = None):
        self.gleaning_prog = GleanMissingModule()
        if complied_gleaning_program_path is not None:
            self.gleaning_prog.load(complied_gleaning_program_path)

        self.store = GraphStore()

    def glean(self, session: Session, text: str, uri: str):
        """
        Glean additional entities and relationships from the text.
        Args:
            text: text to be gleaning
            knowledge: existing knowledge graph that belong to the same text
        """
        entities_df, relationships_df = self.store.get_related_triplets(session, uri)
        kg_data = KnowledgeGraph(
            entities=[
                Entity(
                    name=entity.name,
                    description=entity.description,
                    metadata=entity.meta,
                )
                for entity in entities_df
            ],
            relationships=[
                Relationship(
                    source_entity=relationship.source_entity.name,
                    target_entity=relationship.target_entity.name,
                    relationship_desc=relationship.relationship_desc,
                )
                for relationship in relationships_df
            ],
        )

        pred = self.gleaning_prog(text=text, knowledge=kg_data)
        return entities_df, pred

    def save_to_db(
        self,
        session: Session,
        uri: str,
        existing_entities: List[EntityModel],
        new_knowledge: KnowledgeGraph,
    ):
        """
        Save the new knowledge to the database.
        Args:
            session: SQLAlchemy session
            uri: document id
            existing_entities: list of existing entities in the database that belong to the same document id
            new_knowledge: new knowledge to be saved to the database that can be extracted using glean
        """
        if len(new_knowledge.entities) == 0 and len(new_knowledge.relationships) == 0:
            logger.info(
                "Entities and relationships are empty, skip saving to the database"
            )
            return

        entities_name_map = defaultdict(EntityModel)
        for entity in existing_entities:
            entities_name_map[entity.name] = entity

        for entity in new_knowledge.entities:
            entities_name_map[entity.name] = self.store.get_or_create_entity(
                session,
                entity,
            )

        for relationship in new_knowledge.relationships:
            source_entity = entities_name_map.get(relationship.source_entity, None)
            target_entity = entities_name_map.get(relationship.target_entity, None)
            if source_entity is None or target_entity is None:
                logger.info(
                    f"Source entity: {relationship.source_entity} or target entity: {relationship.target_entity} is not found in the database, "
                    f"skip saving the relationship {relationship.relationship_desc}"
                )
                continue

            self.store.create_relationship(
                session,
                source_entity,
                target_entity,
                Relationship(
                    source_entity=source_entity.name,
                    target_entity=target_entity.name,
                    relationship_desc=relationship.relationship_desc,
                ),
                relationship_meatadata={"doc_id": uri},
            )
