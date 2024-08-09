import { type ProviderOption, providerOptionSchema } from '@/api/providers';
import { BASE_URL, buildUrlParams, handleErrors, handleResponse, opaqueCookieHeader, type Page, type PageParams, zodPage } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType, type ZodTypeDef } from 'zod';

export interface LLM {
  id: number;
  name: string;
  provider: string;
  model: string;
  config?: any;
  is_default: boolean;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface LlmOption extends ProviderOption {
  default_llm_model: string;
  llm_model_description: string;
}

export interface CreateLLM {
  name: string;
  provider: string;
  model: string;
  config?: any;
  is_default?: boolean;
  credentials: string | object;
}

const llmSchema = z.object({
  id: z.number(),
  name: z.string(),
  provider: z.string(),
  model: z.string(),
  config: z.any(),
  is_default: z.boolean(),
  created_at: zodJsonDate().nullable(),
  updated_at: zodJsonDate().nullable(),
}) satisfies ZodType<LLM, ZodTypeDef, any>;

const llmOptionSchema = providerOptionSchema.and(z.object({
  default_llm_model: z.string(),
  llm_model_description: z.string(),
})) satisfies ZodType<LlmOption, any, any>;

export async function listLlmOptions () {
  return await fetch(`${BASE_URL}/api/v1/admin/llms/options`, {
    headers: {
      ...await opaqueCookieHeader(),
    },
  })
    .then(handleResponse(llmOptionSchema.array()));
}

export async function listLlms ({ page = 1, size = 10 }: PageParams = {}): Promise<Page<LLM>> {
  return await fetch(BASE_URL + '/api/v1/admin/llms' + '?' + buildUrlParams({ page, size }), {
    headers: await opaqueCookieHeader(),
  })
    .then(handleResponse(zodPage(llmSchema)));
}

export async function getLlm (id: number): Promise<LLM> {
  return await fetch(BASE_URL + `/api/v1/admin/llms/${id}`, {
    headers: await opaqueCookieHeader(),
  }).then(handleResponse(llmSchema));
}

export async function createLlm (create: CreateLLM) {
  return await fetch(BASE_URL + `/api/v1/admin/llms`, {
    method: 'POST',
    body: JSON.stringify(create),
    headers: {
      'Content-Type': 'application/json',
      ...await opaqueCookieHeader(),
    },
  }).then(handleResponse(llmSchema));
}

export async function deleteLlm (id: number) {
  await fetch(BASE_URL + `/api/v1/admin/llms/${id}`, {
    method: 'DELETE',
    headers: await opaqueCookieHeader(),
  }).then(handleErrors);
}

export async function testLlm (createLLM: CreateLLM) {
  return await fetch(`${BASE_URL}/api/v1/admin/llms/test`, {
    method: 'POST',
    body: JSON.stringify(createLLM),
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
