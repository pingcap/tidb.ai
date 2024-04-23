import {getChatEngineConfig} from "@/core/repositories/chat_engine";
import {getIndexByName} from '@/core/repositories/index_';
import {LlamaindexRetrieveService} from '@/core/services/llamaindex/retrieving';
import {retrieveOptionsSchema} from '@/core/services/retrieving';
import {getEmbedding} from "@/lib/llamaindex/converters/embedding";
import {getLLM} from "@/lib/llamaindex/converters/llm";
import {defineHandler} from '@/lib/next/handler';
import {baseRegistry} from '@/rag-spec/base';
import {getFlow} from '@/rag-spec/createFlow';
import {serviceContextFromDefaults} from "llamaindex";
import {notFound} from 'next/navigation';
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

  const [engine, engineOptions] = await getChatEngineConfig(body.engine);
  const {
    llm: {
      provider: llmProvider = 'openai',
      config: llmConfig = {}
    } = {},
  } = engineOptions;

  const flow = await getFlow(baseRegistry);
  const serviceContext = serviceContextFromDefaults({
    llm: getLLM(flow, llmProvider, llmConfig),
    embedModel: getEmbedding(flow, index.config.embedding.provider, index.config.embedding.config),
  });

  const retrieveService = new LlamaindexRetrieveService({
    metadata_filter: engineOptions.metadata_filter,
    reranker: engineOptions.reranker,
    flow,
    index,
    serviceContext
  });

  const result = await retrieveService.retrieve(body);

  return await retrieveService.extendResultDetails(result);
});

export const dynamic = 'force-dynamic';
