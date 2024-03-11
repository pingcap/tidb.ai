import { auth } from '@/app/api/auth/[...nextauth]/auth';
import database from '@/core/db';
import type {DB, Namespace} from '@/core/db/schema';
import { retrieval } from '@/core/retrieval';
import { toPageRequest } from '@/lib/database';
import { genId } from '@/lib/id';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { experimental_StreamData, StreamingTextResponse } from 'ai';
import { formatDate } from 'date-fns';
import type { Selectable } from 'kysely';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import {z} from 'zod';
import db from "@/core/db";
import {rag} from "@/core/interface";
import {Liquid} from "liquidjs";
import {DateTime} from "luxon";
import ChatMessage = rag.ChatMessage;

const ChatRequest = z.object({
  messages: z.object({ role: z.string(), content: z.string() }).array(),
  sessionId: z.string().optional(),
  name: z.string().optional(),
  namespaces: z.string().array().optional(),
});

// TODO: Support config if enable recommend namespaces
const ENABLE_RECOMMEND_NAMESPACES = true;

const liquid = new Liquid();

// TODO: Move to config.
const extractAndRefinePromptTemplateConfig = `
You need to find out if user's message contains a question or not.

- If user's message contains a question, extract and refine it. output \`containsQuestion\` = true, \`question\` as refined question.
- If user's message contains no question, output \`containsQuestion\` = false.
{% if recommendNamespaces %}
- If the candidateNamespaces is required, output their names into \`recommendNamespaces\` array.
- If user's message is only related to a specify domain of knowledge (e.g. specific product, specific language, or specific version ...),
    select the correspond name of namespaces from the rest \`candidateNamespaces\` and append them into \`recommendNamespaces\`.
    
candidateNamespaces: {{ candidateNamespaces | json }}
{% endif recommendNamespaces %}

{% if recommendNamespaces %}
Response in JSON format { containsQuestion, recommendNamespaces?: string[], question? }
{% else %}
Response in JSON format { containsQuestion, question? }
{% endif %}
`;

const extractAndRefinePromptTemplate = liquid.parse(extractAndRefinePromptTemplateConfig);

const answerPromptTemplateConfig = `
Use the following pieces of context to answer the user question. This context retrieved from a knowledge base and you should use only the facts from the context to answer.
Your answer must be based on the context. If the context not contain the answer, just say that 'I don't know', don't try to make up an answer, use the context.

<contexts>
  {%- for context in contexts %}
    <context source_uri="{{ context.source_uri }}" name="{{ context.source_name }}">
      <name>{{ context.source_name }}</name>
      <source_uri>{{ context.source_uri }}</source_uri>
      <content>{{ context.text_content }}</content>
    </context>
  {%- endfor %}
</contexts>

Your answer must be based on the context and previous messages, don't use your own knowledge.

Use markdown to answer. Write down uri reference you used for answer the question.
`;

const answerPromptTemplate = liquid.parse(answerPromptTemplateConfig);

export const POST = auth(async function POST (req) {
  const userId = req.auth?.user?.id;
  if (!userId) {
    return new NextResponse('Need authorization', { status: 401 });
  }

  const {
    name,
    messages,
    sessionId,
    namespaces: specifyNamespaces = []
  } = ChatRequest.parse(await req.json());

  // Create session request
  if (messages.length === 0) {
    if (sessionId) {
      return NextResponse.json({
        message: 'Cannot assign sessionId when creating chats.',
      }, { status: 400 });
    }

    const id = await createSession(name, userId);
    return NextResponse.json({ id });
  }

  // Notice: Only answering the last message for now.
  // TODO: Support answering with the conversation history.
  const message = messages.findLast(message => message.role === 'user')!.content;

  const { id, history } = await appendMessage(name, sessionId, message, userId);
  const index = (await database.index.findByName('default'))!;
  const allNamespaces = await db.namespace.listNamespaces();
  const flow = await getFlow(baseRegistry, undefined, index.config);
  const model = flow.getChatModel('openai');

  // 1. Extract question from message (get question)
  const { question, recommendNamespaces = [] } = await extractAndRefineQuestion(model, message, allNamespaces);

  // 2. Determine namespaces based on question (get namespaces)
  const namespaces = namespaceSelector(allNamespaces, specifyNamespaces, recommendNamespaces);

  // 3. Execute embedding search within the specify / recommend namespaces (get context)
  const { queryId, relevantChunks } = await retrieval('default', index.llm, {
    text: question,
    top_k: 5,
    namespaces
  });

  // 4. Generate prompt with context (get prompt)
  const systemMessage = await getSystemMessage(relevantChunks);

  // 5. Call the LLM model to generate the answer (get answer)
  const answerId = genId();
  const stream = await model.chatStream([
    systemMessage,
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
        index_query_id: queryId || null,
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

  // Output the relevant document chunks to the user.
  const streamData = new experimental_StreamData();
  if (Array.isArray(relevantChunks) && relevantChunks.length > 0) {
    const context = deduplicate(relevantChunks, item => item.source_uri)
      .map((item) => ({
        title: item.source_name,
        uri: item.source_uri,
      }));

    streamData.append({
      [String(history.length + 2)]: {
        queryId,
        context,
      },
    });
  }
  await streamData.close();

  // Output the LLM response to the user.
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

  const { page, pageSize } = toPageRequest(req);

  return NextResponse.json(await database.chat.listChats({ page, pageSize, userId }));
}) as any;

async function extractAndRefineQuestion (model: rag.ChatModel<any>, query: string, allNamespaces: Namespace[]) {
  const extractAndRefinePrompt = await liquid.render(extractAndRefinePromptTemplate, {
    recommendNamespaces: ENABLE_RECOMMEND_NAMESPACES,
    candidateNamespaces: allNamespaces.map(namespace => {
      return { name: namespace.name, description: namespace.description };
    }),
  });

  console.log('Start extract and refine question.');
  const start = DateTime.now();
  const response = await model.chat([
    { role: 'assistant', content: extractAndRefinePrompt },
    { role: 'user', content: query },
  ]);
  const end = DateTime.now()
  const costTime = end.diff(start, 'milliseconds').milliseconds;
  const { containsQuestion, question, recommendNamespaces = [] } = JSON.parse(response.content);
  console.log('Finished extract and refine question.', {
    containsQuestion,
    question,
    recommendNamespaces,
    costTime,
  });

  return {
    containsQuestion,
    question,
    recommendNamespaces
  };
}

function namespaceSelector(allNamespaces: Namespace[], specifyNamespaces: string[], recommendNamespaces: string[]) {
  const defaultNamespaces = allNamespaces.filter(namespace => namespace.default).map(namespace => namespace.name);
  const commonNamespaces = allNamespaces.filter(namespace => namespace.common).map(namespace => namespace.name);

  if (specifyNamespaces && specifyNamespaces.length > 0) {
    console.log('Using specified namespaces:', specifyNamespaces);
    return specifyNamespaces;
  } else if (recommendNamespaces && recommendNamespaces.length > 0) {
    const mergedNamespaces = deduplicate([...recommendNamespaces, ...commonNamespaces, ...defaultNamespaces], item => item);
    console.log('Using recommend namespaces:', mergedNamespaces);
    return mergedNamespaces;
  } else {
    console.log('Using default namespaces:', defaultNamespaces);
    return defaultNamespaces;
  }
}

function deduplicate<T>(array: T[], keyGetter: (item: T) => string): T[] {
  let result: T[] = [];
  let keySet = new Set<string>();

  array.forEach((item) => {
    let key = keyGetter(item);
    if (!keySet.has(key)) {
      keySet.add(key);
      result.push(item);
    }
  });

  return result;
}

async function getSystemMessage(contexts: rag.RetrievedContext[]): Promise<ChatMessage> {
  const content = await liquid.render(answerPromptTemplate, { contexts });
  return {
    role: 'system',
    content,
  };
}

async function createSession (name: string | undefined, userId: string) {
  // Create a new empty chat
  const id = genId();
  await database.chat.create({
    id,
    llm: 'openai',
    llm_model: 'gpt-3.5-turbo',
    name: name?.slice(0, 64) ?? `New chat at ${formatDate(new Date(), 'yyyy-MM-dd HH:mm')}`,
    index_name: 'default',
    created_at: new Date(),
    created_by: userId,
  }, []);

  return id;
}

async function appendMessage (name: string | undefined, sessionId: string | undefined, message: string, userId: string) {
  const now = new Date();
  let history: Selectable<DB['chat_message']>[];
  let id: string;

  if (sessionId) {
    const chat = await database.chat.getChat(sessionId);
    if (!chat) {
      notFound();
    }
    if (chat.created_by !== userId) {
      notFound();
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
      name: name?.slice(0, 64) ?? message.slice(0, 63),
      index_name: 'default',
      created_at: now,
      created_by: userId,
    }, [
      { id: genId(), chat_id: id, ordinal: 0, role: 'user', content: message, created_at: now, finished_at: now },
    ]);
  }

  return { id, history };
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
