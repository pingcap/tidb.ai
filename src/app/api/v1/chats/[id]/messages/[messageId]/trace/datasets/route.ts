import { getChat, getChatMessage } from '@/core/repositories/chat';
import { getTraceId } from '@/core/services/feedback/utils';
import { handleErrors } from '@/lib/fetch';
import type { LangfuseDatasetsResponse } from '@/lib/langfuse/types';
import { defineHandler } from '@/lib/next/handler';
import { Langfuse } from 'langfuse';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  params: z.object({
    id: z.coerce.number(),
    messageId: z.coerce.number(),
  }),
}, async ({ params }) => {
  const chat = await getChat(params.id);
  const message = await getChatMessage(params.messageId);

  if (!chat || !message) {
    notFound();
  }

  if (!message.trace_url) {
    notFound();
  }

  const traceId = getTraceId(message.trace_url);

  const datasets: LangfuseDatasetsResponse = await fetch(`https://us.cloud.langfuse.com/api/public/datasets`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`)}`,
    },
    cache: 'no-cache',
  }).then(handleErrors).then(res => res.json());

  const includedDatasets: string[] = [];
  const client = new Langfuse();

  await Promise.all(datasets.data.map(async dataset => {
    const datasetDetails = await client.getDataset(dataset.name);
    for (let item of datasetDetails.items) {
      if ((item as any).sourceTraceId === traceId) {
        includedDatasets.push(datasetDetails.name);
        break;
      }
    }
  }));

  return includedDatasets;
});
