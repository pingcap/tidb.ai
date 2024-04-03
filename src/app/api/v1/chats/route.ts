import database from '@/core/db';
import type { DB, Namespace } from '@/core/db/schema';
import { rag } from '@/core/interface';
import { genId } from '@/lib/id';
import { formatDate } from 'date-fns';
import type { Selectable } from 'kysely';
import { Liquid, Template } from 'liquidjs';
import { DateTime } from 'luxon';
import { notFound } from 'next/navigation';
import ChatMessage = rag.ChatMessage;

// TODO: Support config if enable recommend namespaces
const ENABLE_RECOMMEND_NAMESPACES = false;

export { GET, POST } from '@/app/api/v2/chats/route';

async function extractAndRefineQuestion (model: rag.ChatModel<any>, query: string, allNamespaces: Namespace[], liquid: Liquid, extractAndRefinePromptTemplate: Template[]) {
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
  const end = DateTime.now();
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
    recommendNamespaces,
  };
}

function namespaceSelector (allNamespaces: Namespace[], specifyNamespaces: string[], recommendNamespaces: string[]) {
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

function deduplicate<T> (array: T[], keyGetter: (item: T) => string): T[] {
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

async function getSystemMessage (liquid: Liquid, answerPromptTemplate: Template[], contexts?: rag.RetrievedContext[]): Promise<ChatMessage> {
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
