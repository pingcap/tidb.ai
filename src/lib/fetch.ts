export class FetchError extends Error {
  constructor (public readonly status: number, public readonly statusText: string, public readonly body: string) {
    super(`${status} ${statusText}: ${body}`);
  }
}

export async function handleErrors (input: Promise<Response> | Response) {
  const response = await input;
  if (!response.ok) {
    const reason = response.clone().json()
      .then(JSON.stringify)
      .catch(() => response.clone().text())
      .catch(() => 'Empty response body]');
    throw new FetchError(response.status, response.statusText, await reason);
  }

  return response;
}

export type DefaultFetcherParams = [method: string, input: string | URL, params?: Record<string, (string | number) | (string | number)[] | undefined>, body?: any]

export async function fetcher<T> ([method, input, params, body]: DefaultFetcherParams) {
  const usp = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        if (!(value instanceof Array)) {
          usp.set(key, String(value));
        } else {
          value.forEach(v => usp.append(key, String(v)));
        }
      }
    });
  }

  let url: string;

  if (Array.from(usp.keys()).length > 0) {
    if (typeof input === 'string') {
      url = input + '?' + usp.toString();
    } else {
      url = input.toString() + '?' + usp.toString();
    }
  } else {
    url = input.toString();
  }

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }).then(handleErrors).then(res => res.json() as Promise<T>);
}
