DROP DATABASE IF EXISTS createrag_dev;

CREATE DATABASE createrag_dev;

USE createrag_dev;

CREATE TABLE document
(
    id               VARCHAR(32)  NOT NULL,
    name             VARCHAR(256) NOT NULL,
    mime             VARCHAR(64)  NOT NULL,
    content_uri      VARCHAR(256) NOT NULL,
    source_uri       VARCHAR(256) NOT NULL,
    digest           CHAR(32)     NOT NULL,
    created_at       DATETIME     NOT NULL,
    last_modified_at DATETIME     NOT NULL,
    PRIMARY KEY (id),
    INDEX (source_uri)
);


CREATE TABLE `index`
(
    name             VARCHAR(32) NOT NULL,
    llm              VARCHAR(32) NOT NULL,
    llm_model        VARCHAR(64) NOT NULL,
    splitter_type    VARCHAR(64) NOT NULL,
    splitter_options JSON        NOT NULL,
    created_at       DATETIME    NOT NULL,
    last_modified_at DATETIME    NOT NULL,
    PRIMARY KEY (name)
);


CREATE TABLE document_index
(
    document_id  VARCHAR(32)                     NOT NULL,
    index_name   VARCHAR(32)                     NOT NULL,
    text_content LONGTEXT                        NOT NULL,
    metadata     JSON                            NOT NULL,
    status       ENUM ('indexing', 'ok', 'fail') NOT NULL,
    trace        TEXT                            NULL,
    created_at   DATETIME                        NOT NULL,

    PRIMARY KEY (document_id, index_name),
    FOREIGN KEY (document_id) REFERENCES document (id),
    FOREIGN KEY (index_name) REFERENCES `index` (name)
);

CREATE TABLE document_index_chunk
(
    id           VARCHAR(32)      NOT NULL,
    document_id  VARCHAR(32)      NOT NULL,
    index_name   VARCHAR(32)      NOT NULL,
    text_content TEXT             NOT NULL,
    ordinal      INTEGER          NOT NULL,
    metadata     JSON             NOT NULL,
    embedding    VARBINARY(40000) NOT NULL COMMENT 'VECTOR',
    staled       BOOLEAN          NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (document_id) REFERENCES document (id),
    FOREIGN KEY (index_name) REFERENCES `index` (name),
    UNIQUE KEY (document_id, ordinal ASC)
);

CREATE TABLE index_query
(
    id          VARCHAR(32)      NOT NULL,
    index_name  VARCHAR(32)      NOT NULL,
    text        VARCHAR(256)     NOT NULL,
    embedding   VARBINARY(40000) NOT NULL,
    created_at  DATETIME         NOT NULL,
    finished_at DATETIME         NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (index_name) REFERENCES `index` (name)
);

CREATE TABLE index_query_result
(
    index_query_id          VARCHAR(32) NOT NULL,
    document_index_chunk_id VARCHAR(32) NOT NULL,
    score                   FLOAT       NOT NULL,
    PRIMARY KEY (index_query_id, document_index_chunk_id),
    FOREIGN KEY (index_query_id) REFERENCES index_query (id),
    FOREIGN KEY (document_index_chunk_id) REFERENCES document_index_chunk (id)
);

CREATE TABLE chat
(
    id         VARCHAR(32) NOT NULL,
    index_name VARCHAR(32) NOT NULL,
    llm        VARCHAR(32) NOT NULL,
    llm_model  VARCHAR(32) NOT NULL,
    name       VARCHAR(32) NOT NULL,
    created_at DATETIME    NOT NULL,
    created_by VARCHAR(32) NOT NULL COMMENT 'a user id or session id',
    PRIMARY KEY (id)
);

CREATE TABLE chat_message
(
    id             VARCHAR(32)                          NOT NULL,
    chat_id        VARCHAR(32)                          NOT NULL,
    ordinal        INT                                  NOT NULL,
    role           ENUM ('system', 'user', 'assistant') NOT NULL,
    content        TEXT                                 NOT NULL,
    index_query_id VARCHAR(32)                          NULL,
    created_at     DATETIME                             NOT NULL,
    finished_at    DATETIME                             NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (chat_id, ordinal),
    FOREIGN KEY (index_query_id) REFERENCES index_query (id)
);

CREATE TABLE chat_message_context_documents
(
    chat_message_id VARCHAR(32) NOT NULL,
    ordinal         INT         NOT NULL,
    text_content    VARCHAR(32) NOT NULL,
    document_id     VARCHAR(32) NOT NULL,
    PRIMARY KEY (chat_message_id, ordinal),
    FOREIGN KEY (chat_message_id) REFERENCES chat_message (id)
);

CREATE VIEW v_document_index_status
AS
SELECT d.id                              AS document_id,
       i.name COLLATE utf8mb4_general_ci AS index_name,
       d.mime COLLATE utf8mb4_general_ci AS mime,
       IFNULL(
               CASE
                   WHEN di.created_at IS NULL THEN 'notIndexed'
                   WHEN di.created_at < i.created_at THEN 'staled'
                   WHEN di.status <> 'ok' THEN 'staled'
                   ELSE 'indexed'
                   END COLLATE utf8mb4_general_ci,
               'notIndexed' COLLATE utf8mb4_general_ci
       )                                 AS index_state
FROM document d
         LEFT JOIN document_index di ON d.id = di.document_id
         LEFT JOIN `index` i ON di.index_name = i.name;


CREATE TABLE import_source
(
    id             VARCHAR(32)  NOT NULL,
    url            VARCHAR(256) NOT NULL,
    created_at     DATETIME     NOT NULL,
    type           VARCHAR(64)  NOT NULL, -- github, sitemap
    filter_runtime VARCHAR(64)  NULL,     -- `host` (NodeJS 20)
    filter         TEXT         NULL,     -- filter script
    PRIMARY KEY (id),
    UNIQUE INDEX (url)
);

CREATE TABLE import_source_task
(
    id               INT AUTO_INCREMENT                                  NOT NULL,
    import_source_id VARCHAR(32)                                         NOT NULL,
    parent_task_id   INT                                                 NULL,     -- null if triggered by import source
    url              VARCHAR(256)                                        NOT NULL,
    type             VARCHAR(32)                                         NOT NULL, -- document, robots.txt, sitemap,
    created_at       DATETIME                                            NOT NULL,
    finished_at      DATETIME                                            NULL,     -- when status in [succeed, failed]
    status           ENUM ('succeed', 'failed', 'pending', 'processing') NOT NULL,
    document_id      VARCHAR(32)                                         NULL,     -- created document
    error            TEXT                                                NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (parent_task_id) REFERENCES import_source_task (id),
    FOREIGN KEY (import_source_id) REFERENCES import_source (id),
    FOREIGN KEY (document_id) REFERENCES document (id)
);

INSERT INTO `index`(name, llm, llm_model, splitter_type, splitter_options, created_at, last_modified_at)
VALUES ('default', 'openai', 'openai', 'whatever', '{}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
