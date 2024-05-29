DROP TABLE knowledge_graph_feedback;

CREATE TABLE knowledge_graph_feedback
(
    id           INTEGER      NOT NULL AUTO_INCREMENT,
    trace_id     BINARY(16)   NOT NULL COMMENT 'Langfuse trace ID (UUID)',
    detail       JSON         NOT NULL COMMENT 'Map, key is source URL, value is `like` or `dislike`.',
    comment      TEXT         NOT NULL COMMENT 'Comments from user',
    created_by   VARCHAR(32)  NOT NULL COMMENT 'User id',
    created_at   DATETIME     NOT NULL COMMENT 'User submit feedback at',
    reported_at  DATETIME     NULL COMMENT 'Reported to graph.tidb.ai',
    report_error VARCHAR(512) NULL COMMENT 'Report failure reason if reporting failed.',
    PRIMARY KEY (id),
    UNIQUE INDEX (trace_id, created_by),
    INDEX (created_at, reported_at)
);
