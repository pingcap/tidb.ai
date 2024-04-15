import { LlamaindexRetrieveService } from '@/core/services/llamaindex/retrieving';
import { retrieveOptionsSchema } from '@/core/services/retrieving';
import {getIndexByName} from '@/core/repositories/index_';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { notFound } from 'next/navigation';
import z from 'zod';

export const POST = defineHandler({
  params: z.object({
    name: z.string()
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
    // TODO: support llm reranker
    reranker: {
      provider: 'cohere',
      options: {},
    },
    flow,
    index,
    serviceContext: {} as any
  });

  const result = await retrieveService.retrieve(body);

  return await retrieveService.extendResultDetails(result);
});

export const dynamic = 'force-dynamic';
