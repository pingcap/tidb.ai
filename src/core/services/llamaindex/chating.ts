import {getDb} from '@/core/db';
import {type Chat, listChatMessages, updateChatMessage} from '@/core/repositories/chat';
import {ChatEngineRequiredOptions} from '@/core/repositories/chat_engine';
import {getDocumentsBySourceUris} from "@/core/repositories/document";
import {AppChatService, type ChatOptions, type ChatStreamEvent} from '@/core/services/chating';
import {TiDBAIKnowledgeGraphRetriever} from "@/core/services/knowledge-graph/retrieving";
import {RetrieveOptions} from "@/core/services/retrieving";
import {TiDBAIVectorIndexRetriever, LlamaindexRetrieveService} from '@/core/services/vector-index/retrieving';
import {type AppChatStreamSource, AppChatStreamState} from '@/lib/ai/AppChatStream';
import {mapAsyncIterable, poll, withAsyncIterable} from "@/lib/async";
import {uuidToBin} from '@/lib/kysely';
import {buildEmbedding} from '@/lib/llamaindex/builders/embedding';
import {buildLLM} from "@/lib/llamaindex/builders/llm";
import {buildQueryEngine} from "@/lib/llamaindex/builders/query-engine";
import {buildSynthesizer} from "@/lib/llamaindex/builders/synthesizer";
import {LLMConfig, LLMProvider} from "@/lib/llamaindex/config/llm";
import {QueryEngineProvider} from "@/lib/llamaindex/config/query-engine";
import {ResponseBuilderProvider} from "@/lib/llamaindex/config/response-builder";
import {SynthesizerProvider} from "@/lib/llamaindex/config/synthesizer";
import {promptParser} from "@/lib/llamaindex/prompts/PromptParser";
import {
  CondenseQuestionChatEngine,
  defaultCondenseQuestionPrompt,
  PromptHelper,
  serviceContextFromDefaults,
} from 'llamaindex';
import {DateTime} from 'luxon';
import {UUID} from 'node:crypto';

interface SourceWithNodeId extends AppChatStreamSource {
  id: string;
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
      retriever: retrieverOptions,
      graph_retriever: graphRetrieverOptions,
      metadata_filter: metadataFilterConfig ,
      reranker: rerankerConfig,
      synthesizer: synthesizerConfig,
      query_engine: queryEngineConfig,
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

    // Fill in entities and relationships to rewrite query prompt.

    // Build vector index based retriever.
    const vectorIndexRetrieveService = new LlamaindexRetrieveService({
      serviceContext,
      flow: this.flow,
      index: this.index,
      reranker: rerankerConfig,
      metadata_filter: metadataFilterConfig,
      langfuse: this.langfuse,
    });
    const vectorIndexRetriever = withAsyncIterable<ChatStreamEvent, TiDBAIVectorIndexRetriever>((next, fail) => new TiDBAIVectorIndexRetriever(
      vectorIndexRetrieveService,
      retrieverOptions,
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

    // Build knowledge-graph-based retriever.
    const knowledgeGraphRetriever = withAsyncIterable<ChatStreamEvent, TiDBAIKnowledgeGraphRetriever>((next, fail) => new TiDBAIKnowledgeGraphRetriever(
      serviceContext,
      graphRetrieverOptions,
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
            const links = chunks.map(chunk => chunk.metadata.source_uri);
            await this.appendSourceByLinks(allSources, links);
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

    // Prompt context.
    const promptContext = {
      sources: Array.from(allSources.values()).map((source, index) => ({
        ordinal: index + 1,
        ...source
      })),
      originalQuestion: options.userInput,
    }

    // Build Query Engine.
    const synthesizer = buildSynthesizer(serviceContext, synthesizerConfig, prompts, promptContext);
    const queryEngineContext = { llm, retriever: vectorIndexRetriever, graphRetriever: knowledgeGraphRetriever, synthesizer };
    const queryEngine = await buildQueryEngine(queryEngineContext, queryEngineConfig, options.userInput, promptContext, trace);

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
      vectorIndexRetriever,
      mapAsyncIterable(responses, async response => {
        finalResponse += response.response;
        return {
          content: response.response,
          status: AppChatStreamState.GENERATING,
          statusMessage: `Generating using ${llmConfig.provider}:${llmConfig.options?.model ?? 'default'}`,
          sources: Array.from(allSources.values()),
          retrieveId: undefined,
        };
      }, () => { vectorIndexRetriever.__force_terminate__() }),
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
