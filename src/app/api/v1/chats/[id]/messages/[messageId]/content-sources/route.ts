import { getChat, getChatMessage } from '@/core/repositories/chat';
import { handleErrors } from '@/lib/fetch';
import { defineHandler } from '@/lib/next/handler';
import * as MDAst from 'mdast';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { is } from 'unist-util-is';
import { visit } from 'unist-util-visit';
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

async function getTracedInfo (traceUrl: string) {
  const id = new URL(traceUrl).pathname.split('/').slice(-1)[0];

  const response = await fetch(`https://us.cloud.langfuse.com/api/public/traces/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`)}`,
    },
    cache: 'no-cache',
  }).then(handleErrors);

  const trace = await response.json();

  const { input, output } = trace.observations.find((observation: any) => observation.name === 'knowledge-graph-retrieval')!;

  const query = input;
  const { relationships } = output;

  const sources = new Map<string, { id: number }>(relationships.map((r: any) => [r.meta.doc_id, r]));

  return {
    query,
    sources,
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .freeze();

function extractSourcesFromMarkdown (content: string, sources: Map<string, any>): { kgRelationshipUrls: string[], restUrls: string[] } {
  const restUrls = new Set<string>();
  const urls = new Set<string>();
  const ast = processor.parse({ value: content });

  const check = (url: string) => {
    if (sources.has(url)) {
      urls.add(url);
    } else {
      restUrls.add(url);
    }
  };

  visit(ast, (node: MDAst.Nodes) => {
    if (is(node, 'link')) {
      check(node.url);
    }
  });

  return {
    kgRelationshipUrls: Array.from(urls),
    restUrls: Array.from(restUrls),
  };
}

export const dynamic = 'force-dynamic';

