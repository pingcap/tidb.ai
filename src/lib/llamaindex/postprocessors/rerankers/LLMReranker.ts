import { ChoiceSelectParserFunction, defaultParseChoiceSelectAnswerFn } from '@/lib/llamaindex/indices/utils';
import { defaultChoiceSelectPrompt, PromptTemplate } from '@/lib/llamaindex/prompts/defaultPrompts';
import { type BaseNode, BaseNodePostprocessor, LLM, MetadataMode, NodeWithScore, ServiceContext } from 'llamaindex';
import { defaultFormatNodeBatchFn, NodeFormatterFunction } from 'llamaindex/indices/summary/utils';
import { llmFromSettingsOrContext } from 'llamaindex/Settings';

type LLMRerankOptions = {
  llm?: LLM;
  choiceSelectPrompt?: PromptTemplate;
  choiceBatchSize?: number;
  includeMetadata?: boolean;
  /**
   * @deprecated
   */
  formatNodeBatchFn?: NodeFormatterFunction;
  parseChoiceSelectAnswerFn?: ChoiceSelectParserFunction;
  serviceContext?: ServiceContext;
  topN?: number;
};

export class LLMRerank implements BaseNodePostprocessor {
  llm: LLM;
  choiceSelectPrompt: PromptTemplate;
  choiceBatchSize: number;
  private formatNodeBatchFn: NodeFormatterFunction;
  private parseChoiceSelectAnswerFn: ChoiceSelectParserFunction;
  topN: number;

  /**
   * Constructor for LLMRerank.
   *
   * @param llm LLM model to use.
   * @param choiceSelectPrompt Prompt to use for choice selection.
   * @param choiceBatchSize Number of choices to show at a time.
   * @param includeMetadata Include metadata when reranking. Default false.
   * @param formatNodeBatchFn Function to format a batch of nodes. (Will override `includeMetadata`.)
   * @param parseChoiceSelectAnswerFn Function to parse the choice selection answer.
   * @param serviceContext Service context.
   * @param topN Number of nodes to return.
   */
  constructor ({
    llm,
    choiceSelectPrompt,
    choiceBatchSize = 10,
    includeMetadata = false,
    formatNodeBatchFn,
    parseChoiceSelectAnswerFn,
    serviceContext,
    topN = 10,
  }: LLMRerankOptions) {
    this.llm = llm ?? llmFromSettingsOrContext(serviceContext);
    this.choiceSelectPrompt = choiceSelectPrompt ?? defaultChoiceSelectPrompt;
    this.choiceBatchSize = choiceBatchSize;
    this.formatNodeBatchFn = formatNodeBatchFn ?? (includeMetadata ? defaultFormatNodeBatchFn : formatNodeBatchFnWithoutMetadata);
    this.parseChoiceSelectAnswerFn = parseChoiceSelectAnswerFn ?? defaultParseChoiceSelectAnswerFn;
    this.topN = topN;
  }

  /**
   * Reranks the nodes using the LLM API.
   * @param nodes Array of nodes with scores.
   * @param query Query string.
   */
  async postprocessNodes (
    nodes: NodeWithScore[],
    query: string,
  ): Promise<NodeWithScore[]> {
    if (!query) {
      throw new Error('Query must be provided.');
    }

    if (nodes.length === 0) {
      return [];
    }

    const results = await executeInPartition(nodes, this.choiceBatchSize, async nodesWithScore => {
      const nodes = nodesWithScore.map(node => node.node);

      const fmtBatchStr = this.formatNodeBatchFn(nodes);
      // call each batch independently
      const choiceSelectPrompt = this.choiceSelectPrompt({
        queryStr: query,
        contextStr: fmtBatchStr,
      });
      const rawResponse = await this.llm.chat({
        messages: [
          {
            role: 'system',
            content: choiceSelectPrompt,
          },
        ],
      });

      const [rawChoices, relevances] = this.parseChoiceSelectAnswerFn(
        rawResponse.message.content as string,
        nodes.length,
      );

      const choiceIdxs = rawChoices.map(choice => parseInt(choice as any) - 1);
      const choiceNodes = choiceIdxs.map(idx => nodes[idx]);
      const scores = relevances || Array(choiceNodes.length).fill(1.0);

      return choiceNodes.map((node, i) => ({
        node,
        score: scores[i],
      }));
    });

    return results
      .flatMap(nodes => nodes)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, this.topN);
  }
}

async function executeInPartition<Job, Result> (jobs: Job[], batchSize: number, processor: (jobs: Job[]) => Promise<Result>) {
  const partitions: Job[][] = [];
  for (let i = 0; i < jobs.length; i += batchSize) {
    partitions.push(jobs.slice(i, i + batchSize));
  }

  return await Promise.all(partitions.map(partition => processor(partition)));
}

const formatNodeBatchFnWithoutMetadata = (summaryNodes: BaseNode[]) => {
  return summaryNodes.map((node, idx) => {
    return `
Document ${idx + 1}:
${node.getContent(MetadataMode.NONE)}
        `.trim();
  }).join('\n\n');
};