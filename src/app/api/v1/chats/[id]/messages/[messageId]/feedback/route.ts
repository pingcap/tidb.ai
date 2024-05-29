import { getChat, getChatMessage } from '@/core/repositories/chat';
import { createKnowledgeGraphFeedback, findKnowledgeGraphFeedback } from '@/core/repositories/knowledge_graph_feedback';
import { KnowledgeGraphClient } from '@/lib/knowledge-graph/client';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler(({
  params: z.object({
    id: z.coerce.number(),
    messageId: z.coerce.number(),
  }),
  auth: 'anonymous',
}), async ({ params, body, auth }) => {
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

  const userId = auth.user.id!;
  return await findKnowledgeGraphFeedback(message.trace_url, userId);
});

export const POST = defineHandler(({
  params: z.object({
    id: z.coerce.number(),
    messageId: z.coerce.number(),
  }),
  body: z.object({
    action: z.enum(['like', 'dislike']),
    sources: z.string().array().min(1).optional(),
  }),
  auth: 'anonymous',
}), async ({ params, body, auth }) => {
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

  const userId = auth.user.id!;
  const feedbacks = await findKnowledgeGraphFeedback(message.trace_url, userId);

  if (!body.sources) {
    // like whole answer

    if (feedbacks.length > 0) {
      return Response.json({
        message: 'Already submitted feedback',
      }, { status: 400 });
    }

    const client = new KnowledgeGraphClient();


    await createKnowledgeGraphFeedback({
      source_url: null,
      created_by: userId,
      trace_url: message.trace_url,
      created_at: new Date(),
      action: body.action,
    });
  } else {
    return Response.json({
      message: 'Not supported yet',
    }, { status: 400 });
  }
});

export const dynamic = 'force-dynamic';
