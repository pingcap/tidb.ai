import { authenticationHeaders, BASE_URL, buildUrlParams, handleErrors } from '@/lib/request';

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
      ...await authenticationHeaders(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(handleErrors);
}

export async function logout () {
  await fetch(BASE_URL + '/api/v1/auth/logout', {
    headers: {
      ...await authenticationHeaders(),
    },
    method: 'POST',
  }).then(handleErrors);
}
