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
    config           JSON        NOT NULL,
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
    embedding    VECTOR NOT NULL COMMENT 'VECTOR',
    staled       BOOLEAN          NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (document_id) REFERENCES document (id),
    FOREIGN KEY (index_name) REFERENCES `index` (name),
    INDEX (document_id, ordinal ASC, staled)
);

CREATE TABLE index_query
(
    id          VARCHAR(32)      NOT NULL,
    index_name  VARCHAR(32)      NOT NULL,
    text        VARCHAR(256)     NOT NULL,
    embedding   VECTOR NOT NULL,
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
    name       VARCHAR(64) NOT NULL,
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
    url              VARCHAR(2048)                                       NOT NULL,
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

CREATE TABLE authentication_providers
(
    name    VARCHAR(32) NOT NULL,
    config  JSON        NOT NULL,
    enabled BOOLEAN     NOT NULL,
    PRIMARY KEY (name)
);

CREATE TABLE `option` (
    option_name VARCHAR(100) PRIMARY KEY,
    group_name VARCHAR(32),
    option_type ENUM('number', 'string', 'object', 'array') NOT NULL,
    option_value JSON,
    KEY idx_o_on_group_name(group_name)
);

INSERT INTO `option` VALUES
    ('title', 'website', 'string', '"tidb.ai"'),
    ('description', 'website', 'string', '"Hello TiDB Cloud!"'),
    ('logo_in_dark_mode', 'website', 'string', '"https://tidb.ai/tidb-ai-light.svg"'),
    ('logo_in_light_mode', 'website', 'string', '"https://tidb.ai/tidb-ai.svg"'),
    ('language', 'website', 'string', '"en-US"'),
    ('homepage.title', 'website', 'string', '"Ask anything about TiDB"'),
    ('homepage.description', 'website', 'string', '"Including company intro, user cases, product intro and usage, FAQ, etc."'),
    ('homepage.example_questions', 'website', 'array', '[{"text": "What is TiDB?"}, {"text": "Does TiDB support FOREIGN KEY?"}, {"text": "Does TiDB support serverless?"}]'),
    ('homepage.footer_links', 'website', 'array', '[{"text":"Docs","href":"/docs"},{"text":"Deploy your own within 5 minutes for free","href":"/docs"},{"text":"How it works?","href":"/docs"},{"text":"Powered by TiDB","href":"https://tidb.cloud"},{"text":"© 2024 PingCAP","href":"https://pingcap.com"}]'),
    ('social.github', 'website', 'string', '"https://github.com/pingcap/tidb.ai"'),
    ('social.twitter', 'website', 'string', '"https://twitter.com/PingCAP"'),
    ('social.discord', 'website', 'string', '"https://discord.gg/XzSW23Jg9p"');

INSERT INTO `option` VALUES
    ('button_label', 'custom_js', 'string', '"Ask AI"'),
    ('button_img_src', 'custom_js', 'string', '"https://tidb.ai/tidb-ai.svg"'),
    ('logo_src', 'custom_js', 'string', '"https://tidb.ai/tidb-ai.svg"'),
    ('example_questions', 'custom_js', 'array', '[{"text": "What is TiDB?"}, {"text": "Does TiDB support FOREIGN KEY?"}, {"text": "Does TiDB support serverless?"}]'),
    ('widget_title', 'custom_js', 'string', '"Conversation Search Box"'),
    ('widget_input_placeholder', 'custom_js', 'string', '"Ask a question..."'),
    ('widget_color_mode', 'custom_js', 'string', '"system"');

INSERT INTO `index`(name, llm, llm_model, config, created_at, last_modified_at)
VALUES ('default', 'openai', 'openai', '{}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

UPDATE `index`
SET config = JSON_MERGE_PATCH(config, '{
  "rag.loader.html": {
    "contentExtraction": [
      {
        "selectors": [
          {
            "selector": "#topic-title > h1",
            "type": "dom-text"
          },
          {
            "all": true,
            "selector": ".post",
            "type": "dom-text"
          }
        ],
        "url": "ask.pingcap.com/t/**"
      },
      {
        "selectors": [
          {
            "selector": ".doc-content",
            "type": "dom-text"
          }
        ],
        "url": "docs.pingcap.com/**"
      },
      {
        "selectors": [
          {
            "selector": ".wysiwyg--post-content",
            "type": "dom-text"
          }
        ],
        "url": "www.pingcap.com/blog/*"
      }
    ]
  }
}');

UPDATE `index`
SET config = JSON_MERGE_PATCH(config, '{
  "rag.prompting.direct": {
    "top_k": 5,
    "template": "Use the following pieces of context to answer the user question. This context retrieved from a knowledge base and you should use only the facts from the context to answer.\\nYour answer must be based on the context. If the context not contain the answer, just say that ''I don''t know'', don''t try to make up an answer, use the context.\\n\\n<contexts>\\n{%- for context in contexts %}\\n  <context source_uri=\\"{{context.source_uri}}\\" name=\\"{{context.source_name}}\\">\\n    <name>{{context.source_name}}</name>\\n    <source_uri>{{context.source_uri}}</source_uri>\\n    <content>{{context.text_content}}</content>\\n  </context>\\n{%- endfor %}\\n</contexts>\\n\\nYour answer must be based on the context, don''t use your own knowledge. \\n\\nUse markdown to answer. Write down uri reference you used for answer the question.\\n"
  }
}');

UPDATE `index`
SET config = JSON_MERGE_PATCH(config, '{
  "rag.splitter.langchain.recursive-character": {
    "chunkOverlap": 10,
    "chunkSize": 512,
    "separators": ["\\n\\n", "\\n", " ", ""]
  }
}');
