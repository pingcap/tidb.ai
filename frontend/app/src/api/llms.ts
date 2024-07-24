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

export interface LlmOption {
  provider: string;
  default_model: string;
  model_description: string;
  credentials_display_name: string;
  credentials_description: string;
  credentials_type: 'str' | 'dict';
  default_credentials: any;
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

const llmOptionSchema = z.object({
  provider: z.string(),
  default_model: z.string(),
  model_description: z.string(),
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
])) satisfies ZodType<LlmOption>;

export async function listLlmOptions () {
  return await fetch(`${BASE_URL}/api/v1/admin/llm-options`, {
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
