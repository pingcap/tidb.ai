import { getChat, getChatMessage } from '@/core/repositories/chat';
import { extractSourcesFromMarkdown, getTracedInfo } from '@/core/services/feedback/utils';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  params: z.object({
    id: z.coerce.number(),
    messageId: z.coerce.number(),
  }),
  auth: 'anonymous',
}, async ({ params }) => {
  const chat = await getChat(params.id);
  const message = await getChatMessage(params.messageId);

  if (!chat || !message) {
    notFound();
  }

  // Only support chat with knowledge graph enabled.
  if (!chat.engine_options.graph_retriever?.enable) {
    return Response.json({
      message: 'This conversation does not support knowledge graph feedback. (Knowledge graph not enabled for this conversation)',
    }, { status: 400 });
  }

  if (!message.trace_url) {
    return Response.json({
      message: 'This conversation does not support knowledge graph feedback. (Langfuse link not recorded)',
    }, { status: 400 });
  }

  const { query, sources } = await getTracedInfo(message.trace_url);

  const markdownSources = extractSourcesFromMarkdown(message.content, sources);

  return {
    query,
    markdownSources,
    kgSources: Object.fromEntries(sources.entries()),
  };
});

export const dynamic = 'force-dynamic';

