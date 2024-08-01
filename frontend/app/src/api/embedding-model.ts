import { BASE_URL, handleNullableResponse, handleResponse, opaqueCookieHeader } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType, type ZodTypeDef } from 'zod';

export interface EmbeddingModel {
  id: number;
  name: string;
  provider: string;
  model: string;
  config?: any;
  is_default: boolean;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface EmbeddingModelOption {
  provider: string;
  default_embedding_model: string;
  embedding_model_description: string;
  credentials_display_name: string;
  credentials_description: string;
  credentials_type: 'str' | 'dict';
  default_credentials: any;
}

export interface CreateEmbeddingModel {
  name: string;
  provider: string;
  model: string;
  config?: any;
  is_default?: boolean;
  credentials: string | object;
}

const embeddingModelSchema = z.object({
  id: z.number(),
  name: z.string(),
  provider: z.string(),
  model: z.string(),
  config: z.any(),
  is_default: z.boolean(),
  created_at: zodJsonDate().nullable(),
  updated_at: zodJsonDate().nullable(),
}) satisfies ZodType<EmbeddingModel, ZodTypeDef, any>;

const embeddingModelOptionSchema = z.object({
  provider: z.string(),
  default_embedding_model: z.string(),
  embedding_model_description: z.string(),
  credentials_display_name: z.string(),
  credentials_description: z.string(),
}).and(z.discriminatedUnion('credentials_type', [
  z.object({
    credentials_type: z.literal('str'),
    default_credentials: z.string(),
  }),
  z.object({
    credentials_type: z.literal('dict'),
    default_credentials: z.object({}).passthrough(),
  }),
])) satisfies ZodType<EmbeddingModelOption>;

export async function listEmbeddingModelOptions () {
  return await fetch(`${BASE_URL}/api/v1/admin/embedding-model/options`, {
    headers: await opaqueCookieHeader(),
  })
    .then(handleResponse(embeddingModelOptionSchema.array()));
}

export async function getEmbeddingModel () {
  return await fetch(`${BASE_URL}/api/v1/admin/embedding-model`, {
    headers: await opaqueCookieHeader(),
  })
    .then(handleNullableResponse(embeddingModelSchema));
}

export async function createEmbeddingModel (create: CreateEmbeddingModel) {
  return await fetch(BASE_URL + `/api/v1/admin/embedding-model`, {
    method: 'POST',
    body: JSON.stringify(create),
    headers: {
      'Content-Type': 'application/json',
      ...await opaqueCookieHeader(),
    },
  }).then(handleResponse(embeddingModelSchema));
}

export async function testEmbeddingModel (createEmbeddingModel: CreateEmbeddingModel) {
  return await fetch(`${BASE_URL}/api/v1/admin/embedding-model/test`, {
    method: 'POST',
    body: JSON.stringify(createEmbeddingModel),
    headers: {
      'Content-Type': 'application/json',
      ...await opaqueCookieHeader(),
    },
  })
    .then(handleResponse(z.object({
      success: z.boolean(),
      error: z.string().optional(),
    })));
}

