import { getChat, getChatMessage } from '@/core/repositories/chat';
import { getTraceId } from '@/core/services/feedback/utils';
import { handleErrors } from '@/lib/fetch';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  params: z.object({
    id: z.coerce.number(),
    messageId: z.coerce.number(),
    key: z.enum(['knowledge-graph-retrieval']),
  }),
  auth: 'anonymous',
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

  const trace = await fetch(`https://us.cloud.langfuse.com/api/public/traces/${traceId}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`)}`,
    },
    cache: 'no-cache',
  }).then(handleErrors).then(res => res.json());

  const span = trace.observations.find((observation: any) => observation.name === params.key)!;

  if (!span) {
    notFound();
  }
  return span;
});
