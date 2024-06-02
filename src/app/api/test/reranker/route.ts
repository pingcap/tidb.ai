import {buildLLM} from "@/lib/llamaindex/builders/llm";
import {buildReranker} from "@/lib/llamaindex/builders/reranker";
import {LLMConfigSchema} from "@/lib/llamaindex/config/llm";
import {RerankerConfigSchema} from "@/lib/llamaindex/config/reranker";
import {defineHandler} from "@/lib/next/handler";
import {serviceContextFromDefaults, TextNode} from "llamaindex";
import {NextResponse} from 'next/server';
import {z} from "zod";

const testNodes: any[] = [
  {
    node: new TextNode({
      id_: '101',
      text: 'Redis is an in-memory data structure store.',
    })
  },
  {
    node: new TextNode({
      id_: '102',
      text: 'TiDB is a distributed, MySQL-compatible database.',
    })
  },
  {
    node: new TextNode({
      id_: '103',
      text: 'Elasticsearch is a distributed, RESTful search and analytics engine.',
    })
  },
  {
    node: new TextNode({
      id_: '104',
      text: 'Neo4j is a graph database management system.',
    })
  },
  {
    node: new TextNode({
      id_: '105',
      text: 'MongoDB is a cross-platform document-oriented database program.',
    })
  },
  {
    node: new TextNode({
      id_: '106',
      text: 'Cassandra is a distributed NoSQL database management system.',
    })
  },
  {
    node: new TextNode({
      id_: '107',
      text: 'PostgreSQL is a powerful, open-source object-relational database system.',
    })
  },
  {
    node: new TextNode({
      id_: '108',
      text: 'SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.',
    })
  },
  {
    node: new TextNode({
      id_: '109',
      text: 'MariaDB is a community-developed, commercially supported fork of the MySQL relational database management system.',
    })
  }
];

export const POST = defineHandler({
  testOnly: true,
  body: z.object({
    query: z.string().default('I want a database to replace MySQL.'),
    config: RerankerConfigSchema,
    llmConfig: LLMConfigSchema.optional(),
    top_k: z.number().int().default(5)
  })
}, async ({
  body
}) => {
  const { query, config, llmConfig, top_k } = body;
  const llm = llmConfig ? buildLLM(llmConfig) : undefined;
  const serviceContext = serviceContextFromDefaults({
    llm: llm
  })
  const reranker = await buildReranker(serviceContext, config, top_k);

  const nodesWithScores = await reranker.postprocessNodes(testNodes, query);

  return NextResponse.json(nodesWithScores);
});

export const dynamic = 'force-dynamic';
