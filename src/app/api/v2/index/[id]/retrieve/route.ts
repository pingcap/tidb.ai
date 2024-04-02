import { extendRetrieveResultDetails, retrieve, retrieveOptionsSchema } from '@/core/services/retrieving';
import { createLlamaindexRetrieveProcessor } from '@/jobs/v1/llamaindexRetrieveProcessor';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
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

  const processor = createLlamaindexRetrieveProcessor(flow);

  const result = await retrieve(params.id, body, processor);

  return await extendRetrieveResultDetails(result);
});

export const dynamic = 'force-dynamic';
