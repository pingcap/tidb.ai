export async function handleErrors (input: Promise<Response> | Response) {
  const response = await input;
  if (!response.ok && response.type !== 'opaqueredirect') {
    const reason = response.clone().json()
      .then(JSON.stringify)
      .catch(() => response.clone().text())
      .catch(() => 'Empty response body]');
    throw new FetchError(response.status, response.statusText, await reason);
  }

  return response;
}

export class FetchError extends Error {
  constructor (public readonly status: number, public readonly statusText: string, public readonly body: string) {
    super(`${status} ${statusText}: ${body}`);
  }
}

