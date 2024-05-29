CREATE TABLE knowledge_graph_feedback
(
    id           INTEGER                  NOT NULL AUTO_INCREMENT,
    trace_url    VARCHAR(128)             NOT NULL COMMENT 'Langfuse URL',
    source_url   VARCHAR(512)             NULL COMMENT 'Null or sources string',
    action       ENUM ('like', 'dislike') NOT NULL,
    created_by   VARCHAR(32)              NOT NULL COMMENT 'User id',
    created_at   DATETIME                 NOT NULL COMMENT 'User submit feedback at',
    reported_at  DATETIME                 NULL COMMENT 'Reported to graph.tidb.ai',
    report_error VARCHAR(512)             NULL COMMENT 'Report failure reason if reporting failed.',
    PRIMARY KEY (id),
    UNIQUE INDEX (trace_url, created_by, source_url),
    INDEX (created_at, reported_at)
);


DROP TABLE knowledge_graph_feedback;
