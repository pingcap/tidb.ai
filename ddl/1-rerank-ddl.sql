ALTER TABLE index_query add COLUMN metadata JSON NULL; -- { reranker: { identifier, ...reranker config } }
ALTER TABLE index_query add COLUMN reranked_at DATETIME NULL;

ALTER TABLE index_query_result add COLUMN relevance_score FLOAT NULL;
