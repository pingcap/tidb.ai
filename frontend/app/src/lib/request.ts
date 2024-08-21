import { z, ZodType } from 'zod';

let BASE_URL: string;

if (typeof process.env.BASE_URL !== 'undefined') {
  BASE_URL = process.env.BASE_URL;
} else {
  BASE_URL = '';
}

export function buildUrlParams (object: object) {
  const usp = new URLSearchParams();

  for (let key of Object.keys(object)) {
    const value = (object as any)[key];

    if (value == null) {
      continue;
    }

    if (value instanceof Array) {
      for (let item of value) {
        usp.append(key, String(value));
      }
    } else {
      usp.append(key, String(value));
    }
  }

  return usp;
}

export async function handleErrors (responseOrPromise: Response | PromiseLike<Response>): Promise<Response> {
  const response = await responseOrPromise;
  if (response.ok) {
    return response;
  }

  try {
    const jsonBody = await response.clone().json();
    return Promise.reject(normalizeServerErrors(response, jsonBody));
  } catch {
    try {
      const textBody = await response.clone().text();
      return Promise.reject(normalizeServerErrors(response, textBody));
    } catch {
      return Promise.reject(normalizeServerErrors(response, `${response.status} ${response.statusText}`));
    }
  }
}

export function handleResponse<S extends ZodType> (schema: S): ((responseOrPromise: Response | PromiseLike<Response>) => Promise<z.infer<S>>) {
  return async (responseOrPromise) => {
    const response = await Promise.resolve(responseOrPromise).then(handleErrors);
    const body = await response.json();

    try {
      return schema.parse(body);
    } catch (e) {
      console.error(e);
      console.error(`Cannot parse response json data for ${response.url} ${response.status}, check your frontend and backend versions.`, e);
      throw e;
    }
  };
}

export function handleNullableResponse<S extends ZodType> (schema: S): ((responseOrPromise: Response | PromiseLike<Response>) => Promise<z.infer<S> | null>) {
  return async (responseOrPromise) => {
    const response = await responseOrPromise;

    if (response.status === 404) {
      return null;
    }

    await handleErrors(response);
    const body = await response.json();

    try {
      return schema.parse(body);
    } catch (e) {
      console.error(e);
      console.error(`Cannot parse response json data for ${response.url} ${response.status}, check your frontend and backend versions.`, 2);
      throw e;
    }
  };
}

export class ServerError extends Error {
  constructor (readonly response: Response, message: string) {
    if (response.headers.get('Content-Type')?.includes('text/html') || message.trimStart().startsWith('<!DOCTYPE') || message.trimStart().startsWith('<html')) {
      message = `${response.status} ${response.statusText} HTML Error Page`;
    }
    super(message);
  }
}

export function isServerError (error: unknown, status?: number | number[]): error is ServerError {
  if (error instanceof ServerError) {
    if (status) {
      if (typeof status === 'number') {
        return error.response.status === status;
      } else {
        return status.includes(error.response.status);
      }
    }
  }

  return false;
}

export function normalizeServerErrors (response: Response, error: unknown): ServerError {
  if (error == null) {
    return new ServerError(response, 'No error detail');
  }

  if (typeof error === 'object') {
    if ('detail' in error && error.detail != null) {
      if (typeof error.detail === 'string') {
        return new ServerError(response, error.detail);
      }
      if (error.detail instanceof Array && error.detail[0] != null) {
        return new ServerError(response, error.detail[0].msg ?? String(error.detail[0]));
      }
    }
    if ('message' in error) {
      return new ServerError(response, String(error.message));
    }
  }

  console.error(error);

  return new ServerError(response, String(error));
}

export interface PageParams {
  page?: number; // 1 based
  size?: number;
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export function zodPage<Z extends ZodType> (itemSchema: Z) {
  return z.object({
    items: itemSchema.array(),
    total: z.number(),
    page: z.number(),
    size: z.number(),
    pages: z.number(),
  });
}

export async function authenticationHeaders (): Promise<Record<string, string>> {
  const { cookies } = await import('next/headers');
  try {
    const k = cookies();

    return { Cookie: k.toString() }; // Only work on rsc;
  } catch {
    return {};
  }
}

export { BASE_URL };