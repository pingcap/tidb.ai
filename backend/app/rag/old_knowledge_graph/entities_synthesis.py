import dspy
from dspy.functional import TypedPredictor
from typing import Optional, List
from sqlalchemy.orm import Session

from app.rag.knowledge_graph.schema import (
    SynopsisEntity,
    EntityWithID,
    Relationship,
    ExistingSynopsisEntity,
)
from app.rag.knowledge_graph.store import GraphStore
from app.models import Entity as EntityTableModel, EntityType
from app.knowledge_graph.llm_openai import (
    get_entity_description_embedding,
    get_entity_metadata_embedding,
)


class SynopsisEntities(dspy.Signature):
    """You are tasked with creating the unified synopsis entity based on the group of entities and topic provided.

    Purpose of the Unified Synopsis Entity:
      - The unified synopsis entity serves as a comprehensive summary on a specific topic, based on the group of entities that share the same topic.
      - It provides a comprehensive overview for the topic, offering a more complete and efficient understanding of the concept represented by the group.

    Follow these requirements for comprehensive entities summary:
      - Select the most representative name that can distinctly identify the syspsis entity and differentiate it from other entities.
      - Summarize the descriptions into a comprehensive, detailed description that encompasses all aspects of the entities in that group and provides a clear understanding of the topic.
      - For each entity, select the topic-related metadata that can contribute factual data to the synopsis entity, \
          and categorize and organize them into a clearly structured JSON tree that comprehensively covers all aspects of the existing metadata.

    Now create a meaningful unified synopsis entity that serves as a comprehensive summary for the group of entities on the provided topic.
    """

    topic: str = dspy.InputField(
        description="The shared topic of the entities group, and each entity in the group can contribute factual data from its own perspective."
    )

    entities: List[EntityWithID] = dspy.InputField(
        desc="A group of entities that share the same topic and can contribute to a unified synopsis entity."
    )

    synopsis_entity: SynopsisEntity = dspy.OutputField(
        desc="The unified synopsis entity that serves as a comprehensive summary for the group of entities."
    )


class SynopsisEntitiesProgram(dspy.Module):
    def __init__(self):
        self.prog = TypedPredictor(SynopsisEntities)

    def forward(
        self, topic: str, entities: List[EntityWithID]
    ) -> Optional[SynopsisEntity]:
        if len(entities) < 2:
            return None

        pred = self.prog(
            topic=topic,
            entities=entities,
        )
        return pred


class UpdateSynopsisEntity(dspy.Signature):
    """You are tasked with updating the unified synopsis entity based on the new group of entities and the topic provided.

    Purpose of the Update Synopsis Entity:
      - The update synopsis entity integrates new factual data into the existing synopsis entity, based on the group of new entities that share the same topic.
      - It provides an enhanced overview for the topic, incorporating new information to offer a more complete and efficient understanding of the concept represented by the group.

    Follow these requirements for updating the synopsis entity:
      - Review the new entities and extract the most topic relevant information that can enhance the existing synopsis entity.
      - Update the description to include new aspects and insights from the new entities.
      - Integrate new metadata from the new entities that can contribute to a more comprehensive JSON tree structure.
      - Update the group_info.entities to include the IDs of the new entities, ensuring all contributing entities are represented.

    Now update the existing unified synopsis entity to incorporate the new information provided by the new group of entities on the specified topic.
    """

    topic: str = dspy.InputField(
        description="The shared topic of the entities group, for which new entities can contribute additional factual data."
    )

    new_entities: List[EntityWithID] = dspy.InputField(
        desc="A new group of entities that share the same topic and can provide additional information to the existing synopsis entity."
    )

    existing_synopsis_entity: ExistingSynopsisEntity = dspy.InputField(
        desc="The existing unified synopsis entity that serves as a comprehensive summary for the topic."
    )

    updated_synopsis_entity: ExistingSynopsisEntity = dspy.OutputField(
        desc="The updated unified synopsis entity that integrates new information and serves as an enhanced summary for the group of entities."
    )


class UpdateSynopsisEntitiesProgram(dspy.Module):
    def __init__(self):
        self.prog = TypedPredictor(UpdateSynopsisEntity)

    def forward(
        self,
        new_entities: List[EntityWithID],
        existing_synopsis_entity: ExistingSynopsisEntity,
    ) -> Optional[SynopsisEntity]:
        if len(new_entities) < 1:
            return None

        return self.prog(
            topic=existing_synopsis_entity.group_info.topic,
            new_entities=new_entities,
            existing_synopsis_entity=existing_synopsis_entity,
        )


class SimpleEntitiesSynthesizer:
    def __init__(
        self,
        complied_synthesis_entities_program_path: Optional[str] = None,
        compiled_update_entity_program_path: Optional[str] = None,
    ):
        self.synopsis_entities_prog = SynopsisEntitiesProgram()
        if complied_synthesis_entities_program_path:
            self.synopsis_entities_prog.prog.load(
                complied_synthesis_entities_program_path
            )

        self.update_synopsis_entities_prog = UpdateSynopsisEntitiesProgram()
        if compiled_update_entity_program_path:
            self.update_synopsis_entities_prog.prog.load(
                compiled_update_entity_program_path
            )

        self.store = GraphStore()

    def create_synopsis_entities(
        self,
        session: Session,
        topic: str,
        entities: List[EntityWithID],
    ) -> Optional[ExistingSynopsisEntity]:
        pred = self.synopsis_entities_prog.forward(topic, entities)

        if pred is None:
            return None

        synopsis_entity = self.store.get_or_create_entity(session, pred.synopsis_entity)
        for entity_id in pred.synopsis_entity.group_info.entities:
            # find the original entity
            target_entity = session.query(EntityTableModel).get(entity_id)
            if target_entity is None:
                raise ValueError(
                    f"Entity with ID {entity_id} not found in the database."
                )
            self.store.create_relationship(
                session,
                synopsis_entity,
                target_entity,
                Relationship(
                    source_entity=synopsis_entity.name,
                    target_entity=target_entity.name,
                    relationship_desc=f"{target_entity.name} is a part of synopsis entity (name={synopsis_entity.name}, topic={pred.synopsis_entity.group_info.topic})",
                ),
                {"relationship_type": EntityType.synopsis.value},
            )

        return ExistingSynopsisEntity(
            id=synopsis_entity.id,
            name=synopsis_entity.name,
            description=synopsis_entity.description,
            metadata=synopsis_entity.meta,
            group_info=pred.synopsis_entity.group_info,
        )

    def update_synopsis_entities(
        self,
        session: Session,
        new_entities: List[EntityWithID],
        existing_synopsis_entity: ExistingSynopsisEntity,
    ) -> Optional[ExistingSynopsisEntity]:
        pred = self.update_synopsis_entities_prog.forward(
            new_entities, existing_synopsis_entity
        )

        entity_obecjt = session.query(EntityTableModel).get(existing_synopsis_entity.id)
        entity_obecjt.name = pred.updated_synopsis_entity.name
        entity_obecjt.description = pred.updated_synopsis_entity.description
        entity_obecjt.description_vec = get_entity_description_embedding(
            pred.updated_synopsis_entity.name,
            pred.updated_synopsis_entity.description,
        )
        entity_obecjt.meta = pred.updated_synopsis_entity.metadata
        entity_obecjt.meta_vec = get_entity_metadata_embedding(
            pred.updated_synopsis_entity.metadata
        )
        entity_obecjt.synopsis_info = (
            pred.updated_synopsis_entity.group_info.model_dump()
        )

        session.commit()
        session.refresh(entity_obecjt)

        for entity in new_entities:
            # find the original entity
            target_entity = session.query(EntityTableModel).get(entity.id)
            self.store.create_relationship(
                session,
                entity_obecjt,
                target_entity,
                Relationship(
                    source_entity=entity_obecjt.name,
                    target_entity=target_entity.name,
                    relationship_desc=f"{target_entity.name} is a part of synopsis entity (name={entity_obecjt.name}, topic={pred.updated_synopsis_entity.group_info.topic})",
                ),
                {"relationship_type": EntityType.synopsis.value},
            )

        return pred.updated_synopsis_entity
