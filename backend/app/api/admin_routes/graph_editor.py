from typing import Optional, List
from pydantic import BaseModel, model_validator
from fastapi import APIRouter, HTTPException, status

from app.api.deps import SessionDep
from app.models import (
    EntityPublic,
    RelationshipPublic,
)
from app.rag.knowledge_graph.graph_store import tidb_graph_editor as editor
from app.rag.knowledge_graph.graph_store import TiDBGraphStore
from app.rag.chat_config import get_default_embedding_model


router = APIRouter()


@router.get("/admin/graph/entities/search", response_model=List[EntityPublic])
def search_similar_entities(session: SessionDep, query: str, top_k: int = 10):
    return editor.search_similar_entities(session, query, top_k)


class SynopsisEntityCreate(BaseModel):
    name: str
    description: str
    topic: str
    meta: dict
    entities: List[int]

    @model_validator(mode="after")
    def validate_entities(self):
        if len(self.entities) == 0:
            raise ValueError("Entities list should not be empty")
        return self


@router.post("/admin/graph/entities/synopsis", response_model=EntityPublic)
def create_synopsis_entity(session: SessionDep, request: SynopsisEntityCreate):
    return editor.create_synopsis_entity(
        session,
        request.name,
        request.description,
        request.topic,
        request.meta,
        request.entities,
    )


@router.get("/admin/graph/entities/{entity_id}", response_model=EntityPublic)
def get_entity(session: SessionDep, entity_id: int):
    entity = editor.get_entity(session, entity_id)
    if not entity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entity not found",
        )
    return entity


class EntityUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    meta: Optional[dict] = None


@router.put("/admin/graph/entities/{entity_id}", response_model=EntityPublic)
def update_entity(session: SessionDep, entity_id: int, entity_update: EntityUpdate):
    old_entity = editor.get_entity(session, entity_id)
    if old_entity is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entity not found",
        )
    entity = editor.update_entity(session, old_entity, entity_update.model_dump())
    return entity


@router.get("/admin/graph/entities/{entity_id}/subgraph")
def get_entity_subgraph(session: SessionDep, entity_id: int) -> dict:
    entity = editor.get_entity(session, entity_id)
    if entity is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entity not found",
        )
    relationships, entities = editor.get_entity_subgraph(session, entity)
    return {
        "relationships": relationships,
        "entities": entities,
    }


@router.get(
    "/admin/graph/relationships/{relationship_id}", response_model=RelationshipPublic
)
def get_relationship(session: SessionDep, relationship_id: int):
    relationship = editor.get_relationship(session, relationship_id)
    if relationship is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Relationship not found",
        )
    return relationship


class RelationUpdate(BaseModel):
    description: Optional[str] = None
    meta: Optional[dict] = None
    weight: Optional[int] = None


@router.put(
    "/admin/graph/relationships/{relationship_id}", response_model=RelationshipPublic
)
def update_relationship(
    session: SessionDep, relationship_id: int, relationship_update: RelationUpdate
):
    old_relationship = editor.get_relationship(session, relationship_id)
    if old_relationship is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Relationship not found",
        )
    relationship = editor.update_relationship(
        session, old_relationship, relationship_update.model_dump()
    )
    return relationship


class SearchRequest(BaseModel):
    query: str
    include_meta: bool = True
    depth: int = 2
    with_degree: bool = True


@router.post("/admin/graph/search")
def search_graph(session: SessionDep, request: SearchRequest):
    graph_store = TiDBGraphStore(
        dspy_lm=None,
        session=session,
        embed_model=get_default_embedding_model(session),
    )
    entities, relations, _ = graph_store.retrieve_with_weight(
        request.query,
        [],
        request.depth,
        request.include_meta,
        request.with_degree,
        False,
        {},
    )
    return {
        "entities": entities,
        "relationships": relations,
    }
