import {LLMRerank} from "@/lib/llamaindex/postprocessors/rerankers/LLMReranker";
import {OpenAI, TextNode} from "llamaindex";
import {NextRequest, NextResponse} from 'next/server';

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

export async function GET (req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get('query') || 'I want a database to replace MySQL.';
  const llm = new OpenAI({
    model: 'gpt-3.5-turbo',
    apiKey: process.env.OPENAI_API_KEY,
  });
  const reranker = new LLMRerank({
    llm
  });

  const nodesWithScores = await reranker.postprocessNodes(testNodes, query);

  return NextResponse.json(nodesWithScores);
}

export const dynamic = 'force-dynamic';
