import {EmbeddingConfig} from "@/lib/llamaindex/config/embedding";
import {LLMConfig} from "@/lib/llamaindex/config/llm";

export enum IndexProviderName {
  LLAMAINDEX = 'llamaindex',
  KNOWLEDGE_GRAPH = 'knowledge-graph',
}

export const DEFAULT_INDEX_PROVIDER_NAME = IndexProviderName.LLAMAINDEX;

/**
 * The configuration for indexing flow.
 *
 * Naming convention:
 * - config: The configuration for the entire index or the component.
 * - provider: The provider for the entire index or the component.
 * - options: The options for the component.
 */
export interface IndexConfig {
  provider: IndexProviderName;
  reader: Record<string, any>;
  parser: {
    textSplitter?: {
      chunkSize?: number;
      chunkOverlap?: number;
      paragraphSeparator?: string;
      splitLongSentences?: boolean;
    }
  };
  metadata_extractors: {
    provider: string
    config: any
  }[];
  embedding: EmbeddingConfig;
  llm: LLMConfig;
}
