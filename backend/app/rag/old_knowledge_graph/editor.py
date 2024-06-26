from typing import Optional, Tuple, List
from sqlmodel import Session, select, update
from sqlalchemy.orm import joinedload
from sqlalchemy.orm.attributes import flag_modified

from app.models import (
    Chunk,
    Entity,
    EntityType,
    Relationship,
    Feedback,
    FeedbackCreate,
    FeedbackType,
)
from app.rag.knowledge_graph.llm_openai import (
    get_query_embedding,
    get_entity_description_embedding,
    get_entity_metadata_embedding,
    get_relationship_description_embedding,
)
from app.rag.knowledge_graph.store import default_graph_store
from app.rag.knowledge_graph.schema import Relationship as RelationshipAIModel
from app.repositories import staff_action_repo


def get_entity(session: Session, entity_id: int) -> Optional[Entity]:
    return session.get(Entity, entity_id)


def update_entity(session: Session, entity: Entity, new_entity: dict) -> Entity:
    old_entity_dict = entity.screenshot()
    for key, value in new_entity.items():
        if value is not None:
            setattr(entity, key, value)
            flag_modified(entity, key)
    entity.description_vec = get_entity_description_embedding(
        entity.name, entity.description
    )
    entity.meta_vec = get_entity_metadata_embedding(entity.meta)
    for relationship in session.exec(
        select(Relationship)
        .options(
            joinedload(Relationship.source_entity),
            joinedload(Relationship.target_entity),
        )
        .where(
            (Relationship.source_entity_id == entity.id)
            | (Relationship.target_entity_id == entity.id)
        )
    ):
        relationship.relationship_desc_vec = get_relationship_description_embedding(
            relationship.source_entity.name,
            relationship.source_entity.description,
            relationship.target_entity.name,
            relationship.target_entity.description,
            relationship.relationship_desc,
        )
        session.add(relationship)
    session.commit()
    session.refresh(entity)
    new_entity_dict = entity.screenshot()
    staff_action_repo.create_staff_action_log(
        session, "update", "entity", old_entity_dict, new_entity_dict
    )
    return entity


def get_entity_subgraph(session: Session, entity: Entity) -> Tuple[list, list]:
    """
    Get the subgraph of an entity, including all related relationships and entities.
    """
    relationships_queryset = session.exec(
        select(Relationship)
        .options(
            joinedload(Relationship.source_entity),
            joinedload(Relationship.target_entity),
        )
        .where(
            (Relationship.source_entity_id == entity.id)
            | (Relationship.target_entity_id == entity.id)
        )
    )
    relationships = []
    entities = []
    entities_set = set()
    for relationship in relationships_queryset:
        entities_set.add(relationship.source_entity)
        entities_set.add(relationship.target_entity)
        relationships.append(relationship.screenshot())

    for entity in entities_set:
        entities.append(entity.screenshot())

    return relationships, entities


def search_similar_entities(session: Session, query: str, top_k: int = 10) -> list:
    embedding = get_query_embedding(query)
    return session.exec(
        select(Entity)
        .where(Entity.entity_type == EntityType.original)
        .order_by(Entity.description_vec.cosine_distance(embedding))
        .limit(top_k)
    ).all()


def create_synopsis_entity(
    session: Session,
    name: str,
    description: str,
    topic: str,
    meta: dict,
    related_entities_ids: List[int],
) -> Entity:
    with session.begin():
        synopsis_entity = Entity(
            name=name,
            description=description,
            description_vec=get_entity_description_embedding(name, description),
            meta=meta,
            meta_vec=get_entity_metadata_embedding(meta),
            entity_type=EntityType.synopsis,
            synopsis_info={
                "entities": related_entities_ids,
                "topic": topic,
            },
        )
        session.add(synopsis_entity)
        for related_entity in session.exec(
            select(Entity).where(Entity.id.in_(related_entities_ids))
        ).all():
            default_graph_store.create_relationship(
                session,
                synopsis_entity,
                related_entity,
                RelationshipAIModel(
                    source_entity=synopsis_entity.name,
                    target_entity=related_entity.name,
                    relationship_desc=f"{related_entity.name} is a part of synopsis entity (name={synopsis_entity.name}, topic={topic})",
                ),
                {"relationship_type": EntityType.synopsis.value},
                commit=False,
            )
        staff_action_repo.create_staff_action_log(
            session,
            "create_synopsis_entity",
            "entity",
            {},
            synopsis_entity.screenshot(),
            commit=False,
        )
        return synopsis_entity


def get_chunk(session: Session, chunk_uri: int) -> Optional[Chunk]:
    return session.exec(select(Chunk).where(Chunk.doc_id == chunk_uri)).first()


def get_chunk_subgraph(session: Session, chunk: Chunk) -> Tuple[list, list]:
    """
    Get the subgraph of a chunk, including all related relationships and entities.
    """
    relationships_queryset = session.exec(
        select(Relationship)
        .options(
            joinedload(Relationship.source_entity),
            joinedload(Relationship.target_entity),
        )
        .where(Relationship.meta["doc_id"] == chunk.doc_id)
    )
    relationships = []
    entities = []
    entities_set = set()
    for relationship in relationships_queryset:
        entities_set.add(relationship.source_entity)
        entities_set.add(relationship.target_entity)
        relationships.append(relationship.screenshot())

    for entity in entities_set:
        entities.append(entity.screenshot())

    return relationships, entities


def get_relationship(session: Session, relationship_id: int) -> Optional[Relationship]:
    return session.get(Relationship, relationship_id)


def update_relationship(
    session: Session, relationship: Relationship, new_relationship: dict
) -> Relationship:
    old_relationship_dict = relationship.screenshot()
    for key, value in new_relationship.items():
        if value is not None:
            # TODO: hard code for now to unify the `description` field name
            # wd0517 will update the model's field name later
            if key == "description":
                relationship.relationship_desc = value
            else:
                setattr(relationship, key, value)
                flag_modified(relationship, key)
    relationship.relationship_desc_vec = get_relationship_description_embedding(
        relationship.source_entity.name,
        relationship.source_entity.description,
        relationship.target_entity.name,
        relationship.target_entity.description,
        relationship.relationship_desc,
    )
    session.commit()
    session.refresh(relationship)
    new_relationship_dict = relationship.screenshot()
    staff_action_repo.create_staff_action_log(
        session, "update", "relationship", old_relationship_dict, new_relationship_dict
    )
    return relationship


def save_feedback(session: Session, feedback: FeedbackCreate):
    db_feedback = Feedback.model_validate(feedback)
    session.add(db_feedback)
    session.exec(
        update(Relationship)
        .where(Relationship.id.in_(db_feedback.relationships))
        .values(
            weight=Relationship.weight
            + FeedbackType.adjust_relationship_weight(feedback.feedback_type)
        )
    )
    session.commit()
