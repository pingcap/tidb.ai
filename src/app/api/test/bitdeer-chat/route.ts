import type {ChatResponse} from "@/core/services/chating";
import {getLLM} from "@/lib/llamaindex/converters/llm";
import {baseRegistry} from "@/rag-spec/base";
import {getFlow} from "@/rag-spec/createFlow";
import {NextRequest, NextResponse} from 'next/server';

const flow = await getFlow(baseRegistry);

export async function GET (req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get('query') || 'Why TiDB is the advanced MySQL alternative?';
  const llm = getLLM(flow, 'bitdeer', {
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
