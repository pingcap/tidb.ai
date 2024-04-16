import {getEmbedding} from "@/lib/llamaindex/converters/embedding";
import {BitdeerEmbedding, BitdeerEmbeddingModelType} from "@/lib/llamaindex/embeddings/BitdeerEmbedding";
import {baseRegistry} from "@/rag-spec/base";
import {getFlow} from "@/rag-spec/createFlow";
import {NextRequest, NextResponse} from 'next/server';

const flow = await getFlow(baseRegistry);

export async function GET (req: NextRequest) {
  const url = new URL(req.url);
  const input = url.searchParams.get('input') || 'I want a database to replace MySQL.';
  const bitdeerEmbedding = getEmbedding(flow, 'bitdeer', {
    model: BitdeerEmbeddingModelType.MISTRAL_EMBED_LARGE,
    apiSecretAccessKey: process.env.BITDEER_API_SECRET_ACCESS_KEY!
  });

  const embedding = await bitdeerEmbedding.getQueryEmbedding(input);

  return NextResponse.json(embedding);
}

export const dynamic = 'force-dynamic';
