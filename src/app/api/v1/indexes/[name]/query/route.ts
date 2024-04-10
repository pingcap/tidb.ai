import { LlamaindexRetrieveService } from '@/core/services/llamaindex/retrieving';
import { retrieveOptionsSchema } from '@/core/services/retrieving';
import { getIndexByName } from '@/core/v1/index_';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
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
  const flow = await getFlow(baseRegistry);

  const index = await getIndexByName(params.name);
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

  let id: number | undefined;

  const result = await retrieveService.retrieve(body, {
    onRetrieved: rid => id = rid
  });

  const res = await retrieveService.extendResultDetails(result);

  return {
    queryId: id,
    relevantChunks: res.map(item => ({
      text_content: item.text,
      source_uri: item.document_uri,
      source_name: item.document_name,
      relevance_score: item.relevance_score,
    })),
  };
});

export const dynamic = 'force-dynamic';
