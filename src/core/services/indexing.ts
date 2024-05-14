import {DEFAULT_INDEX_PROVIDER_NAME, IndexProviderName} from "@/core/config/indexes";
import { DBv1, tx } from '@/core/db';
import { type Document, getDocument } from '@/core/repositories/document';
import {createDocumentImportTask} from "@/core/repositories/document_import_task";
import {
  createDocumentIndexTask,
  createDocumentIndexTasks,
  dequeueDocumentIndexTaskById,
  dequeueDocumentIndexTasks,
  type DocumentIndexTask,
  type DocumentIndexTaskInfo,
  finishDocumentIndexTask,
  listByNotIndexed,
  startDocumentIndexTask,
  terminateDocumentIndexTask
} from '@/core/repositories/document_index_task';
import { getIndex, type Index } from '@/core/repositories/index_';
import { getErrorMessage } from '@/lib/errors';

export const DEFAULT_INDEX_NAME = 'default';

export type DocumentIndexTaskProcessor = (task: DocumentIndexTask, document: Document, index: Index, mutableInfo: DocumentIndexTaskInfo) => Promise<DocumentIndexTaskResult>

// TODO: make the index result type more generic, not all index has same table structure.
export type DocumentIndexTaskResult = {
  documentNodeTableName?: keyof DBv1
  documentChunkNodeTableName?: keyof DBv1
  documentNode?: string;
  isNewDocumentNode: boolean;
}

export class DocumentIndexService {
  providers: Record<string, DocumentIndexProvider> = {};

  static async scheduleDocumentFirstIndex (indexId: number) {
    return await tx(async () => {
      const ids = await listByNotIndexed(indexId);
      if (ids.length === 0) {
        return [];
      }

      await createDocumentIndexTasks(ids.map(id => ({
        document_id: id,
        type: 'CREATE_INDEX',
        info: {},
        index_id: indexId,
        created_at: new Date(),
        status: 'CREATED',
      })));

      return ids;
    });
  }

  static async createDocumentIndexTasksByDocumentIds (documentIds: number[], indexId: number) {
    return await tx(async () => {
      const results = await Promise.all(documentIds.map(async id => {
        return await createDocumentIndexTask({
          document_id: id,
          type: 'CREATE_INDEX',
          info: {},
          index_id: indexId,
          created_at: new Date(),
          status: 'CREATED',
        });
      }));

      return results.map((r) => Number(r.insertId));
    });
  }

  static async createTasksByURLs (urls: string[]) {
    return await Promise.all(urls.map(async (url) => {
      return await createDocumentImportTask({
        status: 'CREATED',
        type: 'html',
        url: url,
        source_id: null,
        created_at: new Date(),
      });
    }));
  }

  static getDocumentVectorTableName (provider: IndexProviderName = DEFAULT_INDEX_PROVIDER_NAME, index: string = DEFAULT_INDEX_NAME) {
    switch (provider) {
      case IndexProviderName.LLAMAINDEX:
        return `${provider}_document_chunk_node_${index}`;
      default:
        throw new Error(`unsupported index provider ${provider}`);
    }
  }

  async prepareProviders () {
    // TODO: DI?
    this.providers['llamaindex'] = await (() => import('./llamaindex/indexing').then(module => new module.LlamaindexIndexProvider()))();
    this.providers['knowledge-graph'] = await (() => import('./knowledge-graph/indexing').then(module => new module.KnowledgeGraphIndexProvider()))();
  }

  async runDocumentIndexTask (id: number) {
    if (!await dequeueDocumentIndexTaskById(id)) {
      throw new Error(`cannot dequeue document index task #${id}`);
    }

    await this.executeDocumentIndexTask(id);
  }

  async runDocumentIndexTasks (n: number) {
    const tasks = await dequeueDocumentIndexTasks(n);
    const results = await Promise.allSettled(tasks.map(id => this.executeDocumentIndexTask(id)));

    const succeed: number[] = [];
    const failed: number[] = [];

    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        succeed.push(tasks[i]);
      } else {
        failed.push(tasks[i]);
      }
    });

    return { succeed, failed };
  }

  private async executeDocumentIndexTask (id: number) {
    const task = await startDocumentIndexTask(id);
    if (!task) {
      throw new Error(`cannot start document index task #${id}`);
    }
    let info: DocumentIndexTaskInfo = {};

    try {
      info = { ...task.info };
      const document = (await getDocument(task.document_id))!;
      const index = (await getIndex(task.index_id))!;
      const providerName = index.config.provider;
      const provider = this.providers[providerName];
      if (!provider) {
        throw new Error(`Unknown index provider ${providerName}`);
      }

      const result = await provider.process(task, document, index, info);

      info.document_node_id = result.documentNode;
      info.document_node_table_name = result.documentNodeTableName;
      info.document_chunk_node_table_name = result.documentChunkNodeTableName;

      await finishDocumentIndexTask(id, info);
    } catch (e) {
      console.error(e);
      await terminateDocumentIndexTask(id, info, getErrorMessage(e));
      throw e;
    }
  }
}

export abstract class DocumentIndexProvider {
  abstract process (task: DocumentIndexTask, document: Document, index: Index, mutableInfo: DocumentIndexTaskInfo): Promise<DocumentIndexTaskResult>
}
