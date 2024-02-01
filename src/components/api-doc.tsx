import type { ReactNode } from 'react';

export interface ApiDocProps {
  method: string;
  url: string;
  description: ReactNode;
  request: ApiDocRequestProps[];
  response: ApiDocResponseProps[];
}

export interface ApiDocRequestProps {
  contentType?: string;
  description: ReactNode;
}

export interface ApiDocResponseProps {
  status: number;
  description: ReactNode;
}

export function ApiDoc ({ method, url, description, request, response }: ApiDocProps) {
  return (
    <section>
      <h2><span className={colors[method.toLowerCase()]}>{method}</span> {url}</h2>
      <p>
        {description}
      </p>
      <h3>Request</h3>
      <ul>
        {request.map(req => (
          <li>
            {req.contentType ? <p>
              Content-Type: {req.contentType}
            </p> : undefined}
            <p>{req.description}</p>
          </li>
        ))}
      </ul>
      <h3>Response</h3>
      <ul>
        {response.map(res => (
          <li>
            <p>
              Content-Type: {res.status}
            </p>
            <p>{res.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const colors: Record<string, string> = {
  get: 'bg-green-400 text-white px-2 py-0.5 rounded mr-2',
  post: 'bg-blue-400 text-white px-2 py-0.5 rounded mr-2',
  put: 'bg-blue-400 text-white px-2 py-0.5 rounded mr-2',
  delete: 'bg-red-400 text-white px-2 py-0.5 rounded mr-2',
};
