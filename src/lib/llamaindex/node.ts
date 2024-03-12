import type { DB } from '@/core/db/schema';
import { rag } from '@/core/interface';
import { genId } from '@/lib/id';
import type { Selectable } from 'kysely';
import { Document, Metadata, NodeRelationship, ObjectType, TextNode } from 'llamaindex';

export function fromContent<T extends Metadata> (content: rag.Content<T>) {
  return new Document({
    id_: genId(),
    metadata: content.metadata,
  });
}

export function fromDocument<T extends Metadata> (document: Selectable<DB['document']>, chunks: Selectable<DB['document_index_chunk_partitioned']>[]) {
  return new Document({
    id_: document.id,
    relationships: {
      [NodeRelationship.CHILD]: chunks.map(chunk => ({
        nodeId: chunk.chunk_id,
        nodeType: ObjectType.TEXT,
        metadata: chunk.metadata as any,
      })),
    },
  });
}

export function fromChunk<T extends Metadata> (chunk: Selectable<DB['document_index_chunk_partitioned']>, index: number, chunks: Selectable<DB['document_index_chunk_partitioned']>[]) {
  return new TextNode({
    id_: chunk.chunk_id,
    text: chunk.text_content,
    relationships: {
      [NodeRelationship.NEXT]: index < chunks.length - 1 ? {
        nodeId: chunks[index + 1].chunk_id,
        nodeType: ObjectType.TEXT,
        metadata: chunks[index + 1].metadata as {},
      } : undefined,
      [NodeRelationship.PREVIOUS]: index > 0 ? {
        nodeId: chunks[index - 1].chunk_id,
        nodeType: ObjectType.TEXT,
        metadata: chunks[index - 1].metadata as {},
      } : undefined,
    },
  });
}
