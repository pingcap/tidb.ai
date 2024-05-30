import type {KGRetrievalResult} from "@/core/services/knowledge-graph/retrieving";
import {Relationship} from "@/lib/knowledge-graph/client";
import {promptParser} from "@/lib/llamaindex/prompts/PromptParser";
import {
  BaseOutputParser, buildToolsText,
  LLM,
  PromptMixin,
  Settings, StructuredOutput,
  SubQuestionOutputParser,
} from "llamaindex";
import {BaseQuestionGenerator, SubQuestion} from "llamaindex/engines/query/types";
import {ToolMetadata} from "llamaindex/types";

const exampleTools: ToolMetadata[] = [
  {
    name: "tidb_rag",
    description: "Provides documents about TiDB Serverless",
  },
  {
    name: "tidb_knowledge_graph",
    description: "Provides knowledge graph and documents about TiDB Serverless",
  },
];

const exampleRelationships: Relationship[] = [
  {
    id: 1001,
    source_entity_id: 101,
    target_entity_id: 102,
    description: 'TiDB Serverless User can not upgrade the version of TiDB Serverless, which will be upgraded automatically as PingCAP Teamm roll out new TiDB versions on TiDB Cloud.',
    rag_description: 'TiDB Serverless User -> TiDB Serverless User can not upgrade the version of TiDB Serverless, which will be upgraded automatically as PingCAP Teamm roll out new TiDB versions on TiDB Cloud.  -> TiDB Serverless',
    meta: {
      doc_id: 'https://docs.pingcap.com/tidb/stable/overview/',
    }
  }
];

const exampleQueryStr = `Upgrade TiDB Serverless to 7.4 or latest for enhanced MySQL 8.0 compatibility`;

const exampleOutput: SubQuestion[] = [
  {
    subQuestion: "Can I upgrade TiDB Serverless to version 7.4 or latest?",
    toolName: "tidb_rag",
  },
  {
    subQuestion: "Does the TiDB Serverless Team have any plans to upgrade TiDB Serverless to version 7.4 or latest?",
    toolName: "tidb_knowledge_graph",
  },
  {
    subQuestion: "What is the current version of TiDB Serverless?",
    toolName: "tidb_knowledge_graph",
  }
];

export const defaultKGBasedSubQuestionPrompt = ({ relationships = [], toolsStr = "", queryStr = "" }: Record<any, any>) => {
  return `Given a user question, and a list of tools, output a list of relevant sub-questions that when composed can help answer the full user question:

# Example 1
<Knowledge Graph Relationships>
${exampleRelationships.map(rel => `- ${rel.rag_description}`).join('\n')}

<Tools>
\`\`\`json
${buildToolsText(exampleTools)}
\`\`\`

<User Question>
${exampleQueryStr}

<Output>
\`\`\`json
${JSON.stringify(exampleOutput, null, 4)}
\`\`\`

# Example 2
<Knowledge Graph Relationships>
${relationships.map((rel: Relationship) => `- ${rel.rag_description}`).join('\n')}

<Tools>
\`\`\`json
${toolsStr}
\`\`\`

<User Question>
${queryStr}

<Output>
`;
};

export type KGBasedSubQuestionPrompt = typeof defaultKGBasedSubQuestionPrompt;


/**
 * KGBasedQuestionGenerator is a class that generates sub-questions based on the query, knowledge graph, and tools.
 */
export class KGBasedQuestionGenerator extends PromptMixin implements BaseQuestionGenerator {
  llm: LLM;
  prompt: KGBasedSubQuestionPrompt;
  kgContext: Partial<KGRetrievalResult>;
  outputParser: BaseOutputParser<StructuredOutput<SubQuestion[]>>;

  constructor(init?: Partial<Omit<KGBasedQuestionGenerator, 'prompt'>> & {
    prompt?: string,
  }) {
    super();
    this.llm = init?.llm ?? Settings.llm;
    this.prompt = promptParser.getPrompt(init?.prompt, defaultKGBasedSubQuestionPrompt);
    this.outputParser = init?.outputParser ?? new SubQuestionOutputParser();
    this.kgContext = init?.kgContext ?? {}
  }

  async generate(tools: ToolMetadata[], query: string): Promise<SubQuestion[]> {
    const toolsStr = buildToolsText(tools);
    const queryStr = query;
    const prediction = (
      await this.llm.complete({
        prompt: this.prompt({
          relationships: this.kgContext.relationships,
          toolsStr,
          queryStr,
        }),
      })
    ).text;

    const structuredOutput = this.outputParser.parse(prediction);

    return structuredOutput.parsedOutput;
  }
}