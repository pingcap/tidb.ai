import type { KnowledgeGraph, KnowledgeGraphEntity, KnowledgeGraphRelationship } from '@/api/graph';

export type Entity = {
  id: number | string
  name: string
  description: string
  meta: any
  created_at?: string
  updated_at?: string
  entity_type: string
  synopsis_info?: {
    entities: number[]
    topic: string
  } | null
}

export type Relationship = {
  id: number | string
  source: number | string
  target: number | string
  meta: any
  description: string
  weight: number
}

export type ServerEntity = KnowledgeGraphEntity;

export type ServerRelationship = KnowledgeGraphRelationship;

export type ServerGraphData = KnowledgeGraph

export type GraphData = {
  entities: Entity[]
  relations: Relationship[]
  chunks?: unknown[]
}

export const EMPTY_GRAPH: GraphData = {
  entities: [],
  relations: [],
};

export async function createSynopsisEntity (data: { name: string, description: string, topic: string, meta: any, entities: number[] }): Promise<Entity> {
  return await fetch(`/api/v1/indexes/graph/entities/synopsis`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse);
}

export async function editEntity (id: any, data: any): Promise<Entity> {
  return await fetch(`/api/v1/indexes/graph/entities/${encodeURIComponent(id)}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse);
}

export async function editRelationship (id: any, data: any): Promise<Relationship> {
  return await fetch(`/api/v1/indexes/graph/relationships/${encodeURIComponent(id)}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse);
}

export async function getEntity (id: any): Promise<Entity> {
  return await fetch(`/api/v1/indexes/graph/entities/${encodeURIComponent(id)}`, {})
    .then(handleResponse);
}

export async function getRelationship (id: any): Promise<Relationship> {
  return await fetch(`/api/v1/indexes/graph/relationships/${encodeURIComponent(id)}`, {})
    .then(handleResponse)
    .then((relationship: Relationship) => {
      return relationship;
    });
}

const handleResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json();
};

export function handleServerEntity (serverEntity: ServerEntity): Entity {
  return serverEntity;
}

export function handleServerRelationship ({ source_entity_id, target_entity_id, ...rest }: ServerRelationship): Relationship {
  return ({
    ...rest,
    source: source_entity_id,
    target: target_entity_id,
  });
}

export const handleServerGraph = <T extends {}> ({ entities, relations, ...rest }: ServerGraphData & T): GraphData & T => {
  return {
    ...rest,
    relations: relations.map(handleServerRelationship),
    entities: entities.map(handleServerEntity),
  } as never;
};
