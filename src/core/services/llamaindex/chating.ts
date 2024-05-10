import {getDb} from '@/core/db';
import {type Chat, listChatMessages} from '@/core/repositories/chat';
import type {ChatEngineOptions} from '@/core/repositories/chat_engine';
import {getDocumentsBySourceUris} from "@/core/repositories/document";
import {AppChatService, type ChatOptions, type ChatStreamEvent} from '@/core/services/chating';
import {LlamaindexRetrieverWrapper, LlamaindexRetrieveService} from '@/core/services/llamaindex/retrieving';
import {type AppChatStreamSource, AppChatStreamState} from '@/lib/ai/AppChatStream';
import {uuidToBin} from '@/lib/kysely';
import {buildEmbedding} from '@/lib/llamaindex/builders/embedding';
import {buildLLM} from "@/lib/llamaindex/builders/llm";
import {LLMProvider} from "@/lib/llamaindex/config/llm";
import {ManagedAsyncIterable} from '@/lib/ManagedAsyncIterable';
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
  PromptHelper
} from 'llamaindex';
import {DateTime} from 'luxon';
import {randomUUID, UUID} from 'node:crypto';

interface SourceWithNodeId extends AppChatStreamSource {
  id: string;
}

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
    yield {
      status: AppChatStreamState.CREATING,
      sources: [],
      statusMessage: '',
      retrieveId: undefined,
      content: '',
    };

    const {
      llm: llmConfig = {
        provider: LLMProvider.OPENAI,
      },
      retriever: {
        search_top_k = 100,
        top_k = 5,
      } = {},
      graph_retriever = {
        enable: false
      },
      metadata_filter,
      reranker,
      prompts: {
        textQa,
        refine,
        condenseQuestion,
      } = {},
    } = chat.engine_options as ChatEngineOptions;

    const llm = await buildLLM(llmConfig);
    const { contextWindow  } = llm.metadata;
    const promptHelper = new PromptHelper(contextWindow);
    const embedModel = await buildEmbedding(this.index.config.embedding);
    const serviceContext = serviceContextFromDefaults({
      llm,
      promptHelper,
      embedModel,
    });

    console.log('The user input question:', options.userInput);
    console.info('llm:', JSON.stringify(llm.metadata), ', embedding: ', embedModel.model);

    const allSources = new Map<string, AppChatStreamSource>();

    // Build Retriever.
    const retrieveService = new LlamaindexRetrieveService({
      reranker,
      metadata_filter,
      flow: this.flow,
      index: this.index,
      serviceContext,
    });

    // FIXME: This method only support a single retrieve call currently.
    let retrieveId: number | undefined;
    const retriever = withAsyncIterable<ChatStreamEvent, LlamaindexRetrieverWrapper>(
      (next, fail) => new LlamaindexRetrieverWrapper(retrieveService, {
        search_top_k,
        top_k,
        use_cache: false,
      },
      serviceContext,
      {
        onStartSearch: (id, text) => {
          retrieveId = id;
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
              statusMessage: `Reranking ${chunks.length} searched document chunks using ${reranker?.provider}:${reranker?.options?.model ?? 'default'}...`,
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
      }
    ));

    // Using knowledge graph retriever.
    let additionalContext: Record<string, any> = {};
    if (graph_retriever?.enable) {
      if (!process.env.GRAPH_RAG_API_URL) {
        throw new Error('GRAPH_RAG_API_URL is required')
      }

      yield {
        status: AppChatStreamState.SEARCHING,
        sources: Array.from(allSources.values()),
        statusMessage: 'Start graph RAG searching ...',
        retrieveId: retrieveId,
        content: '',
      };

      // Search using Graph RAG.
      additionalContext = await this.graphRAGRetrieve(options.userInput);

      // Found the document name by link.
      const sourceLinks = (additionalContext['chunks'] ?? []).map((chunk: any) => chunk.link);
      const documents = await getDocumentsBySourceUris(sourceLinks);
      const documentMap = new Map(documents.map(document => [document.source_uri, document]));
      for (let sourceLink of sourceLinks) {
        const document = documentMap.get(sourceLink);
        allSources.set(randomUUID(), { title: document?.name || 'Document from Graph RAG', uri: sourceLink });
      }

      yield {
        status: AppChatStreamState.SEARCHING,
        sources: Array.from(allSources.values()),
        statusMessage: 'Graph RAG searching completed.',
        retrieveId: retrieveId,
        content: '',
      };
    }

    // Build Query Engine.
    const textQaPrompt = this.getPrompt(textQa, defaultTextQaPrompt, additionalContext);
    const refinePrompt = this.getPrompt(refine, defaultRefinePrompt, additionalContext);
    const responseBuilder = new CompactAndRefine(serviceContext, textQaPrompt, refinePrompt);
    const responseSynthesizer = new ResponseSynthesizer({
      serviceContext,
      responseBuilder,
      metadataMode: MetadataMode.LLM,
    });
    const queryEngine = new RetrieverQueryEngine(retriever, responseSynthesizer);

    // Build ChatHistory.
    const history = await listChatMessages(chat.id);
    const chatHistory = history.map(message => ({
      role: message.role as any,
      content: message.content,
      additionalKwargs: {},
    }));

    // Build ChatEngine.
    const stream = llmConfig?.options?.stream ?? true;
    const condenseMessagePrompt = this.getPrompt(condenseQuestion, defaultCondenseQuestionPrompt, additionalContext);
    const chatEngine = new CondenseQuestionChatEngine({
      queryEngine,
      chatHistory,
      serviceContext,
      condenseMessagePrompt,
    });

    // Chatting with LLM via ChatEngine.
    console.log(`Start chatting for chat <${chat.id}>.`, { stream });
    const start = DateTime.now();
    const responses = chatEngine.chat({
      stream: stream,
      chatHistory: options.history.map(message => ({
        role: message.role as any,
        content: message.content,
        additionalKwargs: {},
      })),
      message: options.userInput,
    });

    // poll from chat response iterators and yield
    for await (const response of poll(
      retriever,
      mapAsyncIterable(responses, async response => {
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

    const end = DateTime.now();
    const duration = end.diff(start, 'seconds').seconds;
    console.log(`Finished chatting for chat <${chat.id}>, take ${duration} seconds.`, { stream });
  }

  async graphRAGRetrieve(question: string) {
    try {
      const url = `${process.env.GRAPH_RAG_API_URL}/api/search`;
      const start = DateTime.now();
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: question,
        })
      });
      const data = await res.json();
      const end = DateTime.now();
      const duration = end.diff(start, 'seconds').seconds;
      console.log(`Graph RAG searching completed, take ${duration} seconds.`);
      return data;
    } catch (err) {
      console.error('Failed to search using Graph RAG.', err);
    }
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
 * Create a single AsyncIterable from several AsyncIterables with same type.
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
