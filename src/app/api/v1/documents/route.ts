import { listDocuments } from '@/core/repositories/document';
import {createSource} from "@/core/repositories/source";
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';
import {type NextRequest, NextResponse} from "next/server";

export const GET = defineHandler({
  auth: 'admin',

}, async ({ request }) => {
  return await listDocuments(toPageRequest(request));
});

export const PUT = defineHandler({
  auth: 'admin',
},  async ({ request}) => {
  const contentType = request.headers.get('Content-Type')?.split(';')[0];

  switch (contentType) {
    case 'text/uri-list':
      await handleUriListV2(request);
      break;
    default:
      return new NextResponse(undefined, { status: 406 });
  }

  return NextResponse.json({});
});

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

export const dynamic = 'force-dynamic';
