import {getChatEngineConfig} from "@/core/repositories/chat_engine";
import {getIndexByName} from '@/core/repositories/index_';
import {LlamaindexRetrieveService} from '@/core/services/vector-index/retrieving';
import {retrieveOptionsSchema} from '@/core/services/retrieving';
import {buildEmbedding} from "@/lib/llamaindex/builders/embedding";
import {buildLLM} from "@/lib/llamaindex/builders/llm";
import {LLMProvider} from "@/lib/llamaindex/config/llm";
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
    llm: llmConfig = {
      provider: LLMProvider.OPENAI,
      config: {}
    },
  } = engineOptions;

  const flow = await getFlow(baseRegistry);
  const serviceContext = serviceContextFromDefaults({
    llm: await buildLLM(llmConfig),
    embedModel: await buildEmbedding(index.config.embedding),
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

export const maxDuration = 60;
