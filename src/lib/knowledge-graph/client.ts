import { handleErrors } from '@/lib/fetch';
import { getEnv } from '@llamaindex/env';
import { DateTime } from 'luxon';

export interface DocumentChunk {
  link: string,
  text: string
}

export interface Entity {
  id: number;
  name: string;
  description: string;
  meta: Record<string, any> | null;
  entity_type: 'original' | 'synopsis';
  synopsis_info: {
    entities: number[]
    topic: string
  } | null;
}

export interface Relationship {
  id: number;
  source_entity_id: number;
  target_entity_id: number;
  description: string;
  meta: Record<string, any> & { 'doc_id': string } | null;
}

export interface SearchResult {
  entities: Entity[];
  relationships: Relationship[];
  chunks: DocumentChunk[];
}

export interface DocumentInfo {
  uri: string,
  text: string
}

export interface SearchOptions {
  query: string,
  embedding?: number[]
  include_meta?: boolean;
  depth?: number;
  with_degree?: boolean;
}

export interface FeedbackOptions {
  feedback_type: 'like' | 'dislike';
  query: string;
  langfuse_link: string;
  relationships: number[];
}

export class KnowledgeGraphClient {
  baseURL: string;
  apiKey: string;

  constructor (init?: Partial<KnowledgeGraphClient>) {
    const baseURL = init?.baseURL ?? getEnv('GRAPH_RAG_API_URL');
    if (!baseURL) {
      throw new Error('GRAPH_RAG_API_URL is required');
    }
    const apiKey = init?.apiKey ?? getEnv('GRAPH_RAG_API_KEY');
    if (!apiKey) {
      throw new Error('GRAPH_RAG_API_KEY is required');
    }
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  private authenticationHeaders () {
    return {
      'X-Api-Key': this.apiKey,
    };
  }

  async search (options?: SearchOptions): Promise<SearchResult> {
    const url = `${this.baseURL}/api/search`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.authenticationHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });
    if (!res.ok) {
      throw new Error(`Failed to call knowledge graph search API: ${res.statusText}`);
    }
    return await res.json();
  }

  async feedback (options: FeedbackOptions) {
    const url = `${this.baseURL}/api/graph/feedback`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.authenticationHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });
    if (!res.ok) {
      throw new Error(`Failed to call knowledge graph search API: ${res.statusText}`);
    }
    return await res.json();
  }

  async buildIndex (doc: DocumentInfo) {
    try {
      const url = `${this.baseURL}/api/build`;
      const start = DateTime.now();
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          ...this.authenticationHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doc),
      });
      if (!res.ok) {
        throw new Error(`Failed to call build knowledge graph index API for doc (url: ${doc.uri}): ${res.statusText}`);
      }
      const data = await res.json();
      const end = DateTime.now();
      const duration = end.diff(start, 'seconds').seconds;
      if (data.status === 'done') {
        console.log(`Finish knowledge graph building, take ${duration} seconds.`);
      } else {
        console.log(`Knowledge graph building not done yet, status: ${data.status}`);
      }
      return data;
    } catch (err) {
      console.error(`Failed to build knowledge graph for doc: ${doc.uri}`, err);
      throw err;
    }
  }

  async searchEntity ({ name, description, top_k }: { name: string, description: string, top_k?: number }) {
    const usp = new URLSearchParams();
    usp.set('name', name);
    usp.set('description', description);
    if (top_k) {
      usp.set('top_k', String(top_k));
    }

    const url = `${this.baseURL}/api/graph/entities/search?${usp.toString()}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        ...this.authenticationHeaders(),
      },
    }).then(handleErrors).then(res => res.json());

    return res as Entity[];
  }

  async createSynopsisEntity (data: { name: string, description: string, topic: string, meta: any, entities: number[] }) {
    const url = `${this.baseURL}/api/graph/entities/synopsis`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.authenticationHeaders(),
        'Content-Type': 'application/json',
        body: JSON.stringify(data),
      },
    }).then(handleErrors).then(res => res.json());

    return res as Entity;
  }

  async getEntity (id: number) {
    const url = `${this.baseURL}/api/graph/entities/${id}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        ...this.authenticationHeaders(),
      },
    }).then(handleErrors).then(res => res.json());

    return res as Entity;
  }

  async updateEntity (id: number, data: any) {
    const url = `${this.baseURL}/api/graph/entities/${id}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        ...this.authenticationHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(handleErrors).then(res => res.json());

    return res as Entity;
  }

  async getRelationship (id: number) {
    const url = `${this.baseURL}/api/graph/relationships/${id}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        ...this.authenticationHeaders(),
      },
    }).then(handleErrors).then(res => res.json());

    return res as Relationship;
  }

  async updateRelationship (id: number, data: any) {
    const url = `${this.baseURL}/api/graph/relationships/${id}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        ...this.authenticationHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(handleErrors).then(res => res.json());

    return res as Relationship;
  }

  async getEntitySubgraph (id: number) {
    const url = `${this.baseURL}/api/graph/entities/${id}/subgraph`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        ...this.authenticationHeaders(),
      },
    }).then(handleErrors).then(res => res.json());

    return res as {
      entities: Entity[]
      relationships: Relationship[]
    };
  }

  async getChunkSubgraph (uri: string) {
    const url = `${this.baseURL}/api/graph/chunks/${encodeURIComponent(uri)}/subgraph`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        ...this.authenticationHeaders(),
        'Accept': 'application/json',
      },
    }).then(handleErrors).then(res => res.json());

    return res as {
      entities: Entity[]
      relationships: Relationship[]
    };
  }

  async getChunkImportState (uri: string) {
    const url = `${this.baseURL}/api/import/check`;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        uri,
      }),
      headers: {
        ...this.authenticationHeaders(),
        'Content-Type': 'application/json',
      },
    }).then(handleErrors).then(res => res.json());

    return res;
  }
}