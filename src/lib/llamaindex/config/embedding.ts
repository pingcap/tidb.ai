import {z} from "zod";

export enum EmbeddingProvider {
  OPENAI = 'openai',
  BITDEER = 'bitdeer',
  JINAAI = 'jinaai',
  OLLAMA = 'ollama',
}

export const BaseEmbeddingOptionsSchema = z.object({
  model: z.string(),
  vectorColumn: z.string().default('embedding'),
  vectorDimensions: z.number().int(),
});

export enum OpenAIEmbeddingModel {
  TEXT_EMBEDDING_ADA_002 = "text-embedding-ada-002",
  TEXT_EMBEDDING_3_SMALL = "text-embedding-3-small",
  TEXT_EMBEDDING_3_LARGE = "text-embedding-3-large",
}

export const OpenAIEmbeddingModelSchema = z.nativeEnum(OpenAIEmbeddingModel);

export const OpenAIEmbeddingOptionsSchema = BaseEmbeddingOptionsSchema.extend({
  model: OpenAIEmbeddingModelSchema.default(OpenAIEmbeddingModel.TEXT_EMBEDDING_ADA_002),
  dimensions: z.number().int().optional(),
});

export const OpenAIEmbeddingConfigSchema = z.object({
  provider: z.literal(EmbeddingProvider.OPENAI),
  options: OpenAIEmbeddingOptionsSchema.optional(),
});

export enum BitdeerEmbeddingModel {
  MISTRAL_EMBED_LARGE = "mxbai-embed-large",
}

export const BitdeerEmbeddingModelSchema = z.nativeEnum(BitdeerEmbeddingModel);

export const BitdeerEmbeddingOptionsSchema = BaseEmbeddingOptionsSchema.extend({
  model: BitdeerEmbeddingModelSchema.default(BitdeerEmbeddingModel.MISTRAL_EMBED_LARGE),
  dimensions: z.number().int().default(1024),
});

export const BitdeerEmbeddingConfigSchema = z.object({
  provider: z.literal(EmbeddingProvider.BITDEER),
  options: BitdeerEmbeddingOptionsSchema.optional(),
});

export enum JinaAIEmbeddingModel {
  JINA_EMBEDDINGS_V2_BASE_EN = "jina-embeddings-v2-base-en",
  JINA_EMBEDDINGS_V2_BASE_CN = "jina-embeddings-v2-base-cn",
}

export const JinaAIEmbeddingModelSchema = z.nativeEnum(JinaAIEmbeddingModel);

export const JinaAIEmbeddingOptionsSchema = BaseEmbeddingOptionsSchema.extend({
  model: JinaAIEmbeddingModelSchema.default(JinaAIEmbeddingModel.JINA_EMBEDDINGS_V2_BASE_EN),
  dimensions: z.number().int().optional().default(512),
});

export const JinaAIEmbeddingConfigSchema = z.object({
  provider: z.literal(EmbeddingProvider.JINAAI),
  options: JinaAIEmbeddingOptionsSchema.optional(),
});

export enum OllamaEmbeddingModel {
  MXBAI_EMBED_LARGE = "mxbai-embed-large",
}

export const OllamaEmbeddingModelSchema = z.nativeEnum(OllamaEmbeddingModel);

export const OllamaEmbeddingOptionsSchema = BaseEmbeddingOptionsSchema.extend({
  model: z.nativeEnum(OllamaEmbeddingModel).default(OllamaEmbeddingModel.MXBAI_EMBED_LARGE),
  dimensions: z.number().int(),
});

export const OllamaEmbeddingConfigSchema = z.object({
  provider: z.literal(EmbeddingProvider.OLLAMA),
  options: OllamaEmbeddingOptionsSchema.optional(),
});

export const EmbeddingModelOptions = {
  [EmbeddingProvider.OPENAI]: {
    [OpenAIEmbeddingModel.TEXT_EMBEDDING_ADA_002]: {
      dimensions: 1536,
    },
    [OpenAIEmbeddingModel.TEXT_EMBEDDING_3_SMALL]: {
      dimensions: 256,
    },
    [OpenAIEmbeddingModel.TEXT_EMBEDDING_3_LARGE]: {
      dimensions: 256,
    },
  },
  [EmbeddingProvider.BITDEER]: {
    [BitdeerEmbeddingModel.MISTRAL_EMBED_LARGE]: {
      dimensions: 1024,
    },
  },
  [EmbeddingProvider.JINAAI]: {
    [JinaAIEmbeddingModel.JINA_EMBEDDINGS_V2_BASE_EN]: {
      dimensions: 512,
    },
    [JinaAIEmbeddingModel.JINA_EMBEDDINGS_V2_BASE_CN]: {
      dimensions: 512,
    },
  },
  [EmbeddingProvider.OLLAMA]: {
    [OllamaEmbeddingModel.MXBAI_EMBED_LARGE]: {
      dimensions: 1024,
    },
  }
};

export const getEmbeddingModelOptions = (provider: EmbeddingProvider) => {
  return EmbeddingModelOptions[provider];
}

export const EmbeddingConfigSchema = z.discriminatedUnion('provider', [
  OpenAIEmbeddingConfigSchema,
  BitdeerEmbeddingConfigSchema,
  JinaAIEmbeddingConfigSchema,
  OllamaEmbeddingConfigSchema,
]);

export type EmbeddingConfig = z.infer<typeof EmbeddingConfigSchema>;