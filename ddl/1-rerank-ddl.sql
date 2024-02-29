ALTER TABLE index_query
    ADD COLUMN metadata JSON NULL; -- { reranker: { identifier, ...reranker config } }
ALTER TABLE index_query
    ADD COLUMN reranked_at DATETIME NULL;

ALTER TABLE index_query_result
    ADD COLUMN relevance_score FLOAT NULL;

DROP VIEW IF EXISTS v_document_index_status;
CREATE VIEW v_document_index_status
AS
SELECT d.id                              AS document_id,
       i.name COLLATE utf8mb4_general_ci AS index_name,
       d.mime COLLATE utf8mb4_general_ci AS mime,
       di.created_at                     AS indexed_at,
       IFNULL(
               CASE
                   WHEN di.created_at IS NULL THEN 'notIndexed'
                   WHEN di.status = 'indexing' THEN 'indexing'
                   WHEN di.status = 'fail' THEN 'fail'
                   WHEN di.created_at < i.last_modified_at THEN 'staled'
                   ELSE 'indexed'
                   END COLLATE utf8mb4_general_ci,
               'notIndexed' COLLATE utf8mb4_general_ci
       )                                 AS index_state
FROM document d
         LEFT JOIN document_index di ON d.id = di.document_id
         LEFT JOIN `index` i ON di.index_name = i.name;

