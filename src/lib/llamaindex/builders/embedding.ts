import {EmbeddingConfig, EmbeddingProvider} from "@/lib/llamaindex/config/embedding";
import {BitdeerEmbedding} from "@/lib/llamaindex/embeddings/BitdeerEmbedding";
import {JinaAIEmbedding, OllamaEmbedding, OpenAIEmbedding} from 'llamaindex';

export async function buildEmbedding ({ provider, options }: EmbeddingConfig) {
  switch (provider) {
    case EmbeddingProvider.OPENAI:
      return new OpenAIEmbedding(options);
    case EmbeddingProvider.BITDEER:
      return new BitdeerEmbedding(options);
    case EmbeddingProvider.JINAAI:
      return new JinaAIEmbedding(options);
    case EmbeddingProvider.OLLAMA:
      return new OllamaEmbedding(options ?? { model: 'llama3' });
    default:
      throw new Error(`Unknown embedding provider: ${provider}`);
  }
}
