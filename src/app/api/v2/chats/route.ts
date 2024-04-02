import { getIndexByName } from '@/core/v1/index_';
import { getOptionalEnv } from '@/lib/env';
import { createVectorStoreIndex } from '@/lib/llamaindex/converters/indices';
import { defineHandler } from '@/lib/next/handler';
import { CohereRerank, CondenseQuestionChatEngine, SubQuestionQueryEngine } from 'llamaindex';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const ChatRequest = z.object({
  messages: z.object({ role: z.string(), content: z.string() }).array(),
  sessionId: z.string().optional(),
  name: z.string().optional(),
  namespaces: z.string().array().optional(),
  index: z.string().optional(),
});

export const POST = defineHandler({
  body: ChatRequest,
  auth: 'user',
}, async ({
  body,
}) => {
  const index = await getIndexByName(body.index ?? 'default');
  if (!index) {
    notFound();
  }

  const vsi = await createVectorStoreIndex(index.id);

  const engine = new CondenseQuestionChatEngine({
    queryEngine: vsi.asQueryEngine({
      nodePostprocessors: [
        new CohereRerank({ apiKey: getOptionalEnv('COHERE_TOKEN') ?? null }),
      ],
    }),
    chatHistory: [],
  });

  engine.chat({
    stream: true,
    message: ''
  })
});