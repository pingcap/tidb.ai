import { chat, type ChatResponse } from '@/core/services/chating';
import { createChat, listChats } from '@/core/v1/chat';
import { getIndexByName } from '@/core/v1/index_';
import { createLlamaindexChatProcessor } from '@/jobs/v1/llamaindexChatProcessor';
import { toPageRequest } from '@/lib/database';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { experimental_StreamData, StreamingTextResponse } from 'ai';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const ChatRequest = z.object({
  messages: z.object({
    content: z.string(),
    role: z.string(),
  }).array(),
  sessionId: z.coerce.number().optional(),
  name: z.string().optional(),
  namespaces: z.string().array().optional(),
  index: z.string().optional(),
});

export const POST = defineHandler({
  body: ChatRequest,
  auth: 'anonymous',
}, async ({
  body,
  auth,
}) => {
  if (body.messages.length === 0) {
    if (body.sessionId) {
      return NextResponse.json({
        message: 'Cannot assign sessionId when creating chats.',
      }, { status: 400 });
    }
    return await createChat({
      engine: 'condense-question',
      engine_options: JSON.stringify({}),
      created_at: new Date(),
      created_by: auth.user.id!,
      title: body.name ?? 'Untitled',
    });
  }

  let sessionId = body.sessionId;

  if (!sessionId) {
    const chat = await createChat({
      engine: 'condense-question',
      engine_options: JSON.stringify({}),
      created_at: new Date(),
      created_by: auth.user.id!,
      title: body.name ?? 'Untitled',
    });
    sessionId = chat.id;
  }

  const index = await getIndexByName(body.index ?? 'default');
  if (!index) {
    notFound();
  }
  const flow = await getFlow(baseRegistry);
  const chatProcessor = createLlamaindexChatProcessor(flow);

  const { chat_id, message_ordinal, response } = await chat(index.id, sessionId, auth.user.id!, body.messages.find(m => m.role === 'user')?.content ?? '', chatProcessor);

  return mapResponseToTextStream(chat_id, message_ordinal, response);
});

export const GET = defineHandler({
  auth: 'anonymous',
  searchParams: z.object({
    userId: z.string().optional(),
  }),
}, async ({ auth, request, searchParams }) => {
  let userId: string | undefined;
  if (auth.user.role === 'admin') {
    userId = searchParams.userId ?? auth.user.id;
  } else {
    userId = auth.user.id;
  }

  const { page, pageSize } = toPageRequest(request);

  return NextResponse.json(await listChats({ page, pageSize, userId }));
});

async function mapResponseToTextStream (chat_id: number, message_ordinal: number, responseStream: AsyncGenerator<ChatResponse>) {
  const data = new experimental_StreamData();

  const rs = new ReadableStream({
    pull: async (controller) => {
      try {
        for await (const response of responseStream) {
          controller.enqueue('0:' + JSON.stringify(response.content) + '\n');
          data.append({
            [message_ordinal]: {
              context: response.sources,
              status: response.status,
            },
          });
        }
        await data.close();
      } catch (e) {
        controller.error(e);
      }
      controller.close();
    },
  });

  return new StreamingTextResponse(rs, {
    headers: {
      'X-CreateRag-Session': chat_id.toString(),
    },
  }, data);
}
