import {buildEmbedding} from "@/lib/llamaindex/builders/embedding";
import {EmbeddingConfigSchema} from "@/lib/llamaindex/config/embedding";
import {defineHandler} from "@/lib/next/handler";
import {NextResponse} from 'next/server';
import z from 'zod';

export const POST = defineHandler({
  testOnly: true,
  body: z.object({
    text: z.string().default('I want a database to replace MySQL.'),
    config: EmbeddingConfigSchema
  })
},async ({
  body
}) => {
  const { text, config } = body;
  const bitdeerEmbedding = await buildEmbedding(config);
  const embedding = await bitdeerEmbedding.getQueryEmbedding(text);
  return NextResponse.json(embedding);
});

export const dynamic = 'force-dynamic';
