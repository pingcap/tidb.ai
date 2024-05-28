import { DBv1, getDb, tx } from '@/core/db';
import type { Json } from '@/core/db/schema';
import type { Document } from '@/core/repositories/document';
import type { DocumentIndexTask, DocumentIndexTaskInfo } from '@/core/repositories/document_index_task';
import type { Index } from '@/core/repositories/index_';
import { DocumentIndexProvider, type DocumentIndexTaskResult } from '@/core/services/indexing';
import { uuidToBin, vectorToSql } from '@/lib/kysely';
import { buildEmbedding } from '@/lib/llamaindex/builders/embedding';
import { getMetadataExtractor } from '@/lib/llamaindex/builders/extractor';
import { buildLLM } from '@/lib/llamaindex/builders/llm';
import { fromFlowReaders } from '@/lib/llamaindex/builders/reader';
import { createIndexIngestionPipeline } from '@/lib/llamaindex/indexDocument';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import type { InsertObject } from 'kysely';
import { NodeRelationship, SentenceSplitter, SimpleNodeParser } from 'llamaindex';
import type { RelatedNodeType } from 'llamaindex/Node';
import type { UUID } from 'node:crypto';

export interface LlamaindexDocumentChunkNodeTable {
  document_id: number;
  embedding: unknown | null;
  hash: string;
  id: Buffer;
  index_id: number;
  metadata: Json;
  text: string;
}

declare module '@/core/db/schema' {
  interface DB extends Record<`llamaindex_document_chunk_node_${string}`, LlamaindexDocumentChunkNodeTable> {
  }
}

export class LlamaindexIndexProvider extends DocumentIndexProvider {
  async process (task: DocumentIndexTask, document: Document, index: Index, mutableInfo: DocumentIndexTaskInfo): Promise<DocumentIndexTaskResult> {
    const flow = await getFlow(baseRegistry, undefined, index.config);

    // Initialize the reader from legacy loaders.
    const reader = fromFlowReaders(flow, index.config.reader); // wrapped llamaindex.reader auto choosing rag.loader

    // Initialize llamaindex node parser from config.
    const { textSplitter, ...parserConfig } = index.config.parser;
    const parser = new SimpleNodeParser({
      textSplitter: new SentenceSplitter(textSplitter),
      ...parserConfig,
    });

    // Select and config the llm for indexing (metadata extractor).
    const llm = await buildLLM(index.config.llm);
    llm.metadata.model = index.config.llm.options?.model!;

    // Select and config the embedding (important and immutable)
    const embedding = await buildEmbedding(index.config.embedding);

    // Select and config the metadata extractors.
    const metadataExtractor = index.config.metadata_extractors.map(extractor =>
      getMetadataExtractor(flow, extractor.provider, extractor.config),
    );

    // Create the default llamaindex pipeline
    const pipeline = createIndexIngestionPipeline(
      reader,
      parser,
      metadataExtractor,
      embedding,
    );

    // Find if it was a previously indexed document node.
    const previousIndexNode = await getDb().selectFrom('llamaindex_document_node')
      .select(eb => eb.fn('bin_to_uuid', ['id']).as('id'))
      .where('document_id', '=', document.id)
      .where('index_id', '=', index.id)
      .executeTakeFirst();

    // Major index procedure
    const result = await pipeline(document, previousIndexNode?.id);

    // Fill indexing task info to `document_index_task`
    // TODO: count tokens each LLM used
    mutableInfo.chunks_count = result.chunks.length;

    // Store index result into database
    const id = await tx(async () => {
      let allRelationships: Record<UUID, Record<NodeRelationship, RelatedNodeType<any>>> = {};

      const { id, relationships, ...metadata } = result.metadata;

      allRelationships[id] = relationships ?? {};

      await getDb().insertInto('llamaindex_document_node')
        .values({
          id: uuidToBin(id),
          metadata: JSON.stringify(metadata),
          hash: result.hash,
          text: result.content.join('\n\n'),
          document_id: document.id,
          index_id: index.id,
          indexed_at: new Date(),
          index_info: JSON.stringify({ index_config: index.config }),
        })
        .onDuplicateKeyUpdate({
          metadata: JSON.stringify(metadata),
          hash: result.hash,
          text: result.content.join('\n\n'),
          indexed_at: new Date(),
          index_info: JSON.stringify({ index_config: index.config }),
        })
        .execute();

      await getDb().insertInto(`llamaindex_document_chunk_node_${index.name}`)
        .values(result.chunks.map(chunk => {
          const { id, relationships, ...metadata } = chunk.metadata;
          allRelationships[id] = relationships ?? {};
          return {
            metadata: JSON.stringify(metadata),
            embedding: vectorToSql(chunk.vector),
            index_id: index.id,
            id: uuidToBin(id),
            document_id: document.id,
            text: chunk.content,
            hash: chunk.hash,
          };
        }))
        .execute();

      await getDb().insertInto('llamaindex_node_relationship')
        .values(Object.entries(allRelationships).reduce((arr: InsertObject<DBv1, 'llamaindex_node_relationship'>[], [sourceId, value]) => {
          Object.entries(value).forEach(([rel, itemOrArray]) => {
            if (itemOrArray instanceof Array) {
              itemOrArray.forEach(item => {
                arr.push({
                  source_node_id: uuidToBin(sourceId as UUID),
                  target_node_id: uuidToBin(item.nodeId as UUID),
                  type: rel as any,
                });
              });
            } else {
              arr.push({
                source_node_id: uuidToBin(sourceId as UUID),
                target_node_id: uuidToBin(itemOrArray.nodeId as UUID),
                type: rel as any,
              });
            }
          });
          return arr;
        }, []))
        .execute();

      return id;
    });

    return {
      documentNode: id,
      documentChunkNodeTableName: `llamaindex_document_chunk_node_${index.name}`,
      documentNodeTableName: `llamaindex_document_node`,
      isNewDocumentNode: !previousIndexNode,
    };
  };
}