import {
  BASE_URL,
  buildUrlParams,
  handleErrors,
  opaqueCookieHeader,
  handleResponse
} from '@/lib/request';
import { z } from 'zod';

export interface LoginParams {
  username: string;
  password: string;
}

export async function login (params: LoginParams) {
  const usp = buildUrlParams(params);

  await fetch(BASE_URL + '/api/v1/auth/login', {
    method: 'POST',
    body: usp,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(handleErrors);
}

export async function logout () {
  await fetch(BASE_URL + '/api/v1/auth/logout', {
    method: 'POST',
  }).then(handleErrors);
}

export async function createAPIKey () {
  return await fetch(BASE_URL + `/api/v1/create-api-key`, {
    method: 'post',
    body: JSON.stringify({
      "description": "api key"
    }),
    headers: {
      'Content-Type': 'application/json',
      ...await opaqueCookieHeader(),
    },
  }).then(handleResponse(z.object({
    api_key: z.string()
  })));
}