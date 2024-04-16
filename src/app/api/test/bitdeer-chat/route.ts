import {Bitdeer} from "@/lib/llamaindex/llm/bitdeer";
import {NextRequest, NextResponse} from 'next/server';

export async function GET (req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get('query') || 'Why TiDB is the advanced MySQL alternative?';
  const llm = new Bitdeer({
    model: 'mistral',
    apiSecretAccessKey: process.env.BITDEER_API_SECRET_ACCESS_KEY!
  })
  const res = await llm.chat({
    messages: [
      {
        role: 'system',
        content: 'Keep your answers brief, less than 100 words, emoji is fine.'
      },
      {
        role: 'user',
        content: query
      }
    ],
    stream: false
  });
  return NextResponse.json(res.message);
}

export const dynamic = 'force-dynamic';
