import { BASE_URL, buildUrlParams, handleErrors, handleResponse, opaqueCookieHeader, type Page, type PageParams, zodPage } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType, type ZodTypeDef } from 'zod';

export interface ApiKey {
  created_at: Date;
  updated_at: Date;
  description: string;
  api_key_display: string;
  is_active: boolean;
  user_id: string;
  id: number;
}

export interface CreateApiKey {
  description: string;
}

export interface CreateApiKeyResponse {
  api_key: string;
}

const apiKeySchema = z.object({
  created_at: zodJsonDate(),
  updated_at: zodJsonDate(),
  description: z.string(),
  api_key_display: z.string(),
  is_active: z.boolean(),
  user_id: z.string(),
  id: z.number(),
}) satisfies ZodType<ApiKey, ZodTypeDef, any>;

const createApiKeyResponseSchema = z.object({
  api_key: z.string(),
}) satisfies ZodType<CreateApiKeyResponse>;

export async function listApiKeys ({ page = 1, size = 10 }: PageParams = {}): Promise<Page<ApiKey>> {
  return await fetch(BASE_URL + '/api/v1/api-keys' + '?' + buildUrlParams({ page, size }), {
    headers: await opaqueCookieHeader(),
  })
    .then(handleResponse(zodPage(apiKeySchema)));
}

export async function createApiKey (create: CreateApiKey): Promise<CreateApiKeyResponse> {
  return await fetch(BASE_URL + '/api/v1/api-keys', {
    method: 'POST',
    headers: {
      ...await opaqueCookieHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(create),
  }).then(handleResponse(createApiKeyResponseSchema));
}

export async function deleteApiKey (id: number): Promise<void> {
  await fetch(BASE_URL + `/api/v1/api-keys/${id}`, {
    method: 'DELETE',
    headers: {
      ...await opaqueCookieHeader(),
    },
  }).then(handleErrors);
}

