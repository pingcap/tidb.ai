import {
  BaseNodePostprocessor,
  BaseRetriever,
  BaseSynthesizer, NodeWithScore,
  PromptMixin,
  QueryEngine, QueryEngineParamsNonStreaming, QueryEngineParamsStreaming,
  ResponseSynthesizer,
  Response
} from "llamaindex";

/**
 * A query engine that uses a hybrid approach to retrieve nodes.
 */
export class HybridRetrieverQueryEngine extends PromptMixin implements QueryEngine {
  retriever: BaseRetriever;
  kgBasedRetriever: BaseRetriever;
  responseSynthesizer: BaseSynthesizer;
  nodePostprocessors: BaseNodePostprocessor[];
  preFilters?: unknown;

  constructor(
    retriever: BaseRetriever,
    kgBasedRetriever: BaseRetriever,
    responseSynthesizer?: BaseSynthesizer,
    preFilters?: unknown,
    nodePostprocessors?: BaseNodePostprocessor[],
  ) {
    super();

    this.retriever = retriever;
    this.kgBasedRetriever = kgBasedRetriever;
    this.responseSynthesizer =
      responseSynthesizer ||
      new ResponseSynthesizer({
        serviceContext: retriever.serviceContext,
      });
    this.preFilters = preFilters;
    this.nodePostprocessors = nodePostprocessors || [];
  }

  _getPromptModules() {
    return {
      responseSynthesizer: this.responseSynthesizer,
    };
  }

  private async applyNodePostprocessors(nodes: NodeWithScore[], query: string) {
    let nodesWithScore = nodes;

    for (const postprocessor of this.nodePostprocessors) {
      nodesWithScore = await postprocessor.postprocessNodes(
        nodesWithScore,
        query,
      );
    }

    return nodesWithScore;
  }

  private async retrieve(query: string) {
    const nodes = await this.retriever.retrieve({
      query,
      preFilters: this.preFilters,
    });

    return await this.applyNodePostprocessors(nodes, query);
  }

  private async kgBasedRetrieve(query: string) {
    const nodes = await this.kgBasedRetriever.retrieve({
      query,
      preFilters: this.preFilters,
    });

    return await this.applyNodePostprocessors(nodes, query);
  }

  query(params: QueryEngineParamsStreaming): Promise<AsyncIterable<Response>>;
  query(params: QueryEngineParamsNonStreaming): Promise<Response>;
  async query(
    params: QueryEngineParamsStreaming | QueryEngineParamsNonStreaming,
  ): Promise<Response | AsyncIterable<Response>> {
    const { query, stream } = params;
    const nodesWithScore = await this.retrieve(query);

    const kgNodes = await this.kgBasedRetrieve(query);
    nodesWithScore.unshift(...kgNodes);

    if (stream) {
      return this.responseSynthesizer.synthesize({
        query,
        nodesWithScore,
        stream: true,
      });
    }
    return this.responseSynthesizer.synthesize({
      query,
      nodesWithScore,
    });
  }
}