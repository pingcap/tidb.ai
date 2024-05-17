import type { Document } from '@/core/repositories/document';
import type { DocumentIndexTask, DocumentIndexTaskInfo } from '@/core/repositories/document_index_task';
import type { Index } from '@/core/repositories/index_';
import { DocumentIndexProvider, type DocumentIndexTaskResult } from '@/core/services/indexing';
import {KnowledgeGraphClient} from "@/lib/knowledge-graph/client";
import {fromFlowReaders} from "@/lib/llamaindex/builders/reader";
import {baseRegistry} from "@/rag-spec/base";
import {getFlow} from "@/rag-spec/createFlow";

export class KnowledgeGraphIndexProvider extends DocumentIndexProvider {
  async process (task: DocumentIndexTask, document: Document, index: Index, mutableInfo: DocumentIndexTaskInfo): Promise<DocumentIndexTaskResult> {
    const flow = await getFlow(baseRegistry, undefined, index.config);

    // Initialize the reader from legacy loaders.
    const reader = fromFlowReaders(flow, index.config.reader);
    const kgClient = new KnowledgeGraphClient();

    const nodes = await reader.loadData({
      mime: document.mime,
      source_uri: document.source_uri,
      content_uri: document.content_uri
    });

    await Promise.all(nodes.map(async (node) => {
      const uri = document.source_uri;
      const text = node.getText();
      await kgClient.buildIndex({
        uri,
        text
      });
    }));

    return {
      isNewDocumentNode: true,
    };
  };
}