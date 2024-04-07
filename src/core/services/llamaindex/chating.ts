import { AppChatService, type ChatOptions, type ChatResponse } from '@/core/services/chating';
import { LlamaindexRetrieverWrapper, LlamaindexRetrieveService } from '@/core/services/llamaindex/retrieving';
import type { RetrievedChunk } from '@/core/services/retrieving';
import { type Chat, listChatMessages } from '@/core/v1/chat';
import { getDb } from '@/core/v1/db';
import { uuidToBin } from '@/lib/kysely';
import { getEmbedding } from '@/lib/llamaindex/converters/embedding';
import { getLLM } from '@/lib/llamaindex/converters/llm';
import { CondenseQuestionChatEngine, type Response, RetrieverQueryEngine, serviceContextFromDefaults } from 'llamaindex';
import type { UUID } from 'node:crypto';

export class LlamaindexChatService extends AppChatService {
  protected async* run (chat: Chat, options: ChatOptions): AsyncGenerator<ChatResponse> {
    let lastRetrieveId: number | undefined

    const serviceContext = serviceContextFromDefaults({
      llm: getLLM(this.flow, this.index.config.llm.provider, this.index.config.llm.config),
      embedModel: getEmbedding(this.flow, this.index.config.embedding.provider, this.index.config.embedding.config),
    });

    const retrieveService = new LlamaindexRetrieveService({
      reranker: { provider: 'cohere' },
      flow: this.flow,
      index: this.index,
    });

    const retriever = new LlamaindexRetrieverWrapper(retrieveService, {
      search_top_k: 100,
      top_k: 5,
      filters: {},
      use_cache: false,
    }, serviceContext, {
      onRetrieved: (id, chunks) => {
        lastRetrieveId = id;
      },
    });

    const history = await listChatMessages(chat.id);

    const engine = new CondenseQuestionChatEngine({
      queryEngine: new RetrieverQueryEngine(retriever),
      chatHistory: history.map(message => ({
        role: message.role as any,
        content: message.content,
        additionalKwargs: {},
      })),
      serviceContext,
    });

    const stream = engine.chat({
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
    let sources: Map<string, { name: string, uri: string }> = new Map();

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

        results.forEach(result => sources.set(result.id, { name: result.name, uri: result.source_uri }));
      }

      return chunkIds.map(id => sources.get(id)).filter(Boolean) as { name: string, uri: string }[];
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