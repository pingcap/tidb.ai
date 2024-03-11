ALTER TABLE `index`
    ADD COLUMN embedding VARCHAR(32) NOT NULL DEFAULT 'openai' COMMENT 'embedding provider for the index' AFTER llm,
    ADD COLUMN reranker  VARCHAR(32) NOT NULL DEFAULT 'cohere' COMMENT 'default reranker for the index' AFTER embedding,
    DROP COLUMN llm_model;

ALTER TABLE `index_query`
    ADD COLUMN reranker VARCHAR(32) NULL DEFAULT NULL COMMENT 'selected reranker for the query' AFTER metadata;
