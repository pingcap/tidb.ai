import { rag } from '@/core/interface';
import { BaseNode, Document, type Metadata, ObjectType, TextNode } from 'llamaindex';

export function contentToNode<M extends Metadata> (content: rag.Content<M>): Document<M> {
  const { id, relationships, ...metadata } = content.metadata;
  const document = new Document({
    text: content.content.join('\n\n'),
    hash: content.hash,
    metadata: metadata as any,
    relationships,
  });
  if (id) {
    document.id_ = id;
  }

  return document;
}

export function chunkToNode<M extends Metadata> (chunk: rag.ContentChunk<M> | rag.EmbeddedContentChunk<M>): TextNode<M> {
  const { id, relationships, ...metadata } = chunk.metadata;
  const node = new TextNode({
    text: chunk.content,
    metadata: metadata as any,
    embedding: 'vector' in chunk ? Array.from(chunk.vector) : undefined,
    relationships: relationships,
    hash: chunk.hash,
  });

  if (id) {
    node.id_ = id;
  }

  return node;
}

export function nodeToContent<M extends Metadata> (node: BaseNode<M>): rag.Content<M> {
  if (node.getType() !== ObjectType.DOCUMENT) {
    throw new Error('node is not a document');
  }
  return {
    content: [(node as TextNode).getText()],
    metadata: {
      id: node.id_,
      relationships: node.relationships,
      ...node.metadata,
    },
    hash: node.hash,
  };
}

export function nodeToChunk<M extends Metadata> (node: BaseNode<M>): rag.EmbeddedContentChunk<M> {
  return {
    content: (node as TextNode).getText(),
    hash: node.hash,
    metadata: {
      id: node.id_,
      relationships: node.relationships,
      ...node.metadata,
    },
    vector: new Float64Array(node.embedding ?? []),
  };
}
