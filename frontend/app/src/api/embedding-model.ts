import { type ProviderOption, providerOptionSchema } from '@/api/providers';
import { authenticationHeaders, BASE_URL, handleNullableResponse, handleResponse } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType, type ZodTypeDef } from 'zod';

export interface EmbeddingModel {
  id: number;
  name: string;
  provider: string;
  model: string;
  config?: any;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface EmbeddingModelOption extends ProviderOption {
  default_embedding_model: string;
  embedding_model_description: string;
}

export interface CreateEmbeddingModel {
  name: string;
  provider: string;
  model: string;
  config?: any;
  credentials: string | object;
}

const embeddingModelSchema = z.object({
  id: z.number(),
  name: z.string(),
  provider: z.string(),
  model: z.string(),
  config: z.any(),
  created_at: zodJsonDate().nullable(),
  updated_at: zodJsonDate().nullable(),
}) satisfies ZodType<EmbeddingModel, ZodTypeDef, any>;

const embeddingModelOptionSchema = providerOptionSchema.and(z.object({
  default_embedding_model: z.string(),
  embedding_model_description: z.string(),
})) satisfies ZodType<EmbeddingModelOption, any, any>;

export async function listEmbeddingModelOptions () {
  return await fetch(`${BASE_URL}/api/v1/admin/embedding-model/options`, {
    headers: await authenticationHeaders(),
  })
    .then(handleResponse(embeddingModelOptionSchema.array()));
}

export async function getEmbeddingModel () {
  return await fetch(`${BASE_URL}/api/v1/admin/embedding-model`, {
    headers: await authenticationHeaders(),
  })
    .then(handleNullableResponse(embeddingModelSchema));
}

export async function createEmbeddingModel (create: CreateEmbeddingModel) {
  return await fetch(BASE_URL + `/api/v1/admin/embedding-model`, {
    method: 'POST',
    body: JSON.stringify(create),
    headers: {
      'Content-Type': 'application/json',
      ...await authenticationHeaders(),
    },
  }).then(handleResponse(embeddingModelSchema));
}

export async function testEmbeddingModel (createEmbeddingModel: CreateEmbeddingModel) {
  return await fetch(`${BASE_URL}/api/v1/admin/embedding-model/test`, {
    method: 'POST',
    body: JSON.stringify(createEmbeddingModel),
    headers: {
      'Content-Type': 'application/json',
      ...await authenticationHeaders(),
    },
  })
    .then(handleResponse(z.object({
      success: z.boolean(),
      error: z.string().optional(),
    })));
}

