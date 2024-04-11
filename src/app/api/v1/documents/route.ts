import { createSource } from '@/core/v1/source';
import { adminHandlerGuard } from '@/lib/auth-server';
import { type NextRequest, NextResponse } from 'next/server';

export { GET } from '@/app/api/v2/documents/route';

export const PUT = adminHandlerGuard(async (req) => {
  const contentType = req.headers.get('Content-Type')?.split(';')[0];

  switch (contentType) {
    case 'text/uri-list':
      await handleUriListV2(req);
      break;
    default:
      return new NextResponse(undefined, { status: 406 });
  }

  return NextResponse.json({});
});

export const dynamic = 'force-dynamic';

async function handleUriListV2 (req: NextRequest) {
  const uriList = (await req.text())
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);
  for (let uri of uriList) {
    await createSource({
      type: 'robots',
      url: uri,
      created_at: new Date(),
    });
  }
}
