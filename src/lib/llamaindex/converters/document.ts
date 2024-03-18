import type { DBDocument } from '@/core/db/document';
import { type BaseNode, Document, TextNode } from 'llamaindex';
import type { UUID } from 'node:crypto';

export interface BaseDocumentMetadata {
  name: string;
  mime: string;
  created_at: Date;
  last_modified_at: Date;
  content_uri: string;
  source_uri: string;
}

const excludedMetadataKeys = [
  'name',
  'mime',
  'created_at',
  'last_modified_at',
  'content_uri',
  'source_uri',
];

export function nodeToDocument (node: BaseNode<BaseDocumentMetadata>): DBDocument {
  return {
    id: node.id_ as UUID,
    name: node.metadata.name,
    mime: node.metadata.mime,
    created_at: node.metadata.created_at,
    last_modified_at: node.metadata.last_modified_at,
    content_uri: node.metadata.content_uri,
    source_uri: node.metadata.source_uri,
    digest: node.hash,
    content: (node as TextNode<BaseDocumentMetadata>).getText(),
  };
}

export function documentToNode (document: DBDocument): Document<BaseDocumentMetadata> {
  return new Document<BaseDocumentMetadata>({
    id_: document.id,
    metadata: {
      name: document.name,
      mime: document.mime,
      created_at: document.created_at,
      last_modified_at: document.last_modified_at,
      content_uri: document.content_uri,
      source_uri: document.source_uri,
    },
    hash: document.digest,
    excludedLlmMetadataKeys: excludedMetadataKeys,
    excludedEmbedMetadataKeys: excludedMetadataKeys,
    text: document.content,
  });
}