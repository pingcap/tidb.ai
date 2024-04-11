import { LlamaindexRetrieveService } from '@/core/services/llamaindex/retrieving';
import { retrieveOptionsSchema } from '@/core/services/retrieving';
import { getIndex } from '@/core/v1/index_';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { notFound } from 'next/navigation';
import z from 'zod';

export const POST = defineHandler({
  params: z.object({
    id: z.coerce.number().int(),
  }),
  body: retrieveOptionsSchema,
}, async ({
  params,
  body,
}) => {
  const flow = await getFlow(baseRegistry);

  const index = await getIndex(params.id);
  if (!index) {
    notFound();
  }

  const retrieveService = new LlamaindexRetrieveService({
    reranker: {
      provider: 'cohere',
      options: {},
    },
    flow,
    index,
  });

  const result = await retrieveService.retrieve(body);

  return await retrieveService.extendResultDetails(result);
});

export const dynamic = 'force-dynamic';
