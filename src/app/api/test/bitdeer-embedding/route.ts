import {BitdeerEmbedding, BitdeerEmbeddingModelType} from "@/lib/llamaindex/embeddings/BitdeerEmbedding";
import {NextRequest, NextResponse} from 'next/server';

export async function GET (req: NextRequest) {
  const url = new URL(req.url);
  const input = url.searchParams.get('input') || 'I want a database to replace MySQL.';
  const bitdeerEmbedding = new BitdeerEmbedding({
    model: BitdeerEmbeddingModelType.MISTRAL_EMBED_LARGE,
    apiSecretAccessKey: process.env.BITDEER_API_SECRET_ACCESS_KEY!
  })

  const embedding = await bitdeerEmbedding.getTextEmbedding(input);

  return NextResponse.json(embedding);
}

export const dynamic = 'force-dynamic';
