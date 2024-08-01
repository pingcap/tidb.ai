import { BASE_URL, handleResponse, opaqueCookieHeader } from '@/lib/request';
import { z } from 'zod';

export interface SystemCheck {
  has_default_llm: boolean;
  has_default_embedding_model: boolean;
  has_datasource: boolean;
}

const systemCheckSchema = z.object({
  has_default_llm: z.boolean(),
  has_default_embedding_model: z.boolean(),
  has_datasource: z.boolean(),
});

export async function getSystemCheck (): Promise<SystemCheck> {
  return await fetch(`${BASE_URL}/api/v1/system/check`, {
    headers: {
      ...await opaqueCookieHeader(),
    },
  }).then(handleResponse(systemCheckSchema));
}

export function isSystemCheckPassed (systemCheck: SystemCheck): boolean {
  return Object.values(systemCheck).reduce((res, flag) => res && flag, true);
}
