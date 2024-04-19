import { getIndexByName } from '@/core/repositories/index_';
import { LlamaindexRetrieveService } from '@/core/services/llamaindex/retrieving';
import { retrieveOptionsSchema } from '@/core/services/retrieving';
import { getEmbedding } from '@/lib/llamaindex/converters/embedding';
import { getLLM } from '@/lib/llamaindex/converters/llm';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { serviceContextFromDefaults } from 'llamaindex';
import { notFound } from 'next/navigation';
import z from 'zod';

export const POST = defineHandler({
  params: z.object({
    name: z.string(),
  }),
  body: retrieveOptionsSchema,
}, async ({
  params,
  body,
}) => {
  const index = await getIndexByName(params.name);
  if (!index) {
    notFound();
  }

  const flow = await getFlow(baseRegistry);

  const retrieveService = new LlamaindexRetrieveService({
    reranker: {
      provider: body.reranker?.provider ?? 'cohere',
      options: body.reranker?.options,
    },
    flow,
    index,
    serviceContext: serviceContextFromDefaults({
      llm: getLLM(flow, index.config.llm.provider, index.config.llm.config),
      embedModel: getEmbedding(flow, index.config.embedding.provider, index.config.embedding.config),
    }),
  });

  const result = await retrieveService.retrieve(body);

  return await retrieveService.extendResultDetails(result);
});

export const dynamic = 'force-dynamic';
