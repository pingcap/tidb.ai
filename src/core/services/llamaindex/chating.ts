import { AppChatService, type ChatOptions, type ChatResponse } from '@/core/services/chating';
import { LlamaindexRetrieverWrapper, LlamaindexRetrieveService } from '@/core/services/llamaindex/retrieving';
import { type Chat, listChatMessages } from '@/core/v1/chat';
import type { ChatEngineOptions } from '@/core/v1/chat_engine';
import { getDb } from '@/core/v1/db';
import { uuidToBin } from '@/lib/kysely';
import { getEmbedding } from '@/lib/llamaindex/converters/embedding';
import { getLLM } from '@/lib/llamaindex/converters/llm';
import { Liquid } from 'liquidjs';
import { CompactAndRefine, CondenseQuestionChatEngine, defaultCondenseQuestionPrompt, defaultRefinePrompt, defaultTextQaPrompt, MetadataMode, type Response, ResponseSynthesizer, RetrieverQueryEngine, serviceContextFromDefaults } from 'llamaindex';
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
    const {
      llm: {
        provider: llmProvider = 'openai',
        config: llmConfig = {},
      } = {},
      retriever: {
        search_top_k = 100,
        top_k = 5,
      } = {},
      reranker = {
        provider: 'cohere',
      },
      prompts: {
        textQa,
        refine,
        condenseQuestion,
      } = {},
    } = chat.engine_options as ChatEngineOptions;

    let lastRetrieveId: number | undefined;

    const serviceContext = serviceContextFromDefaults({
      llm: getLLM(this.flow, llmProvider, llmConfig),
      embedModel: getEmbedding(this.flow, this.index.config.embedding.provider, this.index.config.embedding.config),
    });

    // build queryEngine
    const retrieveService = new LlamaindexRetrieveService({
      reranker,
      flow: this.flow,
      index: this.index,
    });
    const retriever = new LlamaindexRetrieverWrapper(retrieveService, {
      search_top_k,
      top_k,
      filters: {},
      use_cache: false,
    }, serviceContext, {
      onRetrieved: (id, chunks) => {
        lastRetrieveId = id;
      },
    });

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

    let last: Response | undefined;
    let message = '';
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

    // TODO: yield states
    // yield {
    //   sources: [],
    //   status: 'retrieving',
    //   content: '',
    // }
    for await (const response of await stream) {
      message += response.response;
      yield {
        content: response.response,
        status: 'generating',
        sources: await getSources(response.sourceNodes?.map(node => node.id_)),
        retrieveId: lastRetrieveId,
      };
      last = response;
    }
    if (last) {
      yield {
        content: '',
        status: 'finished',
        sources: await getSources(last.sourceNodes?.map(node => node.id_)),
        retrieveId: lastRetrieveId,
      };
    } else {
      // use `return` instead of `await` to avoid goto catch block.
      throw new Error('No response from LLM');
    }
  }
}