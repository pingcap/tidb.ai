import { auth } from '@/app/api/auth/[...nextauth]/auth';
import database from '@/core/db';
import type { DB } from '@/core/db/schema';
import { query } from '@/core/query';
import { genId } from '@/lib/id';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { prompts } from '@/rag-spec/prompts';
import { experimental_StreamData, StreamingTextResponse } from 'ai';
import { formatDate } from 'date-fns';
import type { Selectable } from 'kysely';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const POST = auth(async function POST (req) {
  const userId = req.auth?.user?.id;
  if (!userId) {
    return new NextResponse('Need authorization', { status: 401 });
  }
  const now = new Date();

  const { messages, sessionId } = z.object({
    messages: z.object({ role: z.string(), content: z.string() }).array(),
    sessionId: z.string().optional(),
  }).parse(await req.json());

  if (messages.length === 0) {
    // Create a new empty chat
    const id = genId();
    await database.chat.create({
      id,
      llm: 'openai',
      llm_model: 'gpt-3.5-turbo',
      name: `New chat at ${formatDate(new Date(), 'yyyy-MM-dd HH:mm')}`,
      index_name: 'default',
      created_at: now,
      created_by: userId,
    }, []);

    return NextResponse.json({ id });
  }

  const message = messages.findLast(message => message.role === 'user')!.content;

  let history: Selectable<DB['chat_message']>[];
  let id: string;

  if (sessionId) {
    const chat = await database.chat.getChat(sessionId);
    if (!chat) {
      notFound();
    }
    if (chat.created_by !== userId) {
      return NextResponse.json({ message: 'Not creator of chat' }, { status: 403 });
    }
    history = await database.chat.getHistory(sessionId);
    id = sessionId;
    await database.chat.addMessages([
      { id: genId(), chat_id: id, ordinal: history.length + 1, role: 'user', content: message, created_at: now, finished_at: now },
    ]);
  } else {
    history = [];
    id = genId();
    await database.chat.create({
      id,
      llm: 'openai',
      llm_model: 'gpt-3.5-turbo',
      name: `New chat at ${formatDate(new Date(), 'yyyy-MM-dd HH:mm')}`,
      index_name: 'default',
      created_at: now,
      created_by: userId,
    }, [
      { id: genId(), chat_id: id, ordinal: 0, role: 'user', content: message, created_at: now, finished_at: now },
    ]);
  }

  const flow = getFlow(baseRegistry);

  const { id: queryId, top: data } = (await query('default', {
    text: message,
    top_k: 3,
  }))!;

  const answerId = genId();

  const context = data!.map(item => `> url: ${item.source_uri}\n${item.text_content}`).join('\n\n');

  const model = flow.getChatModel('openai')!;

  const stream = await model.chatStream([
    { role: 'system', content: prompts.system.start({ context }) },
    { role: 'user', content: message },
  ], {
    onStart: async () => {
      await database.chat.addMessages([{
        id: answerId,
        chat_id: id,
        ordinal: history.length + 2,
        role: 'assistant',
        content: '',
        created_at: new Date(),
        index_query_id: queryId,
      }]);
    },
    onCompletion: async completion => {
      await database.chat.updateMessage(answerId, {
        finished_at: new Date(),
        content: completion,
      });
    },
    experimental_streamData: true,
  });

  const contextUris = new Map<string, { title: string, uri: string }>();
  data.forEach(item => {
    contextUris.set(item.source_uri, {
      title: item.source_name,
      uri: item.source_uri,
    });
  });
  const streamData = new experimental_StreamData();
  streamData.append({
    [String(history.length + 2)]: {
      queryId,
      context: Array.from(contextUris.values()),
    },
  });

  await streamData.close();

  return new StreamingTextResponse(stream, {
    headers: {
      'X-CreateRag-Session': id,
    },
  }, streamData);
}) as any;

export const GET = auth(async function GET (req) {
  const userId = req.auth?.user?.id;
  if (!userId) {
    return new NextResponse('Need authorization', { status: 401 });
  }

  return NextResponse.json(await database.chat.listChatsByCreator(userId, 10));
}) as any;

export const dynamic = 'force-dynamic';
