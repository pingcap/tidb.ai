import {getDb} from '@/core/db';
import {type Chat, listChatMessages, updateChatMessage} from '@/core/repositories/chat';
import {ChatEngineRequiredOptions} from '@/core/repositories/chat_engine';
import {getDocumentsBySourceUris} from "@/core/repositories/document";
import {AppChatService, type ChatOptions, type ChatStreamEvent} from '@/core/services/chating';
import {LlamaindexRetrieverWrapper, LlamaindexRetrieveService} from '@/core/services/llamaindex/retrieving';
import type {RetrieveOptions} from "@/core/services/retrieving";
import {type AppChatStreamSource, AppChatStreamState} from '@/lib/ai/AppChatStream';
import {Entity, KnowledgeGraphClient, Relationship} from "@/lib/knowledge-graph/client";
import {uuidToBin} from '@/lib/kysely';
import {buildEmbedding} from '@/lib/llamaindex/builders/embedding';
import {buildLLM} from "@/lib/llamaindex/builders/llm";
import {buildReranker} from "@/lib/llamaindex/builders/reranker";
import {LLMConfig, LLMProvider} from "@/lib/llamaindex/config/llm";
import {RerankerProvider} from "@/lib/llamaindex/config/reranker";
import {ManagedAsyncIterable} from '@/lib/ManagedAsyncIterable';
import {LangfuseTraceClient} from "langfuse";
import {Liquid} from 'liquidjs';
import {
  CompactAndRefine,
  CondenseQuestionChatEngine,
  defaultCondenseQuestionPrompt,
  defaultRefinePrompt,
  defaultTextQaPrompt,
  MetadataMode,
  ResponseSynthesizer,
  RetrieverQueryEngine,
  serviceContextFromDefaults,
  SimplePrompt,
  PromptHelper, ServiceContext, TextNode
} from 'llamaindex';
import {DateTime} from 'luxon';
import {randomUUID, UUID} from 'node:crypto';

interface SourceWithNodeId extends AppChatStreamSource {
  id: string;
}

interface DocumentKGChunk {
  docId: string;
  relationships: Relationship[];
  entities: Entity[];
  relevance_score?: number;
}

const DEFAULT_CHAT_ENGINE_OPTIONS = {
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
    enable: false
  },
  prompts: {}
};

export class LlamaindexChatService extends AppChatService {
  private liquid = new Liquid();

  getPrompt<Tmpl extends SimplePrompt> (template: string | undefined, fallback: Tmpl, partialContext: Record<string, any> = {}): (ctx: Parameters<Tmpl>[0]) => string {
    if (!template) return fallback;
    const tmpl = this.liquid.parse(template);
    return context => this.liquid.renderSync(tmpl, {
      ...partialContext,
      ...context
    });
  }

  protected async* run (chat: Chat, options: ChatOptions): AsyncGenerator<ChatStreamEvent> {
    // Init chat engine config.
    const engineOptions = Object.assign(
      DEFAULT_CHAT_ENGINE_OPTIONS,
      chat.engine_options
    ) as ChatEngineRequiredOptions;
    const {
      llm: llmConfig,
      retriever: retrieverConfig,
      graph_retriever: graphRetrieverConfig,
      metadata_filter: metadataFilterConfig ,
      reranker: rerankerConfig,
      prompts
    } = engineOptions;

    // Init tracing.
    const trace = this.langfuse?.trace({
      name: 'chatting',
      input: {
        history: options.history,
        userInput: options.userInput
      },
      metadata: engineOptions,
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

    // Knowledge graph retriever.
    let kgContext: Record<string, any> = {};
    if (graphRetrieverConfig?.enable) {
      yield {
        status: AppChatStreamState.SEARCHING,
        traceURL: trace?.getTraceUrl(),
        sources: Array.from(allSources.values()),
        statusMessage: 'Start graph RAG searching ...',
        content: '',
      };

      const kgClient = new KnowledgeGraphClient();
      const kgSearchSpan = trace?.span({
        name: "knowledge-graph-retrieval",
        input: options.userInput,
      });
      kgContext = await kgClient.search(options.userInput, [], true);
      kgContext['document_relationships'] = await groupDocumentRelationship(
        kgContext['relationships'] ?? [],
        kgContext['entities'] ?? []
      );
      kgSearchSpan?.end({
        output: kgContext,
      });

      kgContext['document_relationships'] = this.rerankDocumentRelationships(
        kgContext['document_relationships'],
        options.userInput,
        10,
        serviceContext,
        trace
      );

      // Found the document name by link.
      const sourceLinks = (kgContext['chunks'] ?? []).map((chunk: any) => chunk.link);
      const documents = await getDocumentsBySourceUris(sourceLinks);
      const documentMap = new Map(documents.map(document => [document.source_uri, document]));
      for (let sourceLink of sourceLinks) {
        const document = documentMap.get(sourceLink);
        allSources.set(randomUUID(), { title: document?.name || 'Document from Graph RAG', uri: sourceLink });
      }

      yield {
        status: AppChatStreamState.SEARCHING,
        traceURL: trace?.getTraceUrl(),
        sources: Array.from(allSources.values()),
        statusMessage: 'Graph RAG searching completed.',
        content: '',
      };
    }

    // Build Retriever.
    // FIXME: This method only support a single retrieve call currently.
    const retrieveService = new LlamaindexRetrieveService({
      flow: this.flow,
      index: this.index,
      serviceContext,
      reranker: rerankerConfig,
      metadata_filter: metadataFilterConfig,
      langfuse: this.langfuse
    });
    const { search_top_k, top_k } = retrieverConfig;
    const retriever = withAsyncIterable<ChatStreamEvent, LlamaindexRetrieverWrapper>(
      (next, fail) => new LlamaindexRetrieverWrapper(retrieveService, {
        search_top_k,
        top_k,
        use_cache: false
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
            await this.appendSource(allSources, chunkIds);
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

    // Build Query Engine.
    const { textQa, refine } = prompts;
    const textQaPrompt = this.getPrompt(textQa, defaultTextQaPrompt, kgContext);
    const refinePrompt = this.getPrompt(refine, defaultRefinePrompt, kgContext);
    const responseBuilder = new CompactAndRefine(serviceContext, textQaPrompt, refinePrompt);
    const responseSynthesizer = new ResponseSynthesizer({
      serviceContext,
      responseBuilder,
      metadataMode: MetadataMode.LLM,
    });
    const queryEngine = new RetrieverQueryEngine(retriever, responseSynthesizer);

    // Build Chat Engine.
    const chatHistory = (await listChatMessages(chat.id)).map(message => ({
      role: message.role as any,
      content: message.content,
      additionalKwargs: {},
    }));
    const condenseMessagePrompt = this.getPrompt(prompts?.condenseQuestion, defaultCondenseQuestionPrompt, kgContext);
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
          traceURL: trace?.getTraceUrl(),
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

  async rerankDocumentRelationships (
    chunks: DocumentKGChunk[],
    query: string,
    top_k: number = 10,
    serviceContext: ServiceContext,
    trace?: LangfuseTraceClient
  ): Promise<DocumentKGChunk[]> {
    console.log(`[Graph-Retrieving] Start knowledge graph reranking for query "${query}".`, { chunks: chunks.length, top_k });
    const rerankSpan = trace?.span({
      name: 'knowledge-graph-reranking',
      input: {
        query,
        chunks
      }
    });

    const rerankStart = DateTime.now();
    const reranker = await buildReranker(serviceContext, { provider: RerankerProvider.JINAAI }, top_k);
    const chunksMap = new Map(chunks.map(chunk => [chunk.docId, chunk]));
    const nodes = chunks.map(chunk => ({
      node: new TextNode({
        id_: chunk.docId,
        text: `
Document Id: ${chunk.docId}

Relationships extract from the document: 
${chunk.relationships.map(rel => rel.description).join('\n')}

Entities extract from the document:
${chunk.entities.map(ent => `${ent.name}:${ent.description}`).join('\n')}
          `,
      })
    }));
    const nodesWithScore = await reranker.postprocessNodes(nodes, query);
    const rerankDuration = DateTime.now().diff(rerankStart, 'milliseconds').milliseconds;

    const result = nodesWithScore.map((nodeWithScore, index, total) => ({
      ...chunksMap.get(nodeWithScore.node.id_)!,
      relevance_score: nodeWithScore.score ?? (total.length - index + top_k * 10),
    }));

    rerankSpan?.end({
      output: result
    });
    console.log(`[Graph-Retrieving] Finish knowledge graph reranking, take ${rerankDuration} ms.`);
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

  async appendSource (sources: Map<string, AppChatStreamSource>, chunkIds?: string[]) {
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

async function groupDocumentRelationship(relationships: Relationship[], entities: Entity[]) {
  const entityMap = new Map(entities.map(entity => [entity.id, entity]));
  const documentRelationshipsMap: Map<string, {
    docId: string,
    relationships: Map<number, Relationship>
    entities: Map<number, Entity>
  }> = new Map();

  for (let relationship of relationships) {
    const sourceEntity = entityMap.get(relationship.source_entity_id);
    const targetEntity = entityMap.get(relationship.target_entity_id);
    relationship.target_entity = targetEntity;
    relationship.source_entity = sourceEntity;

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

    if (sourceEntity) {
      relGroup?.entities.set(relationship.source_entity_id, sourceEntity);
    }

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
