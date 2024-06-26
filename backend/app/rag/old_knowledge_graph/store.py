import dspy
from dspy.functional import TypedPredictor
from deepdiff import DeepDiff
import logging
from typing import List, Optional
from sqlmodel import Session
from sqlalchemy.orm import aliased
from sqlalchemy import asc, func

from app.rag.knowledge_graph.schema import Entity, Relationship, SynopsisEntity
from app.knowledge_graph.llm_openai import (
    get_entity_description_embedding,
    get_entity_metadata_embedding,
    get_relationship_description_embedding,
)
from app.models import (
    Entity as EntityModel,
    Relationship as RelationshipModel,
    EntityType,
)

logger = logging.getLogger(__name__)


class MergeEntities(dspy.Signature):
    """As a knowledge expert assistant specialized in database technologies, evaluate the two provided entities. These entities have been pre-analyzed and have same name but different descriptions and metadata.
    Please carefully review the detailed descriptions and metadata for both entities to determine if they genuinely represent the same concept or object(entity).
    If you conclude that the entities are identical, merge the descriptions and metadata fields of the two entities into a single consolidated entity.
    If the entities are distinct despite their same name that may be due to different contexts or perspectives, do not merge the entities and return none as the merged entity.

    Considerations: Ensure your decision is based on a comprehensive analysis of the content and context provided within the entity descriptions and metadata.
    """

    entities: List[Entity] = dspy.InputField(
        desc="List of entities identified from previous analysis."
    )
    merged_entity: Optional[Entity] = dspy.OutputField(
        desc="Merged entity with consolidated descriptions and metadata."
    )


class MergeEntitiesProgram(dspy.Module):
    def __init__(self):
        self.prog = TypedPredictor(MergeEntities)

    def forward(self, entities: List[Entity]):
        if len(entities) != 2:
            raise ValueError("The input should contain exactly two entities")

        pred = self.prog(entities=entities)
        return pred


class GraphStore:
    def __init__(self, description_similarity_threshold=0.9):
        self.merge_entities_prog = MergeEntitiesProgram()
        self.description_cosine_distance_threshold = (
            1 - description_similarity_threshold
        )

    def create_relationship(
        self,
        session: Session,
        source_entity: EntityModel,
        target_entity: EntityModel,
        relationship: Relationship,
        relationship_meatadata: dict = {},
        commit=True,
    ) -> RelationshipModel:
        relationshipObject = RelationshipModel(
            source_entity=source_entity,
            target_entity=target_entity,
            relationship_desc=relationship.relationship_desc,
            relationship_desc_vec=get_relationship_description_embedding(
                source_entity.name,
                source_entity.description,
                target_entity.name,
                target_entity.description,
                relationship.relationship_desc,
            ),
            meta=relationship_meatadata,
        )
        session.add(relationshipObject)
        if commit:
            session.commit()

    def get_related_triplets(
        slef, session: Session, doc_id: str
    ) -> tuple[set[EntityModel], set[RelationshipModel]]:
        # Aliases for source entity and target entity
        SourceEntity = aliased(EntityModel, name="se")
        TargetEntity = aliased(EntityModel, name="le")

        doc_id_str = f'"{doc_id}"'

        # Query to join the tables and filter based on JSON_CONTAINS
        result = (
            session.query(SourceEntity, RelationshipModel, TargetEntity)
            .join(SourceEntity, SourceEntity.id == RelationshipModel.source_entity_id)
            .join(TargetEntity, TargetEntity.id == RelationshipModel.target_entity_id)
            .filter(
                func.json_contains(
                    RelationshipModel.meta,
                    doc_id_str,
                    "$.doc_id",  # JSON path as a string
                )
            )
            .all()
        )

        # return the results
        entities_df = set()
        relationships_df = set()
        for se, r, le in result:
            entities_df.add(se)
            entities_df.add(le)
            relationships_df.add(r)

        return entities_df, relationships_df

    def get_or_create_entity(self, session: Session, entity: Entity) -> EntityModel:
        # using the cosine distance between the description vectors to determine if the entity already exists
        entity_type = (
            EntityType.synopsis
            if isinstance(entity, SynopsisEntity)
            else EntityType.original
        )
        entity_description_vec = get_entity_description_embedding(
            entity.name, entity.description
        )
        result = (
            session.query(
                EntityModel,
                EntityModel.description_vec.cosine_distance(
                    entity_description_vec
                ).label("distance"),
            )
            .filter(
                EntityModel.name == entity.name
                and EntityModel.entity_type == entity_type
            )
            .order_by(asc("distance"))
            .first()
        )
        if (
            result is not None
            and result[1] < self.description_cosine_distance_threshold
        ):
            db_obj = result[0]
            ob_obj_metadata = db_obj.meta
            if (
                db_obj.description == entity.description
                and db_obj.name == entity.name
                and len(DeepDiff(ob_obj_metadata, entity.metadata)) == 0
            ):
                return db_obj
            elif entity_type == EntityType.original:
                # use LLM to merge the most similar entities
                merged_entity = self._try_merge_entities(
                    [
                        Entity(
                            name=db_obj.name,
                            description=db_obj.description,
                            metadata=ob_obj_metadata,
                        ),
                        Entity(
                            name=entity.name,
                            description=entity.description,
                            metadata=entity.metadata,
                        ),
                    ]
                )
                if merged_entity is not None:
                    db_obj.description = merged_entity.description
                    db_obj.meta = merged_entity.metadata
                    db_obj.description_vec = get_entity_description_embedding(
                        db_obj.name, db_obj.description
                    )
                    db_obj.meta_vec = get_entity_metadata_embedding(db_obj.meta)
                    session.commit()
                    session.refresh(db_obj)
                    return db_obj

        synopsis_info_str = (
            entity.group_info.model_dump()
            if entity_type == EntityType.synopsis
            else None
        )

        db_obj = EntityModel(
            name=entity.name,
            description=entity.description,
            description_vec=entity_description_vec,
            meta=entity.metadata,
            meta_vec=get_entity_metadata_embedding(entity.metadata),
            synopsis_info=synopsis_info_str,
            entity_type=entity_type,
        )
        session.add(db_obj)
        session.commit()
        session.refresh(db_obj)
        return db_obj

    def _try_merge_entities(self, entities: List[Entity]) -> Entity:
        pred = self.merge_entities_prog(entities=entities)
        return pred.merged_entity


default_graph_store = GraphStore()
