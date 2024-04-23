import {ChoiceSelectParserFunction, defaultParseChoiceSelectAnswerFn} from "@/lib/llamaindex/indices/utils";
import {defaultChoiceSelectPrompt, PromptTemplate} from "@/lib/llamaindex/prompts/defaultPrompts";
import {BaseNodePostprocessor, LLM, NodeWithScore, ServiceContext} from "llamaindex";
import {defaultFormatNodeBatchFn, NodeFormatterFunction} from "llamaindex/indices/summary/utils";
import {llmFromSettingsOrContext} from "llamaindex/Settings";

type LLMRerankOptions = {
  llm?: LLM;
  choiceSelectPrompt?: PromptTemplate;
  choiceBatchSize?: number;
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
   * @param formatNodeBatchFn Function to format a batch of nodes.
   * @param parseChoiceSelectAnswerFn Function to parse the choice selection answer.
   * @param serviceContext Service context.
   * @param topN Number of nodes to return.
   */
  constructor({
    llm,
    choiceSelectPrompt,
    choiceBatchSize = 10,
    formatNodeBatchFn,
    parseChoiceSelectAnswerFn,
    serviceContext,
    topN = 10,
  }: LLMRerankOptions) {
    this.llm = llm ?? llmFromSettingsOrContext(serviceContext);
    this.choiceSelectPrompt = choiceSelectPrompt ?? defaultChoiceSelectPrompt;
    this.choiceBatchSize = choiceBatchSize;
    this.formatNodeBatchFn = formatNodeBatchFn ?? defaultFormatNodeBatchFn;
    this.parseChoiceSelectAnswerFn = parseChoiceSelectAnswerFn ?? defaultParseChoiceSelectAnswerFn;
    this.topN = topN;
  }

  /**
   * Reranks the nodes using the LLM API.
   * @param nodes Array of nodes with scores.
   * @param query Query string.
   */
  async postprocessNodes(
    nodes: NodeWithScore[],
    query: string,
  ): Promise<NodeWithScore[]> {
    if (!query) {
      throw new Error("Query must be provided.");
    }

    if (nodes.length === 0) {
      return [];
    }

    const initialResults: NodeWithScore[] = [];
    for (let idx = 0; idx < nodes.length; idx += this.choiceBatchSize) {
      const nodesBatch = nodes.slice(idx, idx + this.choiceBatchSize).map(node => node.node);

      const fmtBatchStr = this.formatNodeBatchFn(nodesBatch);
      // call each batch independently
      const choiceSelectPrompt = this.choiceSelectPrompt({
        queryStr: query,
        contextStr: fmtBatchStr,
      });
      const rawResponse = await this.llm.chat({
        messages: [
          {
            role: "system",
            content: choiceSelectPrompt
          },
        ]
      });

      const selectAnswer = this.parseChoiceSelectAnswerFn(
        rawResponse.message.content as string,
        nodesBatch.length
      );

      const choiceIdxs = Object.keys(selectAnswer).map((documentNumber) => {
        return parseInt(documentNumber) - 1;
      });
      const choiceNodes = choiceIdxs.map(idx => nodesBatch[idx]);
      const scores = Object.values(selectAnswer) || Array(choiceNodes.length).fill(1.0);
      initialResults.push(
        ...choiceNodes.map((node, i) => ({
          node,
          score: scores[i]
        }))
      );
    }

    return initialResults
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, this.topN);
  }

}
