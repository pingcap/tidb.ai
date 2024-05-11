import {getEnv} from "@llamaindex/env";
import {DateTime} from "luxon";

export interface DocumentInfo {
  url: string,
  text: string
}

export class KnowledgeGraphClient {
  baseURL: string;

  constructor(init?: Partial<KnowledgeGraphClient>) {
    const baseURL = init?.baseURL ?? getEnv('GRAPH_RAG_API_URL');
    if (!baseURL) {
      throw new Error('GRAPH_RAG_API_URL is required');
    }
    this.baseURL = baseURL;
  }

  async search(query: string) {
    try {
      const url = `${this.baseURL}/api/search`;
      const start = DateTime.now();
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
        })
      });
      const data = await res.json();
      const end = DateTime.now();
      const duration = end.diff(start, 'seconds').seconds;
      const { entities = [], relationships = [], chunks = [] } = data;
      console.log(
        `Finished knowledge graph searching, take ${duration} seconds, got ${entities.length} entities, ${relationships.length} relationships, ${chunks.length} chunks.`
      );
      return data;
    } catch (err) {
      console.error('Failed to search using Graph RAG.', err);
      throw err;
    }
  }

  async buildIndex(doc: DocumentInfo) {
    try {
      const url = `${process.env.GRAPH_RAG_API_URL}/api/build`;
      const start = DateTime.now();
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doc)
      });
      const data = await res.json();
      const end = DateTime.now();
      const duration = end.diff(start, 'seconds').seconds;
      console.log(`Finish knowledge graph building, take ${duration} seconds.`);
      return data;
    } catch (err) {
      console.error(`Failed to build knowledge graph for doc: ${doc.url}`, err);
      throw err;
    }
  }

}