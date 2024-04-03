import { Flow } from '@/core';
import type { ChatProcessor } from '@/core/services/chating';
import { extendRetrieveResultDetails, retrieve, type RetrieveCallbacks, type RetrievedChunk, type RetrieveOptions, type RetrieveProcessor } from '@/core/services/retrieving';
import { listChatMessages } from '@/core/v1/chat';
import { getDb } from '@/core/v1/db';
import type { Index } from '@/core/v1/index_';
import { createLlamaindexRetrieveProcessor } from '@/jobs/v1/llamaindexRetrieveProcessor';
import { getErrorMessage } from '@/lib/errors';
import { uuidToBin } from '@/lib/kysely';
import { getEmbedding } from '@/lib/llamaindex/converters/embedding';
import { getLLM } from '@/lib/llamaindex/converters/llm';
import { type BaseRetriever, CondenseQuestionChatEngine, type NodeWithScore, type Response, type RetrieveParams, RetrieverQueryEngine, type ServiceContext, serviceContextFromDefaults, TextNode } from 'llamaindex';
import type { RelatedNodeInfo } from 'llamaindex/Node';
import type { UUID } from 'node:crypto';

export function createLlamaindexChatProcessor (flow: Flow): ChatProcessor {
  return async function* (index, chat, options, callbacks) {
    const retrieves: { id: number, chunks: RetrievedChunk[] }[] = [];

    const serviceContext = serviceContextFromDefaults({
      llm: getLLM(flow, index.config.llm.provider, index.config.llm.config),
      embedModel: getEmbedding(flow, index.config.embedding.provider, index.config.embedding.config),
    });

    const retriever = await makeRetriever(index, {
      search_top_k: 100,
      top_k: 5,
      reranker: { provider: 'cohere' },
      filters: {},
      use_cache: false,
    }, createLlamaindexRetrieveProcessor(flow), serviceContext, {
      onRetrieved: (id, chunks) => retrieves.push({ id, chunks }),
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

    const msgId = await callbacks.onStartChatMessage(options.userInput);
    let last: Response | undefined;
    let message = '';
    let sources: Map<string, { name: string, uri: string }> = new Map();

    async function getSources (chunkIds?: string[]) {
      if (!chunkIds?.length) {
        return [];
      }
      const idsToFetch = chunkIds.filter(id => !sources.has(id));
      if (idsToFetch.length > 0) {
        const results = await getDb().selectFrom(`llamaindex_document_chunk_node_${index.name}`)
          .innerJoin('document', 'document.id', `llamaindex_document_chunk_node_${index.name}.document_id`)
          .select(eb => eb.fn('bin_to_uuid', [`llamaindex_document_chunk_node_${index.name}.id`]).as('id'))
          .select('document.name')
          .select('document.source_uri')
          .where(`llamaindex_document_chunk_node_${index.name}.id`, 'in', idsToFetch.map(id => uuidToBin(id as UUID)))
          .execute();

        results.forEach(result => sources.set(result.id, { name: result.name, uri: result.source_uri }));
      }

      return chunkIds.map(id => sources.get(id)).filter(Boolean) as { name: string, uri: string }[];
    }

    try {
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
        };
        last = response;
      }
      if (last) {
        yield {
          content: '',
          status: 'finished',
          sources: await getSources(last.sourceNodes?.map(node => node.id_)),
        };
        await callbacks.onFinishChatMessage(msgId, message, retrieves.map(r => r.id));
      } else {
        // use `return` instead of `await` to avoid goto catch block.
        return callbacks.onTerminateChatMessage(msgId, 'No response from LLM');
      }
    } catch (e) {
      await callbacks.onTerminateChatMessage(msgId, getErrorMessage(e));
      throw e;
    }
  };
}

async function makeRetriever (index: Index, options: Omit<RetrieveOptions, 'text'>, retrieveProcessor: RetrieveProcessor, serviceContext: ServiceContext, callbacks: RetrieveCallbacks) {
  return new class implements BaseRetriever {
    async retrieve (params: RetrieveParams): Promise<NodeWithScore[]> {
      const chunks = await retrieve(index.id, {
        ...options,
        text: params.query,
      }, retrieveProcessor, callbacks);


      const detaildChunks = await extendRetrieveResultDetails(chunks);

      return detaildChunks.map(chunk => {
        return {
          node: new TextNode({
            id_: chunk.document_chunk_node_id,
            text: chunk.text,
            metadata: chunk.metadata,
            relationships: Object.fromEntries(Object.entries(chunk.relationships).map(([k, v]) => {
              return [k, { nodeId: v.chunk_node_id, metadata: v.metadata } satisfies RelatedNodeInfo];
            })),
          }),
          score: chunk.relevance_score,
        };
      });
    }

    getServiceContext () {
      return serviceContext;
    }
  };
}
