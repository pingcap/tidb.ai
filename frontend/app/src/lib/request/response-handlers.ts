import { normalizeServerErrors } from '@/lib/request/index';
import { z, ZodType } from 'zod';

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