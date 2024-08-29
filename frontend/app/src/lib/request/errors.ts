
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
