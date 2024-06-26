from typing import Tuple, Set, List, Dict
from sqlmodel import Session, select
from sqlalchemy.orm import joinedload, defer, aliased
from sqlalchemy.sql import func, asc, text

from app.core import settings
from app.models import Entity, Relationship, Chunk, EntityType
from app.knowledge_graph.llm_openai import get_query_embedding


def search_by_relationship_by_embedding(
    session: Session, embedding: list, top_k: int = 10
) -> Tuple[Set[Relationship], Set[Entity]]:
    relationship_set = set()
    entity_set = set()

    # Get initial relationships based on the embedding similarity
    for r in session.exec(
        select(Relationship)
        .options(
            joinedload(Relationship.source_entity),
            joinedload(Relationship.target_entity),
        )
        .order_by(Relationship.relationship_desc_vec.cosine_distance(embedding))
        .limit(top_k)
    ):
        relationship_set.add(r)
        entity_set.add(r.source_entity)
        entity_set.add(r.target_entity)

    return relationship_set, entity_set


def search_from_unvisited_relationship(
    session: Session,
    embedding: list,
    visited_relationships: Set[int],
    visited_entities: Set[int],
    top_k: int = 10,
) -> Tuple[Set[Relationship], Set[Entity]]:
    relationship_set = set()
    entity_set = set()

    # Get relationships from the target entity of the given relationship
    for r in session.exec(
        select(Relationship)
        .options(
            joinedload(Relationship.source_entity),
            joinedload(Relationship.target_entity),
        )
        .where(
            Relationship.source_entity_id.in_(visited_entities),
            Relationship.id.notin_(visited_relationships),
        )
        .order_by(Relationship.relationship_desc_vec.cosine_distance(embedding))
        .limit(top_k)
    ):
        relationship_set.add(r)
        entity_set.add(r.target_entity)

    return relationship_set, entity_set


def search_from_entity(
    session: Session, entity_id: int, embedding: list, forward: bool = True
) -> Tuple[Set[Relationship], Set[Entity]]:
    relationship_set = set()
    new_entity_set = set()

    # Retrieve entities based on their ID and similarity to the embedding
    for entity in session.exec(
        select(Entity)
        .where(Entity.id == entity_id)
        .order_by(Entity.description_vec.cosine_distance(embedding))
        .limit(5)
    ):
        relationships = session.exec(
            select(Relationship)
            .options(
                joinedload(Relationship.source_entity),
                joinedload(Relationship.target_entity),
            )
            .filter(Relationship.source_entity == entity)
        )
        for r in relationships:
            relationship_set.add(r)
            if forward:
                new_entity_set.add(r.target_entity)
            else:
                new_entity_set.add(r.source_entity)

    return relationship_set, new_entity_set


def fetch_similar_entities(
    session: Session,
    embedding: list,
    top_k: int = 5,
    entity_type: EntityType = EntityType.original,
):
    new_entity_set = set()

    # Retrieve entities based on their ID and similarity to the embedding
    for entity in (
        session.query(Entity)
        .filter(Entity.entity_type == entity_type)
        .order_by(Entity.description_vec.cosine_distance(embedding))
        .limit(top_k)
    ):
        new_entity_set.add(entity)

    return new_entity_set


def retrieve(
    session: Session,
    query: str,
    embedding: list,
    depth: int = 2,
    include_meta: bool = False,
) -> Tuple[list, list, list]:
    if not embedding:
        assert query, "Either query or embedding must be provided"
        embedding = get_query_embedding(query)

    relationships, entities = search_by_relationship_by_embedding(session, embedding)
    all_relationships = set(relationships)
    all_entities = set(entities)
    visited_entities = set(e.id for e in entities)
    visited_relationships = set(r.id for r in relationships)

    for _ in range(depth - 1):
        new_relationships, new_entities = search_from_unvisited_relationship(
            session, embedding, visited_relationships, visited_entities
        )
        all_relationships.update(new_relationships)
        all_entities.update(new_entities)

        visited_entities.update(e.id for e in new_entities)
        visited_relationships.update(r.id for r in new_relationships)

    synopsis_entities = fetch_similar_entities(
        session, embedding, top_k=2, entity_type=EntityType.synopsis
    )
    all_entities.update(synopsis_entities)

    related_doc_ids = set()
    for r in all_relationships:
        if "doc_id" not in r.meta:
            continue
        related_doc_ids.add(r.meta["doc_id"])

    entities = [
        {
            "id": e.id,
            "name": e.name,
            "description": e.description,
            "meta": e.meta if include_meta else None,
            "entity_type": e.entity_type,
        }
        for e in all_entities
    ]
    relationships = [
        {
            "id": r.id,
            "source_entity_id": r.source_entity_id,
            "target_entity_id": r.target_entity_id,
            "description": r.relationship_desc,
            "rag_description": f"{r.source_entity.name} -> {r.relationship_desc} -> {r.target_entity.name}",
            "meta": r.meta,
            "weight": r.weight,
        }
        for r in all_relationships
    ]
    chunks = [
        {"text": c[0], "link": c[1], "meta": c[2]}
        for c in session.query(Chunk.text, Chunk.doc_id, Chunk.meta)
        .filter(Chunk.doc_id.in_(related_doc_ids))
        .all()
    ]
    return entities, relationships, chunks


# The configuration for the weight coefficient
# format: ((min_weight, max_weight), coefficient)
DEFAULT_WEIGHT_COEFFICIENT_CONFIG = [
    ((0, 100), 0.01),
    ((100, 1000), 0.001),
    ((1000, 10000), 0.0001),
    ((10000, float("inf")), 0.00001),
]

# The configuration for the range search
# format: ((min_distance, max_distance), seach_ratio)
# The sum of search ratio should be 1 except some case we want to search as many as possible relationships.
# In this case, we set the search ratio to 1, and the other search ratio sum should be 1
DEFAULT_RANGE_SEARCH_CONFIG = [
    ((0.0, 0.25), 1),
    ((0.25, 0.35), 0.7),
    ((0.35, 0.45), 0.2),
    ((0.45, 0.55), 0.1),
]

DEFAULT_DEGREE_COEFFICIENT = 0.001


def get_weight_score(
    weight: int, weight_coefficient_config: List[Tuple[Tuple[int, int], float]]
) -> float:
    weight_score = 0.0
    remaining_weight = weight

    for weight_range, coefficient in weight_coefficient_config:
        if remaining_weight <= 0:
            break
        lower_bound, upper_bound = weight_range
        applicable_weight = min(upper_bound - lower_bound, remaining_weight)
        weight_score += applicable_weight * coefficient
        remaining_weight -= applicable_weight

    return weight_score


def get_degree_score(in_degree: int, out_degree: int, degree_coefficient) -> float:
    return (in_degree - out_degree) * degree_coefficient


def calculate_relationship_score(
    embedding_distance: float,
    weight: int,
    in_degree: int,
    out_degree: int,
    alpha: float,
    weight_coefficient_config: List[
        Tuple[Tuple[int, int], float]
    ] = DEFAULT_WEIGHT_COEFFICIENT_CONFIG,
    degree_coefficient: float = DEFAULT_DEGREE_COEFFICIENT,
    with_degree: bool = False,
) -> float:
    weighted_score = get_weight_score(weight, weight_coefficient_config)
    degree_score = 0
    if with_degree:
        degree_score = get_degree_score(in_degree, out_degree, degree_coefficient)
    return alpha * (1 / embedding_distance) + weighted_score + degree_score


# Function to fetch degrees for entities
def fetch_entity_degrees(
    session: Session, entity_ids: List[int]
) -> Dict[int, Dict[str, int]]:
    degrees = {entity_id: {"in_degree": 0, "out_degree": 0} for entity_id in entity_ids}

    try:
        # Fetch out-degrees
        out_degree_query = (
            session.query(
                Relationship.source_entity_id,
                func.count(Relationship.id).label("out_degree"),
            )
            .filter(Relationship.source_entity_id.in_(entity_ids))
            .group_by(Relationship.source_entity_id)
        ).all()

        for row in out_degree_query:
            degrees[row.source_entity_id]["out_degree"] = row.out_degree

        # Fetch in-degrees
        in_degree_query = (
            session.query(
                Relationship.target_entity_id,
                func.count(Relationship.id).label("in_degree"),
            )
            .filter(Relationship.target_entity_id.in_(entity_ids))
            .group_by(Relationship.target_entity_id)
        ).all()

        for row in in_degree_query:
            degrees[row.target_entity_id]["in_degree"] = row.in_degree
    except Exception as e:
        print(f"An error occurred: {e}")

    return degrees


def search_relationships_weight(
    session: Session,
    embedding: List[float],
    visited_relationships: Set[int],
    visited_entities: Set[int],
    distance_range: Tuple[float, float] = (0.0, 1.0),
    limit: int = 100,
    weight_coefficient_config: List[
        Tuple[Tuple[int, int], float]
    ] = DEFAULT_WEIGHT_COEFFICIENT_CONFIG,
    alpha: float = 1,
    rank_n: int = 10,
    degree_coefficient: float = DEFAULT_DEGREE_COEFFICIENT,
    with_degree: bool = False,
    relationship_meta_filters: Dict = {},
) -> List[Relationship]:
    # select the relationships to rank
    subquery = (
        select(
            Relationship,
            Relationship.relationship_desc_vec.cosine_distance(embedding).label(
                "embedding_distance"
            ),
        )
        .options(defer(Relationship.relationship_desc_vec))
        .order_by(asc("embedding_distance"))
        .limit(limit * settings.RELATIONSHIP_POST_FILTER_TOP_K_FACTOR)
    ).subquery()

    relationships_alias = aliased(Relationship, subquery)

    query = (
        select(relationships_alias, text("embedding_distance"))
        .options(
            defer(relationships_alias.relationship_desc_vec),
            joinedload(relationships_alias.source_entity)
            .defer(Entity.meta_vec)
            .defer(Entity.description_vec),
            joinedload(relationships_alias.target_entity)
            .defer(Entity.meta_vec)
            .defer(Entity.description_vec),
        )
        .where(relationships_alias.weight >= 0)
    )

    if relationship_meta_filters:
        for k, v in relationship_meta_filters.items():
            query = query.where(relationships_alias.meta[k] == v)

    if visited_relationships:
        query = query.where(Relationship.id.notin_(visited_relationships))

    if distance_range != (0.0, 1.0):
        # embedding_distance bewteen the range
        query = query.where(
            text(
                "embedding_distance >= :min_distance AND embedding_distance <= :max_distance"
            )
        ).params(min_distance=distance_range[0], max_distance=distance_range[1])

    if visited_entities:
        query = query.where(Relationship.source_entity_id.in_(visited_entities))

    query = query.order_by(asc("embedding_distance")).limit(limit)

    # Order by embedding distance and apply limit
    relationships = session.exec(query).all()

    print(f"Found {len(relationships)} relationships to rank")

    if len(relationships) <= rank_n:
        relationship_set = set([rel for rel, _ in relationships])
        entity_set = set()
        for r in relationship_set:
            entity_set.add(r.source_entity)
            entity_set.add(r.target_entity)
        return relationship_set, entity_set

    # Fetch degrees if with_degree is True
    if with_degree:
        entity_ids = set()
        for rel, _ in relationships:
            entity_ids.add(rel.source_entity_id)
            entity_ids.add(rel.target_entity_id)
        degrees = fetch_entity_degrees(session, list(entity_ids))
    else:
        degrees = {}

    # calculate the relationship score based on distance and weight
    ranked_relationships = []
    for relationship, embedding_distance in relationships:
        source_in_degree = (
            degrees[relationship.source_entity_id]["in_degree"] if with_degree else 0
        )
        target_out_degree = (
            degrees[relationship.target_entity_id]["out_degree"] if with_degree else 0
        )
        final_score = calculate_relationship_score(
            embedding_distance,
            relationship.weight,
            source_in_degree,
            target_out_degree,
            alpha,
            weight_coefficient_config,
            degree_coefficient,
            with_degree,
        )
        ranked_relationships.append((relationship, final_score))

    # rank relationships based on the calculated score
    ranked_relationships.sort(key=lambda x: x[1], reverse=True)
    relationship_set = set([rel for rel, score in ranked_relationships[:rank_n]])
    entity_set = set()
    for r in relationship_set:
        entity_set.add(r.source_entity)
        entity_set.add(r.target_entity)

    return relationship_set, entity_set


def retrieve_with_weight(
    session: Session,
    query: str,
    embedding: list,
    depth: int = 2,
    include_meta: bool = False,
    with_degree: bool = False,
    # experimental feature to filter relationships based on meta, can be removed in the future
    relationship_meta_filters: Dict = {},
) -> Tuple[list, list, list]:
    if not embedding:
        assert query, "Either query or embedding must be provided"
        embedding = get_query_embedding(query)

    relationships, entities = search_relationships_weight(
        session,
        embedding,
        [],
        [],
        with_degree=with_degree,
        relationship_meta_filters=relationship_meta_filters,
    )

    all_relationships = set(relationships)
    all_entities = set(entities)
    visited_entities = set(e.id for e in entities)
    visited_relationships = set(r.id for r in relationships)

    for _ in range(depth - 1):
        actual_number = 0
        progress = 0
        search_number_each_depth = 10
        for search_config in DEFAULT_RANGE_SEARCH_CONFIG:
            search_ratio = search_config[1]
            search_distance_range = search_config[0]
            remaining_number = search_number_each_depth - actual_number
            # calculate the expected number based search progress
            # It's a accumulative search, so the expected number should be the difference between the expected number and the actual number
            expected_number = (
                int(
                    (search_ratio + progress) * search_number_each_depth - actual_number
                )
                if progress * search_number_each_depth > actual_number
                else int(search_ratio * search_number_each_depth)
            )
            if expected_number > remaining_number:
                expected_number = remaining_number
            if remaining_number <= 0:
                break

            new_relationships, new_entities = search_relationships_weight(
                session,
                embedding,
                visited_relationships,
                visited_entities,
                search_distance_range,
                rank_n=expected_number,
                with_degree=with_degree,
                relationship_meta_filters=relationship_meta_filters,
            )

            all_relationships.update(new_relationships)
            all_entities.update(new_entities)

            visited_entities.update(e.id for e in new_entities)
            visited_relationships.update(r.id for r in new_relationships)
            actual_number += len(new_relationships)
            # seach ratio == 1 won't count the progress
            if search_ratio != 1:
                progress += search_ratio

    synopsis_entities = fetch_similar_entities(
        session, embedding, top_k=2, entity_type=EntityType.synopsis
    )
    all_entities.update(synopsis_entities)

    related_doc_ids = set()
    for r in all_relationships:
        if "doc_id" not in r.meta:
            continue
        related_doc_ids.add(r.meta["doc_id"])

    entities = [
        {
            "id": e.id,
            "name": e.name,
            "description": e.description,
            "meta": e.meta if include_meta else None,
            "entity_type": e.entity_type,
        }
        for e in all_entities
    ]
    relationships = [
        {
            "id": r.id,
            "source_entity_id": r.source_entity_id,
            "target_entity_id": r.target_entity_id,
            "description": r.relationship_desc,
            "rag_description": f"{r.source_entity.name} -> {r.relationship_desc} -> {r.target_entity.name}",
            "meta": r.meta,
            "weight": r.weight,
            "last_modified_at": r.last_modified_at,
        }
        for r in all_relationships
    ]
    chunks = [
        {"text": c[0], "link": c[1], "meta": c[2], "last_modified_at": c[3]}
        for c in session.exec(
            select(Chunk.text, Chunk.doc_id, Chunk.meta, Chunk.last_modified_at).where(
                Chunk.doc_id.in_(related_doc_ids)
            )
        ).all()
    ]
    return entities, relationships, chunks
