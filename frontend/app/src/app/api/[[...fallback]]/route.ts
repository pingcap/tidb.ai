import type { NextRequest } from 'next/server';

declare global {
  interface RequestInit {
    duplex?: 'half' | boolean;
  }
}

function handler (request: NextRequest) {
  const url = request.nextUrl.clone();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Accept-Encoding', '');
  requestHeaders.set('host', 'tidbai-dev.htapdb.com');
  url.hostname = 'tidbai-dev.htapdb.com';
  url.protocol = 'https';
  url.port = '443';
  return fetch(url, {
    method: request.method,
    headers: requestHeaders,
    body: request.body,
    duplex: request.body instanceof ReadableStream ? 'half' : 'half',
  });
}

export { handler as GET, handler as POST, handler as DELETE, handler as HEAD, handler as PUT, handler as PATCH };

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const maxDuration = 300;
