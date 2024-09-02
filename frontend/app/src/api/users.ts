import { authenticationHeaders, handleResponse, requestUrl } from '@/lib/request';
import { z } from 'zod';

export interface MeInfo {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  is_active: z.boolean(),
  is_superuser: z.boolean(),
  is_verified: z.boolean(),
});

export async function getMe (): Promise<MeInfo> {
  return await fetch(requestUrl('/api/v1/users/me'), {
    headers: await authenticationHeaders(),
  })
    .then(handleResponse(userSchema));
}
