import { authenticationHeaders, BASE_URL, buildUrlParams, handleResponse } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType } from 'zod';

export interface KnowledgeGraph {
  entities: KnowledgeGraphEntity[];
  relationships: KnowledgeGraphRelationship[];
}

export const enum KnowledgeGraphEntityType {
  original = 'original',
  synopsis = 'synopsis',
}

export interface KnowledgeGraphEntity {
  id: number;
  name: string;
  description: string;
  meta: object;
  entity_type: KnowledgeGraphEntityType;
  synopsis_info?: {
    entities: number[]
    topic: string
  } | null;
}

export interface KnowledgeGraphRelationship {
  id: number;
  source_entity_id: number;
  target_entity_id: number;
  description: string;
  meta: object;
  weight: number;
}

export const entitySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  meta: z.object({}).passthrough(),
  entity_type: z.enum([KnowledgeGraphEntityType.original, KnowledgeGraphEntityType.synopsis]),
  synopsis_info: z.object({
    entities: z.number().array(),
    topic: z.string(),
  }).nullish(),
}) satisfies ZodType<KnowledgeGraphEntity>;

export const relationshipSchema = z.object({
  id: z.number(),
  source_entity_id: z.number(),
  target_entity_id: z.number(),
  description: z.string(),
  last_modified_at: zodJsonDate().nullish(),
  meta: z.object({}).passthrough(),
  weight: z.number(),
}) satisfies ZodType<KnowledgeGraphRelationship>;

export const knowledgeGraphSchema = z.object({
  entities: entitySchema.array(),
  relationships: relationshipSchema.array(),
}) satisfies ZodType<KnowledgeGraph>;

export interface UpdateEntityParams {
  name: string | null;
  description: string | null;
  meta: object | null;
}

export interface CreateSynopsisEntityParams {
  name: string;
  description: string;
  meta: object;
  topic: string;
  entities: number[];
}

export interface UpdateRelationshipParams {
  description: string | null;
  meta: object | null;
  weight: number | null;
}

export interface GraphSearchParams {
  query: string;
  include_meta?: boolean;
  depth?: number;
  with_degree?: boolean;
}

export async function search (params: GraphSearchParams) {
  return await fetch(`${BASE_URL}/api/v1/admin/graph/search`, {
    method: 'post',
    headers: {
      ...await authenticationHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(handleResponse(knowledgeGraphSchema));
}

export async function searchEntity (query: string, top_k: number = 10) {
  return await fetch(`${BASE_URL}/api/v1/admin/graph/entities/search?${buildUrlParams({ query, top_k }).toString()}`, {
    headers: {
      ...await authenticationHeaders(),
    },
  })
    .then(handleResponse(entitySchema.array()));
}

export async function getEntity (id: number) {
  return await fetch(`${BASE_URL}/api/v1/admin/graph/entities/${id}`, {
    headers: {
      ...await authenticationHeaders(),
    },
  })
    .then(handleResponse(entitySchema));
}

export async function updateEntity (id: number, params: UpdateEntityParams) {
  return await fetch(`${BASE_URL}/api/v1/admin/graph/entities/${id}`, {
    method: 'put',
    headers: {
      ...await authenticationHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(handleResponse(entitySchema));
}

export async function createSynopsisEntity (params: CreateSynopsisEntityParams) {
  return await fetch(`${BASE_URL}/api/v1/admin/graph/entities/synopsis`, {
    method: 'post',
    headers: {
      ...await authenticationHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(handleResponse(entitySchema));
}

export async function getEntitySubgraph (id: number) {
  return await fetch(`${BASE_URL}/api/v1/admin/graph/entities/${id}/subgraph`, {
    headers: {
      ...await authenticationHeaders(),
    },
  })
    .then(handleResponse(knowledgeGraphSchema));
}

export async function getRelationship (id: number) {
  return await fetch(`${BASE_URL}/api/v1/admin/graph/relationships/${id}`, {
    headers: {
      ...await authenticationHeaders(),
    },
  })
    .then(handleResponse(relationshipSchema));
}

export async function updateRelationship (id: number, params: UpdateRelationshipParams) {
  return await fetch(`${BASE_URL}/api/v1/admin/graph/relationships/${id}`, {
    method: 'put',
    headers: {
      ...await authenticationHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(handleResponse(relationshipSchema));
}
