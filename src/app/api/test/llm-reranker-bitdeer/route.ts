import {Bitdeer} from "@/lib/llamaindex/llm/bitdeer";
import {LLMRerank} from "@/lib/llamaindex/postprocessors/rerankers/LLMReranker";
import {PromptTemplate} from "@/lib/llamaindex/prompts/defaultPrompts";
import {TextNode} from "llamaindex";
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

const bitdeerChoiceSelectPrompt: PromptTemplate = ({ queryStr, contextStr }): string => {
  return `A list of documents is shown below. Each document has a number next to it along 
with a summary of the document. A question is also provided. \n
Respond with the numbers of the documents 
you should consult to answer the question, in order of relevance, as well \n
as the relevance score. The relevance score is a number from 1-10 based on 
how relevant you think the document is to the question.\n
Do not include any documents that are not relevant to the question. \n
Example format (MUST output the "Answer" with the following format): \n
Document 1:\n<summary of document 1>\n\n
Document 2:\n<summary of document 2>\n\n
...\n\n
Document 10:\n<summary of document 10>\n\n
Question: <question>\n
Answer:\n
Doc: 9, Relevance: 7\n
Doc: 3, Relevance: 4\n
Doc: 7, Relevance: 3\n\n
Let's try this now: \n\n
${contextStr}\n
Question: ${queryStr}\n
Answer:\n
`
}

export async function GET (req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get('query') || 'I want a database to replace MySQL.';
  const llm = new Bitdeer({
    model: 'mistral',
    apiSecretAccessKey: process.env.BITDEER_API_SECRET_ACCESS_KEY!
  })
  const reranker = new LLMRerank({
    llm,
    choiceSelectPrompt: bitdeerChoiceSelectPrompt,
  });

  const nodesWithScores = await reranker.postprocessNodes(testNodes, query);

  return NextResponse.json(nodesWithScores);
}

export const dynamic = 'force-dynamic';
