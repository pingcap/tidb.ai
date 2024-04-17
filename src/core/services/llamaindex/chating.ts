import { getDb } from '@/core/db';
import { type Chat, listChatMessages } from '@/core/repositories/chat';
import type { ChatEngineOptions } from '@/core/repositories/chat_engine';
import { AppChatService, type ChatOptions, type ChatResponse } from '@/core/services/chating';
import { LlamaindexRetrieverWrapper, LlamaindexRetrieveService } from '@/core/services/llamaindex/retrieving';
import { AppChatStreamState } from '@/lib/ai/AppChatStreamData';
import { uuidToBin } from '@/lib/kysely';
import { getEmbedding } from '@/lib/llamaindex/converters/embedding';
import { getLLM } from '@/lib/llamaindex/converters/llm';
import { Liquid } from 'liquidjs';
import { CompactAndRefine, CondenseQuestionChatEngine, defaultCondenseQuestionPrompt, defaultRefinePrompt, defaultTextQaPrompt, MetadataMode, Response, ResponseSynthesizer, RetrieverQueryEngine, serviceContextFromDefaults } from 'llamaindex';
import type { UUID } from 'node:crypto';

export class LlamaindexChatService extends AppChatService {
  private liquid = new Liquid();

  getPrompt<Tmpl extends (ctx: any) => string> (template: string | undefined, fallback: Tmpl): (ctx: Parameters<Tmpl>[0]) => string {
    if (!template) return fallback;
    const tmpl = this.liquid.parse(template);
    return context => this.liquid.renderSync(tmpl, context);
  }

  getTextQAPrompt (): typeof defaultTextQaPrompt {
    return ({ query, context }) => `Context information is below.
---------------------
${context}
---------------------
Given the context information and not prior knowledge, answer the query use markdown format. Add links reference to original contexts if necessary.
Query: ${query}
Answer:`;
  }

  getRefinePrompt (): typeof defaultRefinePrompt {
    return ({ context, query, existingAnswer }: any) =>
      `The original query is as follows: ${query}
We have provided an existing answer: ${existingAnswer}
We have the opportunity to refine the existing answer (only if needed) with some more context below.
------------
${context}
------------
Given the new context, refine the original answer to better answer the query. If the context isn't useful, return the original answer.
Use markdown format to answer. Add links reference to contexts if necessary.
Refined Answer:`;
  }

  protected async* run (chat: Chat, options: ChatOptions): AsyncGenerator<ChatResponse> {
    yield {
      status: AppChatStreamState.CREATING,
      sources: [],
      statusMessage: '',
      retrieveId: undefined,
      content: '',
    };

    const {
      llm: {
        provider: llmProvider = 'openai',
        config: llmConfig = {},
      } = {},
      retriever: {
        search_top_k = 100,
        top_k = 5,
      } = {},
      reranker,
      prompts: {
        textQa,
        refine,
        condenseQuestion,
      } = {},
    } = chat.engine_options as ChatEngineOptions;

    const serviceContext = serviceContextFromDefaults({
      llm: getLLM(this.flow, llmProvider, llmConfig),
      embedModel: getEmbedding(this.flow, this.index.config.embedding.provider, this.index.config.embedding.config),
    });

    // build queryEngine
    const retrieveService = new LlamaindexRetrieveService({
      reranker,
      flow: this.flow,
      index: this.index,
      serviceContext,
    });

    const {
      returns: retriever,
      iterator: retrieverStateIterator,
    } = createInnerAsyncIterable<ChatResponse, LlamaindexRetrieverWrapper>((next, fail) => new LlamaindexRetrieverWrapper(retrieveService, {
      search_top_k,
      top_k,
      filters: {},
      use_cache: false,
    }, serviceContext, {
      onStartSearch: (id, text) => {
        next({
          done: false,
          value: {
            content: '',
            status: AppChatStreamState.SEARCHING,
            statusMessage: `Searching document chunks: ${text}`,
            sources: [],
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
            statusMessage: `Reranking ${chunks.length} searched document chunks using ${reranker?.provider}:${reranker?.config?.model}...`,
            sources: [],
            retrieveId: id,
          },
        });
      },
      onRetrieved: (id, chunks) => {
        next({
          done: true,
          value: undefined,
        });
      },
      onRetrieveFailed: (id, reason) => {
        fail(reason);
      },
    }));

    const responseBuilder = new CompactAndRefine(
      serviceContext,
      this.getPrompt(textQa, this.getTextQAPrompt()),
      this.getPrompt(refine, this.getRefinePrompt()),
    );
    const responseSynthesizer = new ResponseSynthesizer({
      serviceContext,
      responseBuilder,
      metadataMode: MetadataMode.LLM,
    });
    const queryEngine = new RetrieverQueryEngine(retriever, responseSynthesizer);

    // build chatHistory
    const history = await listChatMessages(chat.id);
    const chatHistory = history.map(message => ({
      role: message.role as any,
      content: message.content,
      additionalKwargs: {},
    }));

    const chatEngine = new CondenseQuestionChatEngine({
      queryEngine,
      chatHistory,
      serviceContext,
      condenseMessagePrompt: this.getPrompt(condenseQuestion, defaultCondenseQuestionPrompt),
    });

    const stream = chatEngine.chat({
      stream: true,
      chatHistory: options.history.map(message => ({
        role: message.role as any,
        content: message.content,
        additionalKwargs: {},
      })),
      message: options.userInput,
    });

    let sources: Map<string, { title: string, uri: string }> = new Map();

    const getSources = async (chunkIds?: string[]) => {
      if (!chunkIds?.length) {
        return [];
      }
      const idsToFetch = chunkIds.filter(id => !sources.has(id));
      if (idsToFetch.length > 0) {
        const results = await getDb().selectFrom(`llamaindex_document_chunk_node_${this.index.name}`)
          .innerJoin('document', 'document.id', `llamaindex_document_chunk_node_${this.index.name}.document_id`)
          .select(eb => eb.fn('bin_to_uuid', [`llamaindex_document_chunk_node_${this.index.name}.id`]).as('id'))
          .select('document.name')
          .select('document.source_uri')
          .where(`llamaindex_document_chunk_node_${this.index.name}.id`, 'in', idsToFetch.map(id => uuidToBin(id as UUID)))
          .execute();

        results.forEach(result => sources.set(result.id, { title: result.name, uri: result.source_uri }));
      }

      return chunkIds.map(id => sources.get(id)).filter(Boolean) as { title: string, uri: string }[];
    };

    function transformLlamaindexChatResponses (stream: Promise<AsyncIterable<Response>>) {
      return mapAsyncIterable(stream, async response => {
        return {
          content: response.response,
          status: AppChatStreamState.GENERATING,
          statusMessage: `Generating using ${llmProvider}:${llmConfig.model ?? 'unknown-model'}`,
          sources: await getSources(response.sourceNodes?.map(node => node.id_)),
          retrieveId: undefined,
        };
      });
    }

    for await (const response of select(retrieverStateIterator, transformLlamaindexChatResponses(stream))) {
      yield response;
    }
  }
}

function createInnerAsyncIterable<T, R> (run: (next: (result: IteratorResult<T, undefined>) => void, fail: (error: unknown) => void) => R) {
  let _resolve: (value: IteratorResult<T, undefined>) => void = () => {};
  let _reject: (error: unknown) => void = () => {};
  const queue: Promise<IteratorResult<T, undefined>>[] = [
    new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    }),
  ];
  let returns: R;
  returns = run(
    (result) => {
      queue.push(new Promise((resolve, reject) => {
        cursor++;
        _resolve(result);

        _resolve = resolve;
        _reject = reject;
      }));
    },
    (reason) => {
      _reject(reason);
    });

  let cursor = 0;
  const iterator: AsyncIterator<T> = {
    async next () {
      return await queue[cursor];
    },
  };

  return {
    iterator: {
      [Symbol.asyncIterator] () {
        return iterator;
      },
    },
    returns,
  };
}

function select<T> (...iterables: AsyncIterable<T>[]): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator] () {
      let _resolve: (value: IteratorResult<T, undefined>) => void = () => {};
      let _reject: (error: unknown) => void = () => {};
      const queue: Promise<IteratorResult<T, undefined>>[] = [
        new Promise((resolve, reject) => {
          _resolve = resolve;
          _reject = reject;
        }),
      ];

      let finished = 0;
      for (let iterable of iterables) {
        const iterator = iterable[Symbol.asyncIterator]();
        const iterate = () => {
          iterator.next()
            .then(result => {
              if (result.done) {
                finished += 1;
                if (finished === iterables.length) {
                  _resolve({
                    done: true,
                    value: undefined,
                  });
                }
              } else {
                _resolve(result);
                queue.push(new Promise((resolve, reject) => {
                  _resolve = resolve;
                  _reject = reject;
                }));
                iterate();
              }
            })
            .catch(_reject);
        };
        iterate();
      }

      return {
        async next () {
          return await queue[queue.length - 1];
        },
      };
    },
  };
}

async function* mapAsyncIterable<T, R> (iterable: Promise<AsyncIterable<T>> | AsyncIterable<T>, map: (value: T) => R | Promise<R>): AsyncIterable<R> {
  for await (const value of await iterable) {
    yield map(value);
  }
}
