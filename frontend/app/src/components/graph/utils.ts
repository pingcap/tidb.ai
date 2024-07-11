import { type KnowledgeGraph, type KnowledgeGraphEntity, type KnowledgeGraphRelationship } from '@/api/graph';

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

export type ServerGraphData = KnowledgeGraph

export type GraphData = {
  entities: Entity[]
  relationships: Relationship[]
  chunks?: unknown[]
}

export function handleServerEntity (serverEntity: KnowledgeGraphEntity): Entity {
  return serverEntity;
}

export function handleServerRelationship ({ source_entity_id, target_entity_id, ...rest }: KnowledgeGraphRelationship): Relationship {
  return ({
    ...rest,
    source: source_entity_id,
    target: target_entity_id,
  });
}

export const handleServerGraph = <T extends {}> ({ entities, relationships, ...rest }: ServerGraphData & T): GraphData & T => {
  return {
    ...rest,
    relationships: relationships.map(handleServerRelationship),
    entities: entities.map(handleServerEntity),
  } as never;
};
