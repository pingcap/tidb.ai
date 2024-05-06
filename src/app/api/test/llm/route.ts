import {buildLLM} from "@/lib/llamaindex/builders/llm";
import {LLMConfigSchema} from "@/lib/llamaindex/config/llm";
import {defineHandler} from "@/lib/next/handler";
import {NextResponse} from 'next/server';
import z from 'zod';

export const POST = defineHandler({
  testOnly: true,
  body: z.object({
    query: z.string().default('Give me one reason to use TiDB instead of MySQL!'),
    config: LLMConfigSchema
  })
}, async ({ body }) => {
  const { query, config } = body;
  const llm = await buildLLM(config);
  const res = await llm.chat({
    messages: [
      {
        role: 'system',
        content: 'Keep your answers brief, less than 20 words, emoji is fine.'
      },
      {
        role: 'user',
        content: query
      }
    ],
    stream: false
  });
  return NextResponse.json(res.message);
});

export const dynamic = 'force-dynamic';
