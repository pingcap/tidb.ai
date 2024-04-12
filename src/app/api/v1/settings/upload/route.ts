
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
  // TODO: limit the request.
  const formData = await req.formData();
  const file = formData.get('file');

  if (!(file instanceof Blob)) {
    return NextResponse.json({
      message: 'The file field is required.'
    }, {
      status: 400
    });
  }

  // Prevent the file more than 2MB.
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({
      message: 'File size is too large, limit to 2MB.'
    }, {
      status: 400
    });
  }

  const store = (await getFlow(baseRegistry)).getStorage();
  const url = await store.put(`images/${file.name}`, Buffer.from(await file.arrayBuffer()), false);

  return NextResponse.json({
    url: url
  });
}

export const dynamic = 'force-dynamic';
