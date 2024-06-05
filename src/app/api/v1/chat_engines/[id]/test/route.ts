import {createChat} from "@/core/repositories/chat";
import {getChatEngineByIdOrName} from "@/core/repositories/chat_engine";
import {getIndexByNameOrThrow} from "@/core/repositories/index_";
import {LlamaindexChatService} from "@/core/services/llamaindex/chating";
import { defineHandler } from '@/lib/next/handler';
import {baseRegistry} from "@/rag-spec/base";
import {getFlow} from "@/rag-spec/createFlow";
import {Langfuse} from "langfuse";
import { z } from 'zod';
import { eachOfLimit } from 'async';

const SpecificChatEngineSchema = z.object({
  id: z.string(),
});

const RunTestParamsSchema = z.object({
  index_name: z.string().default('default'),
  dataset_name: z.string(),
  run: z.object({
    name: z.string(),
    description: z.string().optional(),
    metadata: z.record(z.string()).optional(),
  }),
  concurrency: z.number().default(10)
});

export const POST = defineHandler({
  auth: 'admin',
  params: SpecificChatEngineSchema,
  body: RunTestParamsSchema,
}, async ({
  params: { id },
  body: {
    dataset_name,
    index_name,
    concurrency,
    run
  },
}) => {
  const engine = await getChatEngineByIdOrName(id)

  const langfuse = new Langfuse();
  const dataset = await langfuse.getDataset(dataset_name);

  const index = await getIndexByNameOrThrow(index_name);
  const flow = await getFlow(baseRegistry);
  const chatService = new LlamaindexChatService({ flow, index, langfuse });

  await eachOfLimit(dataset.items, concurrency, async (item: any) => {
    const userMessage = item.input;
    const userId = 'tester';
    const title = item.input.length > 255 ? item.input.substring(0, 255) : item.input;
    const chat = await createChat({
      engine: engine.engine,
      engine_id: engine.id,
      engine_name: engine.name,
      engine_options: JSON.stringify(engine.engine_options),
      created_at: new Date(),
      created_by: userId,
      title: title,
    });

    console.log(`[Testing] Testing with question (chat engine: ${id}): ${userMessage}`)
    const chatResult = await chatService.chat(chat.url_key, userId, userMessage, false, false);
    if (chatResult.traceId) {
      await item.link(langfuse.trace({
        id: chatResult.traceId,
      }), run.name, {
        description: run.description,
        metadata: run.metadata
      });
    }
  });
});

export const dynamic = 'force-dynamic';

export const maxDuration = 300;
