import { handleErrors } from '@/lib/fetch';
import * as MDAst from 'mdast';
import type { UUID } from 'node:crypto';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { is } from 'unist-util-is';
import { visit } from 'unist-util-visit';

export async function getTracedInfo (traceUrl: string) {
  const id = getTraceId(traceUrl);

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

export function extractSourcesFromMarkdown (content: string, sources: Map<string, any>): { kgRelationshipUrls: string[], restUrls: string[] } {
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

export function getTraceId (url: string): UUID {
  return new URL(url).pathname.split('/').slice(-1)[0] as UUID;
}
