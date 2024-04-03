import { addImportSources } from '@/jobs/addImportSources';
import { saveDocument } from '@/jobs/saveDocument';
import { adminHandlerGuard } from '@/lib/auth-server';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { type NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';

export { GET } from '@/app/api/v2/documents/route';

export const PUT = adminHandlerGuard(async (req) => {
  const contentType = req.headers.get('Content-Type')?.split(';')[0];

  switch (contentType) {
    case 'text/uri-list':
      await handleUriListV2(req);
      break;
    case 'multipart/form-data':
      await handleMultipart(req);
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
  await addImportSources(uriList);
}

async function handleMultipart (req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  const sourceUri = formData.get('sourceUri');

  if (!(file instanceof Blob)) {
    throw new Error('file is required');
  }
  if (typeof sourceUri !== 'string') {
    throw new Error('sourceUri is required');
  }
  const store = (await getFlow(baseRegistry)).getStorage();

  await saveDocument(store, {
    id: randomUUID(),
    sourceUrl: sourceUri,
    mime: file.type,
    buffer: Buffer.from(await file.arrayBuffer()),
  });
}
