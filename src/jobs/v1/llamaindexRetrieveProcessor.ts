import { Flow } from '@/core';
import { rag } from '@/core/interface';
import type { RetrievedChunk, RetrievedChunkReference, RetrievedResultsParser, RetrieveProcessor } from '@/core/services/retrieving';
import { getDb } from '@/core/v1/db';
import { cosineDistance, uuidToBin } from '@/lib/kysely';
import { type BaseRetriever, CohereRerank, NodeRelationship, type NodeWithScore, ObjectType, type RetrieveParams, type ServiceContext, TextNode } from 'llamaindex';
import type { RelatedNodeType } from 'llamaindex/Node';
import type { UUID } from 'node:crypto';
import ExtensionType = rag.ExtensionType;

export function createLLamaindexRetrieveResultsParser (): RetrievedResultsParser {
  return async (index, results) => {
    if (index.config.provider !== 'llamaindex') {
      throw new Error(`${index.name} is not a llamaindex index`);
    }
    if (results.length === 0) {
      return [];
    }
    const relationships = await getDb()
      .selectFrom('llamaindex_node_relationship as rel')
      .innerJoin(`llamaindex_document_chunk_node_${index.name} as target_chunk_node`, 'rel.target_node_id', `target_chunk_node.id`)
      .select([
        eb => eb.fn('bin_to_uuid', ['rel.source_node_id']).as('source_node_id'),
        eb => eb.fn('bin_to_uuid', ['rel.target_node_id']).as('target_node_id'),
        'rel.type',
        'target_chunk_node.metadata',
      ])
      .where('rel.source_node_id', 'in', results.map(result => uuidToBin(result.document_chunk_node_id)))
      .execute();

    const nodeRelsMap = new Map<UUID, Record<string, RetrievedChunkReference>>;

    for (let relationship of relationships) {
      let rels = nodeRelsMap.get(relationship.source_node_id);
      if (!rels) {
        nodeRelsMap.set(relationship.source_node_id, rels = {});
      }
      rels[relationship.type] = {
        index_id: index.id,
        metadata: relationship.metadata,
        chunk_node_id: relationship.target_node_id,
      };
    }

    return results.map(result => ({
      index_id: index.id,
      metadata: result.chunk_metadata,
      text: result.chunk_text,
      document_node_id: result.document_node_id,
      document_chunk_node_id: result.document_chunk_node_id,
      document_id: result.document_id,
      relevance_score: result.relevance_score,
      relationships: nodeRelsMap.get(result.document_chunk_node_id) ?? {},
    }));
  };
}

export function createLlamaindexRetrieveProcessor (flow: Flow): RetrieveProcessor {
  const parser = createLLamaindexRetrieveResultsParser();

  return async (
    index,
    {
      search_top_k = 100,
      top_k = 10,
      reranker: rerankerOptions,
      filters = {},
      text,
    },
    callbacks,
  ) => {
    if (index.config.provider !== 'llamaindex') {
      throw new Error(`${index.name} is not a llamaindex index`);
    }

    const queryEmbedding = await flow.getRequired(ExtensionType.Embeddings).embedQuery(text);

    await callbacks.onStartSearch?.();

    const rawChunks = await getDb()
      .selectFrom(`llamaindex_document_chunk_node_${index.name}`)
      .innerJoin('llamaindex_document_node as document_node', `llamaindex_document_chunk_node_${index.name}.document_id`, 'document_node.document_id')
      .select([
        eb => eb.fn('bin_to_uuid', [`llamaindex_document_chunk_node_${index.name}.id`]).as('document_chunk_node_id'),
        eb => eb.fn('bin_to_uuid', ['document_node.id']).as('document_node_id'),
        'document_id',
        'text as chunk_text',
        eb => eb.ref('metadata').$castTo<any>().as('chunk_metadata'),
        eb => cosineDistance(eb, 'embedding', queryEmbedding).as('relevance_score'),
      ])
      .orderBy('relevance_score', 'desc')
      .limit(search_top_k)
      .execute();

    let chunks = await parser(index, rawChunks);

    // Could support more filters here
    if (filters.namespaces && filters.namespaces.length > 0) {
      const set = new Set(filters.namespaces);
      chunks.filter(chunk => set.has(chunk.metadata.namespace_id));
    }

    if (!rerankerOptions) {
      return chunks.slice(0, top_k);
    }

    await callbacks.onStartRerank?.();

    // TODO: support custom rag rerankers like: `getReranker(flow, raranker.provider, reranker.options)`
    if (rerankerOptions.provider !== 'cohere') {
      throw new Error(`reranker ${rerankerOptions.provider} not supported`);
    }

    const reranker = new CohereRerank({
      ...rerankerOptions.options,
      topN: top_k,
    });

    const chunksMap = new Map(chunks.map(chunk => [chunk.document_chunk_node_id, chunk]));
    const nodesWithScore = await reranker.postprocessNodes(chunks.map(chunk => ({ score: chunk.relevance_score, node: transform(chunk) })));

    return nodesWithScore.map((nodeWithScore, index, total) => ({
      ...chunksMap.get(nodeWithScore.node.id_ as UUID)!,
      relevance_score: nodeWithScore.score ?? (total.length - index + top_k * 10),
    }));
  };
}

class StaticRetriever implements BaseRetriever {
  constructor (readonly chunks: RetrievedChunk[], private readonly serviceContext: ServiceContext) {}

  getServiceContext (): ServiceContext {
    return this.serviceContext;
  }

  async retrieve (params: RetrieveParams): Promise<NodeWithScore[]> {
    return this.chunks.map(chunk => ({
      score: chunk.relevance_score,
      node: transform(chunk),
    }));
  }
}

function transform (result: RetrievedChunk): TextNode {
  result.relationships;
  return new TextNode({
    id_: result.document_chunk_node_id,
    text: result.text,
    metadata: result.metadata,
    excludedLlmMetadataKeys: ['namespace_id'],
    relationships: {
      [NodeRelationship.NEXT]: result.relationships[NodeRelationship.NEXT] ? transformRef(result.relationships[NodeRelationship.NEXT]) : undefined,
      [NodeRelationship.PREVIOUS]: result.relationships[NodeRelationship.PREVIOUS] ? transformRef(result.relationships[NodeRelationship.PREVIOUS]) : undefined,
      [NodeRelationship.PARENT]: result.relationships[NodeRelationship.PARENT] ? transformRef(result.relationships[NodeRelationship.PARENT]) : undefined,
      // TODO: support CHILDREN
      // TODO: support SOURCE
    },
  });
}

function transformRef (rel: RetrievedChunkReference): RelatedNodeType<any> {
  return {
    nodeId: rel.chunk_node_id,
    nodeType: ObjectType.TEXT,
    metadata: rel.metadata,
  };
}