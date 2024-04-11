--
-- Database Schema for RAG Template
--

--
-- Schema for Data Import
--

-- Data Source
-- Store the information of the data source. (Could be a website, a database, etc.)
CREATE TABLE source
(
    id                 INT          NOT NULL AUTO_INCREMENT,
    url                VARCHAR(256) NOT NULL,
    created_at         DATETIME     NOT NULL,
    type               VARCHAR(32)  NOT NULL,
    next_reschedule_at DATETIME     NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uni_s_on_url (url)
);

-- Document
-- Store the information of the document, include WebPage, PDF, Image, etc.
CREATE TABLE `document` (
    id                 INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    hash               CHAR(32)     NOT NULL,
    name               VARCHAR(256) NOT NULL,
    mime               VARCHAR(64)  NOT NULL,
    content_uri        VARCHAR(256) NOT NULL,
    source_uri         VARCHAR(256) NOT NULL,
    created_at         DATETIME     NOT NULL,
    last_modified_at   DATETIME     NOT NULL,
    KEY idx_d_on_source_uri (source_uri)
);

-- Document Import Task
CREATE TABLE document_import_task
(
    id                 INT                                                              NOT NULL AUTO_INCREMENT,
    url                VARCHAR(2048)                                                    NOT NULL,
    type               VARCHAR(32)                                                      NOT NULL,
    status             ENUM('CREATED', 'PENDING', 'IMPORTING', 'SUCCEED', 'FAILED')     NOT NULL,
    error_message      TEXT                                                             NULL,
    created_at         DATETIME                                                         NOT NULL,
    finished_at        DATETIME                                                         NULL,
    source_id          INT                                                              NOT NULL,
    document_id        INT                                                              NULL,
    document_operation ENUM('CREATE', 'UPDATE')                                         NULL,
    parent_task_id     INT                                                              NULL,
    PRIMARY KEY (id),
    FOREIGN KEY fk_sit_on_source_id (source_id) REFERENCES source (id),
    FOREIGN KEY fk_sit_on_parent_task_id (parent_task_id) REFERENCES document_import_task (id),
    FOREIGN KEY fk_sit_on_document_id (document_id) REFERENCES document (id)
);

--
-- Schema for Data Index (using llamaIndex by default)
--

-- The Config of the indexing process
CREATE TABLE IF NOT EXISTS `index` (
    id                  INT             NOT NULL PRIMARY KEY,
    name                VARCHAR(20)     NOT NULL,
    -- { provider: 'llamaindex', reader: { ... }, parser: { ... }, metadata_extractors: [ ... ], embedding: { ... } }
    config              JSON            NOT NULL,
    configured          BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Document Index tasks
CREATE TABLE `document_index_task` (
    id               INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    index_id         INT            NOT NULL,
    document_id      INT            NOT NULL,
    type             ENUM('CREATE_INDEX', 'REINDEX') NOT NULL ,
    status           ENUM('CREATED', 'PENDING', 'INDEXING', 'SUCCEED', 'FAILED') NOT NULL ,
    info             JSON           NULL NOT NULL ,
    message          TEXT           NULL,
    created_at       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    started_at       DATETIME       NULL,
    ended_at         DATETIME       NULL,
    FOREIGN KEY fk_dit_on_index_id (index_id) REFERENCES `index`(id),
    FOREIGN KEY fk_dit_on_document_id (document_id) REFERENCES `document`(id)
);

-- Document Node (Derived From Text Node)
CREATE TABLE `llamaindex_document_node` (
    -- Common Text Node Fields
    id              BINARY(16)      NOT NULL,
    hash            CHAR(32)        NOT NULL,
    text            LONGTEXT        NOT NULL,
    metadata        JSON NOT        NULL,
    -- Extra Document Node Fields
    index_id        INT             NOT NULL,
    document_id     INT             NOT NULL,
    index_info      JSON            NOT NULL,    -- Information about the process of indexing.
    indexed_at      DATETIME        NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uni_ldn_on_index_id_document_id (index_id, document_id),
    FOREIGN KEY fk_ldn_on_index_id (index_id) REFERENCES `index` (id),
    FOREIGN KEY fk_ldn_on_document_id (document_id) REFERENCES `document` (id)
);

-- Document Chunk Node (Derived From Text Node)
-- Every index have a document_chunk_node table, the table name is `llamaindex_document_chunk_node_${index_name}`
CREATE TABLE IF NOT EXISTS llamaindex_document_chunk_node_default (
    -- Text Node Common Fields
    id              BINARY(16)          NOT NULL,
    hash            VARCHAR(256)        NOT NULL,
    text            TEXT                NOT NULL,
    metadata        JSON                NOT NULL,
    embedding       VECTOR<FLOAT>(1536) NULL        COMMENT 'hnsw(distance=cosine)',
    -- Extra Document Chunk Node Fields
    index_id        INT                 NOT NULL,
    document_id     INT                 NOT NULL,
    PRIMARY KEY (id),
    KEY idx_ldcn_on_index_id_document_id (index_id, document_id),
    FOREIGN KEY fk_ldcn_on_index_id (index_id) REFERENCES `index` (id),
    FOREIGN KEY fk_ldcn_on_document_id (document_id) REFERENCES `document` (id)
);

-- Node Relationship
CREATE TABLE IF NOT EXISTS llamaindex_node_relationship (
    source_node_id  BINARY(16),
    type            ENUM('SOURCE', 'PREVIOUS', 'NEXT', 'PARENT', 'CHILD'),
    target_node_id  BINARY(16),
    PRIMARY KEY (source_node_id, type, target_node_id)
);

--
-- Schema for Data Recall
--

-- Chat
CREATE TABLE chat
(
    id             INT          NOT NULL AUTO_INCREMENT,
    url_key        VARCHAR(36)  NOT NULL,
    title          VARCHAR(256) NOT NULL,
    engine         VARCHAR(32)  NOT NULL,
    engine_options JSON         NOT NULL,
    created_at     DATETIME     NOT NULL,
    created_by     VARCHAR(32)  NOT NULL,
    deleted_at     DATETIME     NULL,
    deleted_by     VARCHAR(32)  NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX (url_key)
);

-- Chat engine config
CREATE TABLE chat_engine
(
    id             INT          NOT NULL AUTO_INCREMENT,
    name           VARCHAR(256) NOT NULL,
    engine         VARCHAR(256) NOT NULL,
    engine_options JSON         NOT NULL,
    is_default     BOOLEAN      NOT NULL,
    PRIMARY KEY    (id)
);

-- Messages in Chat
CREATE TABLE chat_message
(
    id            INT                                                NOT NULL AUTO_INCREMENT,
    chat_id       INT                                                NOT NULL,
    ordinal       INT                                                NOT NULL,
    role          VARCHAR(32)                                        NOT NULL,
    content       TEXT                                               NOT NULL,
    -- ChatOptions { llm, namespaces?, topk?, rerank_topk? }
    options       JSON                                               NOT NULL,
    status        ENUM('CREATED', 'GENERATING', 'SUCCEED', 'FAILED') NOT NULL,
    error_message TEXT                                               NULL,
    created_at    DATETIME                                           NOT NULL,
    finished_at   DATETIME                                           NULL,
    deleted_at    DATETIME                                           NULL,
    delete_reason ENUM('FORCE', 'REGENERATE')                        NULL,
    PRIMARY KEY (id),
    FOREIGN KEY fk_cm_on_chat_id (chat_id) REFERENCES chat (id)
);


-- Retrieve
CREATE TABLE retrieve
(
    id                INT              NOT NULL AUTO_INCREMENT,
    text              TEXT             NOT NULL,
    index_id          INT              NOT NULL,
    -- If rerank fails, you can actually use the results of ANN search directly.
    status            ENUM('CREATED', 'SEARCHING', 'RERANKING', 'SUCCEED', 'FAILED') NOT NULL,
    error_message     TEXT             NULL,
    options           JSON             NOT NULL,
    created_at        DATETIME         NOT NULL,
    search_started_at DATETIME,
    search_ended_at   DATETIME,
    rerank_started_at DATETIME,
    rerank_ended_at   DATETIME,
    finished_at       DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY fk_r_on_index_id (index_id) REFERENCES `index` (id)
);

-- Chat Message Retrieve Relationship
CREATE TABLE chat_message_retrieve_rel
(
    chat_message_id  INT         NOT NULL,
    retrieve_id      INT         NOT NULL,
    info             JSON        NOT NULL,
    PRIMARY KEY (chat_message_id, retrieve_id),
    FOREIGN KEY fk_cmrr_on_chat_message_id (chat_message_id) REFERENCES chat_message (id),
    FOREIGN KEY fk_cmrr_on_retrieve_id (retrieve_id) REFERENCES retrieve (id)
);

-- Retrieve Result
-- Store the results of the retrieve process.
CREATE TABLE retrieve_result
(
    id                     INT        NOT NULL AUTO_INCREMENT,
    retrieve_id            INT        NOT NULL,
    relevance_score        FLOAT      NOT NULL,
    document_id            INT        NOT NULL,
    document_chunk_node_id BINARY(16) NOT NULL,
    document_node_id       BINARY(16) NOT NULL,
    chunk_text             TEXT       NOT NULL,
    chunk_metadata         JSON       NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY fk_rr_on_retrieve_id (retrieve_id) REFERENCES retrieve(id),
    FOREIGN KEY fk_rr_on_document_id (document_id) REFERENCES document(id)
);

-- Authentication Providers
-- Store the configuration of authentication providers.
CREATE TABLE authentication_providers
(
    name    VARCHAR(32) NOT NULL,
    config  JSON        NOT NULL,
    enabled BOOLEAN     NOT NULL,
    PRIMARY KEY (name)
);

-- Option
-- Store the configuration of the application.
CREATE TABLE `option`
(
    option_name  VARCHAR(100) PRIMARY KEY,
    group_name   VARCHAR(32)  NOT NULL,
    option_type  ENUM ('number', 'string', 'object', 'array') NOT NULL,
    option_value JSON         NOT NULL,
    KEY idx_o_on_group_name (group_name)
);

-- Status
-- Store the status of the application.
CREATE TABLE status
(
    status_name     VARCHAR(100)   NOT NULL PRIMARY KEY,
    status_type     ENUM('number', 'string', 'object', 'array', 'date') NOT NULL,
    status_value    JSON           NULL,
    created_at      DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
