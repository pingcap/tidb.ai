CREATE TABLE feedback
(
    id                           INTEGER                  NOT NULL AUTO_INCREMENT,
    trace_id                     BINARY(16)               NOT NULL COMMENT 'Langfuse trace ID (UUID)',
    action                       ENUM ('like', 'dislike') NOT NULL,
    comment                      TEXT                     NOT NULL COMMENT 'Comments from user',
    created_by                   VARCHAR(32)              NOT NULL COMMENT 'User id',
    created_at                   DATETIME                 NOT NULL COMMENT 'User submit feedback at',
    knowledge_graph_detail       JSON                     NOT NULL COMMENT 'Map, key is source URL, value is `like` or `dislike`.',
    knowledge_graph_reported_at  DATETIME                 NULL COMMENT 'Reported to graph.tidb.ai',
    knowledge_graph_report_error TEXT                     NULL COMMENT 'Report failure reason if reporting failed.',
    PRIMARY KEY (id),
    UNIQUE INDEX (trace_id, created_by),
    INDEX (created_at, knowledge_graph_reported_at)
);
