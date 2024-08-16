from typing import Optional, Tuple, List

from sqlmodel import Session, select
from sqlalchemy.orm import joinedload
from sqlalchemy.orm.attributes import flag_modified

from app.models import Entity, Relationship, EntityType
from app.rag.knowledge_graph.graph_store.helpers import (
    get_entity_description_embedding,
    get_entity_metadata_embedding,
    get_relationship_description_embedding,
    get_query_embedding,
)
from app.rag.knowledge_graph.graph_store.tidb_graph_store import TiDBGraphStore
from app.rag.knowledge_graph.schema import Relationship as RelationshipAIModel
from app.rag.chat_config import get_default_embedding_model
from app.staff_action import create_staff_action_log


def get_entity(session: Session, entity_id: int) -> Optional[Entity]:
    return session.get(Entity, entity_id)


def update_entity(session: Session, entity: Entity, new_entity: dict) -> Entity:
    old_entity_dict = entity.screenshot()
    for key, value in new_entity.items():
        if value is not None:
            setattr(entity, key, value)
            flag_modified(entity, key)
    embed_model = get_default_embedding_model(session)
    entity.description_vec = get_entity_description_embedding(
        entity.name, entity.description, embed_model
    )
    entity.meta_vec = get_entity_metadata_embedding(entity.meta, embed_model)
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
        relationship.description_vec = get_relationship_description_embedding(
            relationship.source_entity.name,
            relationship.source_entity.description,
            relationship.target_entity.name,
            relationship.target_entity.description,
            relationship.description,
            embed_model,
        )
        session.add(relationship)
    session.commit()
    session.refresh(entity)
    new_entity_dict = entity.screenshot()
    create_staff_action_log(
        session, "update", "entity", entity.id, old_entity_dict, new_entity_dict
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


def get_relationship(session: Session, relationship_id: int) -> Optional[Relationship]:
    return session.get(Relationship, relationship_id)


def update_relationship(
    session: Session, relationship: Relationship, new_relationship: dict
) -> Relationship:
    old_relationship_dict = relationship.screenshot()
    for key, value in new_relationship.items():
        if value is not None:
            setattr(relationship, key, value)
            flag_modified(relationship, key)
    embed_model = get_default_embedding_model(session)
    relationship.description_vec = get_relationship_description_embedding(
        relationship.source_entity.name,
        relationship.source_entity.description,
        relationship.target_entity.name,
        relationship.target_entity.description,
        relationship.description,
        embed_model,
    )
    session.commit()
    session.refresh(relationship)
    new_relationship_dict = relationship.screenshot()
    create_staff_action_log(
        session,
        "update",
        "relationship",
        relationship.id,
        old_relationship_dict,
        new_relationship_dict,
    )
    return relationship


def search_similar_entities(session: Session, query: str, top_k: int = 10) -> list:
    embed_model = get_default_embedding_model(session)
    embedding = get_query_embedding(query, embed_model)
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
    embed_model = get_default_embedding_model(session)
    # with session.begin():
    synopsis_entity = Entity(
        name=name,
        description=description,
        description_vec=get_entity_description_embedding(
            name, description, embed_model
        ),
        meta=meta,
        meta_vec=get_entity_metadata_embedding(meta, embed_model),
        entity_type=EntityType.synopsis,
        synopsis_info={
            "entities": related_entities_ids,
            "topic": topic,
        },
    )
    session.add(synopsis_entity)
    graph_store = TiDBGraphStore(dspy_lm=None, session=session)
    for related_entity in session.exec(
        select(Entity).where(Entity.id.in_(related_entities_ids))
    ).all():
        graph_store.create_relationship(
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
    session.commit()
    create_staff_action_log(
        session,
        "create_synopsis_entity",
        "entity",
        synopsis_entity.id,
        {},
        synopsis_entity.screenshot(),
        commit=False,
    )
    return synopsis_entity
