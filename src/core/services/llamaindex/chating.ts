import {getDb} from '@/core/db';
import {type Chat, listChatMessages, updateChatMessage} from '@/core/repositories/chat';
import {ChatEngineRequiredOptions} from '@/core/repositories/chat_engine';
import {getDocumentsBySourceUris} from "@/core/repositories/document";
import {GraphRetrieverSearchOptions} from "@/core/schema/chat_engines/condense_question";
import {AppChatService, type ChatOptions, type ChatStreamEvent} from '@/core/services/chating';
import {LlamaindexRetrieverWrapper, LlamaindexRetrieveService} from '@/core/services/llamaindex/retrieving';
import type {RetrieveOptions} from "@/core/services/retrieving";
import {type AppChatStreamSource, AppChatStreamState} from '@/lib/ai/AppChatStream';
import { deduplicateItems } from '@/lib/array-filters';
import {
  DocumentChunk,
  Entity,
  KnowledgeGraphClient,
  Relationship,
  SearchResult
} from "@/lib/knowledge-graph/client";
import {uuidToBin} from '@/lib/kysely';
import {buildEmbedding} from '@/lib/llamaindex/builders/embedding';
import {buildLLM} from "@/lib/llamaindex/builders/llm";
import {buildQueryEngine} from "@/lib/llamaindex/builders/query-engine";
import {buildReranker} from "@/lib/llamaindex/builders/reranker";
import {buildSynthesizer} from "@/lib/llamaindex/builders/synthesizer";
import {LLMConfig, LLMProvider} from "@/lib/llamaindex/config/llm";
import {QueryEngineProvider} from "@/lib/llamaindex/config/query-engine";
import { type RerankerConfig } from '@/lib/llamaindex/config/reranker';
import {ResponseBuilderProvider} from "@/lib/llamaindex/config/response-builder";
import {SynthesizerProvider} from "@/lib/llamaindex/config/synthesizer";
import {promptParser} from "@/lib/llamaindex/prompts/PromptParser";
import {ManagedAsyncIterable} from '@/lib/ManagedAsyncIterable';
import {LangfuseTraceClient} from "langfuse";
import {
  CondenseQuestionChatEngine,
  defaultCondenseQuestionPrompt,
  serviceContextFromDefaults,
  PromptHelper, ServiceContext, TextNode
} from 'llamaindex';
import {DateTime} from 'luxon';
import {UUID} from 'node:crypto';

interface SourceWithNodeId extends AppChatStreamSource {
  id: string;
}

interface DocumentRelationship {
  docId: string;
  relationships: Relationship[];
  entities: Entity[];
  relevance_score?: number;
}

interface KGRetrievalResult extends SearchResult {
  document_relationships?: DocumentRelationship[];
}

const DEFAULT_CHAT_ENGINE_OPTIONS: ChatEngineRequiredOptions = {
  index_id: 0,
  llm: {
    provider: LLMProvider.OPENAI,
    options: {}
  } as LLMConfig,
  retriever: {
    search_top_k: 100,
    top_k: 5,
  } as RetrieveOptions,
  graph_retriever: {
    enable: false,
    search: {
      with_degree: false,
      depth: 1,
    }
  },
  prompts: {},
  reverse_context: true,
  synthesizer: {
    provider: SynthesizerProvider.RESPONSE,
    options: {
      response_builder: {
        provider: ResponseBuilderProvider.COMPACT_AND_REFINE,
        options: {}
      }
    }
  },
  query_engine: {
    provider: QueryEngineProvider.RETRIEVER,
    options: {}
  }
};

export class LlamaindexChatService extends AppChatService {

  protected async* run (chat: Chat, options: ChatOptions): AsyncGenerator<ChatStreamEvent> {
    // Init chat engine config.
    const engineOptions = Object.assign(
      {},
      DEFAULT_CHAT_ENGINE_OPTIONS,
      chat.engine_options
    ) as ChatEngineRequiredOptions;
    const {
      llm: llmConfig,
      retriever: retrieverConfig,
      graph_retriever: graphRetrieverConfig,
      metadata_filter: metadataFilterConfig ,
      reranker: rerankerConfig,
      synthesizer: synthesizerConfig,
      query_engine: queryEngineConfig,
      reverse_context,
      prompts
    } = engineOptions;

    // Init tracing.
    const trace = this.langfuse?.trace({
      name: 'chatting',
      input: {
        history: options.history,
        userInput: options.userInput
      },
      metadata: {
        chat_id: chat.id,
        chat_slug: chat.url_key,
        chat_engine_type: chat.engine,
        chat_engine_options: engineOptions,
      },
    });

    yield {
      status: AppChatStreamState.CREATING,
      sources: [],
      traceURL: trace?.getTraceUrl(),
      statusMessage: '',
      retrieveId: undefined,
      content: '',
    };

    await updateChatMessage(options.respondMessage.id, {
      trace_url: trace?.getTraceUrl(),
    });

    // Service context.
    const llm = await buildLLM(llmConfig!, trace);
    const promptHelper = new PromptHelper(llm.metadata.contextWindow);
    const embedModel = await buildEmbedding(this.index.config.embedding);
    const serviceContext = serviceContextFromDefaults({
      llm,
      promptHelper,
      embedModel,
    });

    console.log('[Chatting] Prepare chatting.');
    console.info('[Chatting] User input question: ', options.userInput);
    console.info('[Chatting] LLM:', JSON.stringify(llm.metadata), ', Embedding: ', embedModel.model);

    // Document sources.
    const allSources = new Map<string, AppChatStreamSource>();

    // Build knowledge graph based retriever.
    // TODO: refactor this part to KnowledgeGraphRetrieveService in the services/knowledge-graph/retrieving.ts
    let kgContext: Record<string, any> | undefined;
    if (graphRetrieverConfig?.enable) {
      console.log('[KG-Retrieving] Start knowledge graph retrieving ...');

      yield {
        status: AppChatStreamState.KG_RETRIEVING,
        sources: Array.from(allSources.values()),
        statusMessage: 'Start knowledge graph searching ...',
        content: '',
      };

      const kgClient = new KnowledgeGraphClient();
      const kgRetrievalSpan = trace?.span({
        name: 'knowledge-graph-retrieval',
        input: options.userInput,
        metadata: graphRetrieverConfig
      });

      // Knowledge graph searching.
      const result: KGRetrievalResult = await this.searchKnowledgeGraph(
        kgClient,
        options.userInput,
        graphRetrieverConfig.search,
        kgRetrievalSpan
      );

      // Grouping entities and relationships.
      result.document_relationships = await this.groupDocumentRelationships(result.relationships, result.entities);
      if (graphRetrieverConfig.reranker?.provider) {
        // Knowledge graph reranking.
        result.document_relationships = await this.rerankDocumentRelationships(
          result.document_relationships,
          options.userInput,
          retrieverConfig.top_k,
          graphRetrieverConfig.reranker,
          serviceContext,
          kgRetrievalSpan
        );

        // Flatten relationships and entities.
        result.relationships = result.document_relationships.map(dr => dr.relationships).flat().filter(deduplicateItems('id'));
        result.entities = result.document_relationships.map(dr => dr.entities).flat().filter(deduplicateItems('id'));
      }

      kgContext = result;
      // Notice: Limit to avoid exceeding the maximum size of the trace.
      kgRetrievalSpan?.end({
        output: {
          entities: result.entities,
          relationships: result.relationships,
          chunks: result.chunks
        }
      });

      yield {
        status: AppChatStreamState.KG_RETRIEVING,
        sources: Array.from(allSources.values()),
        statusMessage: 'Knowledge graph retrieving completed.',
        content: '',
      };

      console.log('[KG-Retrieving] Finish knowledge graph retrieving.');

      // Append sources from knowledge graph retrieving.
      const links = result.chunks.map((chunk: DocumentChunk) => chunk.link);
      await this.appendSourceByLinks(allSources, links);
    }

    // Build vector search based retriever.
    // FIXME: This method only support a single retrieve call currently.
    const retrieveService = new LlamaindexRetrieveService({
      flow: this.flow,
      index: this.index,
      serviceContext,
      reranker: rerankerConfig,
      metadata_filter: metadataFilterConfig,
      langfuse: this.langfuse,

    });
    const { search_top_k, top_k } = retrieverConfig;
    const retriever = withAsyncIterable<ChatStreamEvent, LlamaindexRetrieverWrapper>(
      (next, fail) => new LlamaindexRetrieverWrapper(retrieveService, {
        search_top_k,
        top_k,
        use_cache: false,
        reversed: reverse_context,
      },
      {
        onStartSearch: (id, text) => {
          next({
            done: false,
            value: {
              content: '',
              status: AppChatStreamState.SEARCHING,
              statusMessage: `Searching document chunks: ${text}`,
              sources: Array.from(allSources.values()),
              retrieveId: id,
            },
          });
        },
        onStartRerank: (id, chunks) => {
          next({
            done: false,
            value: {
              content: '',
              status: AppChatStreamState.RERANKING,
              statusMessage: `Reranking ${chunks.length} searched document chunks using ${rerankerConfig?.provider}:${rerankerConfig?.options?.model ?? 'default'}...`,
              sources: Array.from(allSources.values()),
              retrieveId: id,
            },
          });
        },
        onRetrieved: async (id, chunks) => {
          try {
            const chunkIds = chunks.map(chunk => chunk.document_chunk_node_id);
            await this.appendSourceByChunkIds(allSources, chunkIds);
            next({
              done: false,
              value: {
                content: '',
                status: AppChatStreamState.GENERATING,
                statusMessage: `Generating using ${llmConfig.provider}:${llmConfig.options?.model ?? 'default'}`,
                sources: Array.from(allSources.values()),
                retrieveId: id,
              },
            });
            next({
              done: true,
              value: undefined,
            });
          } catch (error) {
            fail(error);
          }
        },
        onRetrieveFailed: (id, reason) => {
          fail(reason);
        },
      },
      trace,
    ));

    const promptContext = {
      ...kgContext,
      sources: Array.from(allSources.values()).map((source, index) => ({
        ordinal: index + 1,
        ...source
      })),
      originalQuestion: options.userInput,
    }

    // Build Query Engine.
    const synthesizer = buildSynthesizer(serviceContext, synthesizerConfig, prompts, promptContext);
    const queryEngine = buildQueryEngine(queryEngineConfig, {
      retriever,
      synthesizer
    });

    // Build Chat Engine.
    const chatHistory = (await listChatMessages(chat.id)).map(message => ({
      role: message.role as any,
      content: message.content,
      additionalKwargs: {},
    }));
    const condenseMessagePrompt = promptParser.getPrompt(prompts?.condenseQuestion, defaultCondenseQuestionPrompt, promptContext);
    const chatEngine = new CondenseQuestionChatEngine({
      serviceContext,
      queryEngine,
      chatHistory,
      condenseMessagePrompt,
    });

    // Start the Chat.
    console.log(`[Chatting] Start chatting for chat <${chat.id}>.`);
    const start = DateTime.now();

    // Chatting via chat engine.
    const responses = chatEngine.chat({
      stream: true,
      chatHistory: options.history.map(message => ({
        role: message.role as any,
        content: message.content,
        additionalKwargs: {},
      })),
      message: options.userInput,
    });

    // Poll chat response from iterators and yield them.
    let finalResponse = '';
    for await (const response of poll(
      retriever,
      mapAsyncIterable(responses, async response => {
        finalResponse += response.response;
        return {
          content: response.response,
          status: AppChatStreamState.GENERATING,
          statusMessage: `Generating using ${llmConfig.provider}:${llmConfig.options?.model ?? 'default'}`,
          sources: Array.from(allSources.values()),
          retrieveId: undefined,
        };
      }),
    )) {
      yield response;
    }

    // End the chat.
    const end = DateTime.now();
    const duration = end.diff(start, 'seconds').seconds;
    console.log(`[Chatting] Finished chatting for chat <${chat.id}>, take ${duration} seconds.`);

    trace?.update({
      output: finalResponse
    });

    await this.langfuse?.flushAsync();
  }

  async searchKnowledgeGraph (
    kgClient: KnowledgeGraphClient,
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
    const searchResult = await kgClient.search({
      query,
      embedding: [],
      ...searchOptions
    });
    const duration = DateTime.now().diff(start, 'milliseconds').milliseconds;

    kgSearchSpan?.end({
      output: searchResult,
    });
    console.log(`[KG-Retrieving] Finish knowledge graph searching, take ${duration} ms.`);
    // Fixme: DO NOT MUTATE THE LANGFUSE OUTPUT. Langfuse always delays it's push operation, mutations before pushing will affect langfuse tracking.
    return searchResult;
  }

  async groupDocumentRelationships (
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
    rerankerConfig: RerankerConfig,
    serviceContext: ServiceContext,
    trace?: LangfuseTraceClient
  ): Promise<DocumentRelationship[]> {
    console.log(`[KG-Retrieving] Start knowledge graph reranking for query "${query}".`, { documentRelationship: documentRelationships.length, topK: topK });

    // Build reranker.
    const reranker = await buildReranker(serviceContext, rerankerConfig, topK);

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

  async getSourcesByChunkIds (chunkIds: string[]): Promise<SourceWithNodeId[]> {
    if (chunkIds.length === 0) {
      return [];
    }

    const results = await getDb().selectFrom(`llamaindex_document_chunk_node_${this.index.name}`)
      .innerJoin('document', 'document.id', `llamaindex_document_chunk_node_${this.index.name}.document_id`)
      .select(eb => eb.fn('bin_to_uuid', [`llamaindex_document_chunk_node_${this.index.name}.id`]).as('id'))
      .select('document.name')
      .select('document.source_uri')
      .where(`llamaindex_document_chunk_node_${this.index.name}.id`, 'in', chunkIds.map(id => uuidToBin(id as UUID)))
      .execute();

    return results.map(result => ({
      id: result.id,
      title: result.name,
      uri: result.source_uri,
    }));
  }

  async appendSourceByLinks(sources: Map<string, AppChatStreamSource>, links: string[]) {
    const documents = await getDocumentsBySourceUris(links);
    const linkDocumentMap = new Map(documents.map(document => [document.source_uri, document]));

    for (let link of links) {
      const document = linkDocumentMap.get(link);
      sources.set(link, {
        title: document?.name || 'Document from Graph RAG',
        uri: link
      });
    }

    return sources;
  }

  async appendSourceByChunkIds (sources: Map<string, AppChatStreamSource>, chunkIds?: string[]) {
    if (!Array.isArray(chunkIds) || chunkIds.length === 0) {
      return;
    }

    const idsToFetch = chunkIds.filter(id => !sources.has(id));
    const sourcesWithId = await this.getSourcesByChunkIds(idsToFetch);

    for (let source of sourcesWithId) {
      const { id, title, uri } = source;
      sources.set(id, { title, uri });
    }
  }

}

function withAsyncIterable<T, R> (run: (next: (result: IteratorResult<T, undefined>) => void, fail: (error: unknown) => void) => R) {
  const managed = new ManagedAsyncIterable<T>();

  let returns: R;
  returns = run(
    (result) => {
      if (result.done) {
        managed.finish();
      } else {
        managed.next(result.value);
      }
    },
    (reason) => {
      managed.fail(reason);
    });

  Object.defineProperty(returns, Symbol.asyncIterator, {
    value: () => managed[Symbol.asyncIterator](),
    writable: false,
    configurable: false,
    enumerable: false,
  });

  return returns as R & AsyncIterable<T>;
}

/**
 * Create a single AsyncIterable from several AsyncIterables with the same type.
 * @param iterables
 */
function poll<T> (...iterables: AsyncIterable<T>[]): AsyncIterable<T> {
  return new ManagedAsyncIterable<T>((managed) => {
    let finished = 0;
    for (let iterable of iterables) {
      const iterator = iterable[Symbol.asyncIterator]();
      const iterate = () => {
        iterator.next()
          .then(
            result => {
              if (result.done) {
                finished += 1;
                if (finished === iterables.length) {
                  managed.finish();
                }
              } else {
                managed.next(result.value);
                iterate();
              }
            },
            error => {
              managed.fail(error);
            });
      };
      iterate();
    }
  });
}

async function* mapAsyncIterable<T, R> (iterable: Promise<AsyncIterable<T>> | AsyncIterable<T>, map: (value: T) => R | Promise<R>): AsyncIterable<R> {
  for await (const value of await iterable) {
    yield map(value);
  }
}
