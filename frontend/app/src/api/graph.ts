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
  /**
   * @deprecated
   */
  rag_description: string;
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
  }).nullish()
}) satisfies ZodType<KnowledgeGraphEntity>;

export const relationshipSchema = z.object({
  id: z.number(),
  source_entity_id: z.number(),
  target_entity_id: z.number(),
  description: z.string(),
  rag_description: z.string(),
  meta: z.object({}).passthrough(),
  weight: z.number(),
}) satisfies ZodType<KnowledgeGraphRelationship>;

export const knowledgeGraphSchema = z.object({
  entities: entitySchema.array(),
  relationships: relationshipSchema.array(),
}) satisfies ZodType<KnowledgeGraph>;
