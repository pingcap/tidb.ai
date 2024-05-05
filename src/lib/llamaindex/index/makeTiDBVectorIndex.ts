import { Flow } from '@/core';
import { rag } from '@/core/interface';
import { fromAppEmbedding } from '@/lib/llamaindex/builders/embedding';
import { fromAppChatModel } from '@/lib/llamaindex/builders/llm';
import { type TiDBIndexStruct } from '@/lib/llamaindex/storage/indexStore/TiDBIndexStore';
import { type TiDBVectorStore } from '@/lib/llamaindex/storage/vectorStore/TiDBVectorStore';
import { CallbackManager, PromptHelper, SentenceWindowNodeParser, VectorStoreIndex } from 'llamaindex';

export async function makeTidbVectorIndex (flow: Flow, tidbVectorStore: TiDBVectorStore, index: TiDBIndexStruct) {
  return VectorStoreIndex.fromVectorStore(
    tidbVectorStore,
    {
      llm: fromAppChatModel(flow.getRequired(rag.ExtensionType.ChatModel, index.raw.llm)),
      embedModel: fromAppEmbedding(flow.getRequired(rag.ExtensionType.Embeddings, index.raw.embedding)),
      nodeParser: new SentenceWindowNodeParser(),
      promptHelper: new PromptHelper(),
    },
  );
}
