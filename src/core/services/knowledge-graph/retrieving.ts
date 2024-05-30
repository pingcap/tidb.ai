import {GraphRetrieverOptions, GraphRetrieverSearchOptions} from "@/core/schema/chat_engines/condense_question";
import {type RetrieveCallbacks,} from "@/core/services/retrieving";
import {deduplicateItems} from "@/lib/array-filters";
import {Entity, KnowledgeGraphClient, Relationship, SearchResult} from "@/lib/knowledge-graph/client";
import {buildReranker} from "@/lib/llamaindex/builders/reranker";
import {LangfuseTraceClient} from "langfuse";
import {type BaseRetriever, type NodeWithScore, type RetrieveParams, ServiceContext, TextNode} from "llamaindex";
import {DateTime} from "luxon";
import {randomUUID} from "node:crypto";

export interface DocumentRelationship {
  docId: string;
  relationships: Relationship[];
  entities: Entity[];
  relevance_score?: number;
}

export interface KGRetrievalResult extends SearchResult {
  document_relationships: DocumentRelationship[];
}

export class TiDBAIKnowledgeGraphRetriever implements BaseRetriever {
  serviceContext: ServiceContext;
  private kgClient: KnowledgeGraphClient;

  constructor (
    serviceContext: ServiceContext,
    private readonly graphRetrieverOptions: GraphRetrieverOptions,
    private readonly callbacks: RetrieveCallbacks,
    private readonly trace?: LangfuseTraceClient
  ) {
    this.kgClient = new KnowledgeGraphClient();
    this.serviceContext = serviceContext;
  }

  async retrieve ({ query }: RetrieveParams): Promise<NodeWithScore[]> {
    const result = await this.retrieveKnowledgeGraph({ query });
    const docRelMap = new Map(result.document_relationships.map(dr => [dr.docId, dr]));
    return result.chunks.map(chunk => {
      const dr = docRelMap.get(chunk.link);
      const relationshipsStr = dr?.relationships.map(rel => rel.rag_description).join('\n').padStart(1, '\n');
      const entitiesStr = dr?.entities.map(ent => `- ${ent.name}: ${ent.description}`).join('\n').padStart(1, '\n');
      return {
        node: new TextNode({
          id_: randomUUID(),
          text: chunk.text,
          metadata: {
            sourceUri: chunk.link,
            relationships: relationshipsStr,
            entities: entitiesStr,
          },
        })
      };
    });
  }

  async retrieveKnowledgeGraph ({ query }: RetrieveParams): Promise<KGRetrievalResult> {
    console.log('[KG-Retrieving] Start knowledge graph retrieving ...');

    const {
      top_k = 5,
      search: searchOptions,
      reranker: rerankOptions
    } = this.graphRetrieverOptions;

    const kgRetrievalSpan = this.trace?.span({
      name: 'knowledge-graph-retrieval',
      input: query,
      metadata: this.graphRetrieverOptions
    });

    // Knowledge graph searching.
    const searchResult: SearchResult = await this.searchKnowledgeGraph(
      query,
      searchOptions,
      kgRetrievalSpan
    );

    // Grouping entities and relationships.
    const result: KGRetrievalResult = {
      ...searchResult,
      document_relationships: this.groupDocumentRelationships(searchResult.relationships, searchResult.entities)
    }

    // Rerank document relationships.
    if (rerankOptions?.provider) {
      // Knowledge graph reranking.
      result.document_relationships = await this.rerankDocumentRelationships(
        result.document_relationships,
        query,
        top_k,
        kgRetrievalSpan
      );

      // Flatten relationships and entities.
      result.relationships = result.document_relationships.map(dr => dr.relationships).flat().filter(deduplicateItems('id'));
      result.entities = result.document_relationships.map(dr => dr.entities).flat().filter(deduplicateItems('id'));
    }

    // Notice: Limit to avoid exceeding the maximum size of the trace.
    kgRetrievalSpan?.end({
      output: {
        entities: result.entities,
        relationships: result.relationships,
        chunks: result.chunks
      }
    });

    console.log('[KG-Retrieving] Finish knowledge graph retrieving.');
    return result;
  }

  async searchKnowledgeGraph (
    query: string,
    searchOptions: GraphRetrieverSearchOptions = {},
    trace?: LangfuseTraceClient
  ): Promise<SearchResult> {
    console.log(`[KG-Retrieving] Start knowledge graph searching for query "${query}".`);
    const kgSearchSpan = trace?.span({
      name: "knowledge-graph-search",
      input: query,
      metadata: searchOptions
    });

    const start = DateTime.now();
    const searchResult = await this.kgClient.search({
      query,
      embedding: [],
      ...searchOptions
    });
    const duration = DateTime.now().diff(start, 'milliseconds').milliseconds;

    kgSearchSpan?.end({
      // Fixme: DO NOT MUTATE THE LANGFUSE OUTPUT.
      // Langfuse always delays it's push operation, mutations before pushing will affect langfuse tracking.
      output: JSON.parse(JSON.stringify(searchResult)),
    });
    console.log(`[KG-Retrieving] Finish knowledge graph searching, take ${duration} ms.`);

    return searchResult;
  }

  groupDocumentRelationships (
    relationships: Relationship[] = [],
    entities: Entity[] = []
  ) {
    const entityMap = new Map(entities.map(entity => [entity.id, entity]));
      const documentRelationshipsMap: Map<string, {
      docId: string,
      relationships: Map<number, Relationship>
      entities: Map<number, Entity>
    }> = new Map();

    for (let relationship of relationships) {
      const docId = relationship?.meta?.doc_id || 'default';
      if (!documentRelationshipsMap.has(docId)) {
        documentRelationshipsMap.set(docId, {
          docId,
          relationships: new Map<number, Relationship>(),
          entities: new Map<number, Entity>()
        });
      }

      const relGroup = documentRelationshipsMap.get(docId)!;
      relGroup?.relationships.set(relationship.id, relationship);

      const sourceEntity = entityMap.get(relationship.source_entity_id);
      if (sourceEntity) {
        relGroup?.entities.set(relationship.source_entity_id, sourceEntity);
      }

      const targetEntity = entityMap.get(relationship.target_entity_id);
      if (targetEntity) {
        relGroup?.entities.set(relationship.target_entity_id, targetEntity);
      }

      documentRelationshipsMap.set(docId, relGroup);
    }

    const documentRelationships = Array.from(documentRelationshipsMap.values());
    return documentRelationships.map(relGroup => ({
      docId: relGroup.docId,
      relationships: Array.from(relGroup.relationships.values()),
      entities: Array.from(relGroup.entities.values())
    }));
  }

  async rerankDocumentRelationships (
    documentRelationships: DocumentRelationship[],
    query: string,
    topK: number = 10,
    trace?: LangfuseTraceClient
  ): Promise<DocumentRelationship[]> {
    console.log(`[KG-Retrieving] Start knowledge graph reranking for query "${query}".`, { documentRelationship: documentRelationships.length, topK: topK });

    // Build reranker.
    const reranker = await buildReranker(this.serviceContext, this.graphRetrieverOptions.reranker!, topK);

    // Transform document relationships to TextNode.
    const docIdRelationshipsMap = new Map(documentRelationships.map(dr => [dr.docId, dr]));
    const nodes = documentRelationships.map(dr => ({
      node: new TextNode({
        id_: dr.docId,
        text: `
Document URL: ${dr.docId}

Relationships extract from the document: 
${dr.relationships.map(rel => rel.description).join('\n')}

Entities extract from the document:
${dr.entities.map(ent => `- ${ent.name}: ${ent.description}`).join('\n')}
          `,
      })
    }));

    const rerankSpan = trace?.span({
      name: 'knowledge-graph-rerank',
      input: {
        query,
        document_relationships_size: documentRelationships.length
      }
    });

    // Reranking.
    const start = DateTime.now();
    const nodesWithScore = await reranker.postprocessNodes(nodes, query);
    const result = nodesWithScore.map((nodeWithScore, index, total) => ({
      ...docIdRelationshipsMap.get(nodeWithScore.node.id_)!,
      relevance_score: nodeWithScore.score ?? (total.length - index + topK * 10),
    }));
    const duration = DateTime.now().diff(start, 'milliseconds').milliseconds;

    rerankSpan?.end({
      output: result
    });

    console.log(`[KG-Retrieving] Finish knowledge graph reranking, take ${duration} ms.`);
    return result;
  }
}