import { AppChatService, type ChatOptions, type ChatResponse } from '@/core/services/chating';
import { LlamaindexRetrieverWrapper, LlamaindexRetrieveService } from '@/core/services/llamaindex/retrieving';
import { type Chat, listChatMessages } from '@/core/repositories/chat';
import type { ChatEngineOptions } from '@/core/repositories/chat_engine';
import { getDb } from '@/core/db';
import {SortedSet} from "@/lib/collection";
import { uuidToBin } from '@/lib/kysely';
import { getEmbedding } from '@/lib/llamaindex/converters/embedding';
import { getLLM } from '@/lib/llamaindex/converters/llm';
import {defaultRefinePrompt, defaultTextQaPrompt} from "@/lib/llamaindex/prompts/defaultPrompts";
import { Liquid } from 'liquidjs';
import {
  CompactAndRefine,
  CondenseQuestionChatEngine, defaultCondenseQuestionPrompt,
  MetadataMode,
  type Response,
  ResponseSynthesizer,
  RetrieverQueryEngine,
  serviceContextFromDefaults,
  SimplePrompt,
} from 'llamaindex';
import {DateTime} from "luxon";
import type { UUID } from 'node:crypto';

interface Source {
  title: string;
  uri: string;
}

interface SourceWithNodeId extends Source {
  id: string;
}

export class LlamaindexChatService extends AppChatService {
  private liquid = new Liquid();

  getPrompt<Tmpl extends SimplePrompt> (template: string | undefined, fallback: Tmpl): (ctx: Parameters<Tmpl>[0]) => string {
    if (!template) return fallback;
    const tmpl = this.liquid.parse(template);
    return context => this.liquid.renderSync(tmpl, context);
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
      reranker,
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

    // Build Retriever.
    const retrieveService = new LlamaindexRetrieveService({
      reranker,
      flow: this.flow,
      index: this.index,
      serviceContext
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

    // Build Query Engine.
    const textQaPrompt = this.getPrompt(textQa, defaultTextQaPrompt);
    const refinePrompt = this.getPrompt(refine, defaultRefinePrompt);
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
    const stream = llmConfig?.stream ?? true;
    const condenseMessagePrompt = this.getPrompt(condenseQuestion, defaultCondenseQuestionPrompt);
    const chatEngine = new CondenseQuestionChatEngine({
      queryEngine,
      chatHistory,
      serviceContext,
      condenseMessagePrompt
    });

    // Chatting with LLM via ChatEngine.
    console.log(`Start chatting for chat <${chat.id}>.`, { stream });
    const start = DateTime.now();
    const responses = await chatEngine.chat({
      stream: stream,
      chatHistory: options.history.map(message => ({
        role: message.role as any,
        content: message.content,
        additionalKwargs: {},
      })),
      message: options.userInput,
    });
    const end = DateTime.now();
    const duration = end.diff(start, 'seconds').seconds;
    console.log(`Finished chatting for chat <${chat.id}>, take ${duration} seconds.`, { stream });



    // Notice: Some LLM API doesn't support streaming mode.
    if (!stream) {
      const res = responses as unknown as Response;
      const chunkIds = this.getChunkIdsFromResponse(res) ?? [];
      const sources = await this.getSourcesByChunkIds(chunkIds);
      yield {
        content: res.response,
        status: 'generating',
        sources: sources,
        retrieveId: lastRetrieveId,
      };
      yield {
        content: '',
        status: 'finished',
        sources: sources,
        retrieveId: lastRetrieveId,
      };
      return;
    }

    // TODO: yield states
    // yield {
    //   sources: [],
    //   status: 'retrieving',
    //   content: '',
    // }

    let lastResponse: Response | undefined;
    const sources = new SortedSet<string, Source>();
    for await (const res of responses) {
      await this.appendSource(sources, this.getChunkIdsFromResponse(res));
      yield {
        content: res.response,
        status: 'generating',
        sources: sources.asList(),
        retrieveId: lastRetrieveId,
      };
      lastResponse = res;
    }

    if (lastResponse) {
      await this.appendSource(sources, this.getChunkIdsFromResponse(lastResponse));
      yield {
        content: '',
        status: 'finished',
        sources: sources.asList(),
        retrieveId: lastRetrieveId,
      };
    } else {
      // use `return` instead of `await` to avoid goto catch block.
      throw new Error('No response from LLM');
    }
  }

  getChunkIdsFromResponse(res: Response) {
    return res.sourceNodes?.map(node => node.id_);
  }

  async getSourcesByChunkIds(chunkIds: string[]): Promise<SourceWithNodeId[]> {
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

  async appendSource(sources: SortedSet<string, Source>, chunkIds?: string[]) {
    if (!Array.isArray(chunkIds) || chunkIds.length === 0) {
      return;
    }

    const idsToFetch = chunkIds.filter(id => !sources.has(id));
    const sourcesWithId = await this.getSourcesByChunkIds(idsToFetch);

    for (let source of sourcesWithId) {
      const { id, title, uri } = source;
      sources.add(id, { title, uri });
    }
  }
}