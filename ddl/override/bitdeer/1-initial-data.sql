DROP TABLE llamaindex_document_chunk_node_default;
CREATE TABLE llamaindex_document_chunk_node_default
(
    id          BINARY(16)   NOT NULL,
    hash        VARCHAR(256) NOT NULL,
    text        TEXT         NOT NULL,
    metadata    JSON         NOT NULL,
    embedding   VECTOR<FLOAT>(1024) NULL COMMENT 'hnsw(distance=cosine)',
    index_id    INT          NOT NULL,
    document_id INT          NOT NULL,
    PRIMARY KEY (id),
    KEY idx_ldcn_on_index_id_document_id (index_id, document_id),
    FOREIGN KEY fk_ldcn_on_index_id (index_id) REFERENCES `index` (id),
    FOREIGN KEY fk_ldcn_on_document_id (document_id) REFERENCES `document` (id)
);

--
-- Default Index Config
--

INSERT INTO `index` (id, name, config) VALUES (1, 'default', '{
    "provider": "llamaindex",
    "llm": {
        "provider": "bitdeer",
        "config": {
            "model": "mistral"
        }
    },
    "embedding": {
        "provider": "bitdeer",
        "config": {
            "model": "mxbai-embed-large",
            "vectorColumn": "embedding",
            "vectorDimension": 1024
        }
    },
    "metadata_extractors": [],
    "parser": {
        "textSplitter": {
            "chunkSize": 512
        }
    },
    "reader": {
        "rag.loader.html": {
            "contentExtraction": [
                {
                    "selectors": [
                        {
                            "selector": "body"
                        }
                    ],
                    "excludeSelectors": [
                        {
                            "selector": ".header"
                        },
                        {
                            "selector": ".footer"
                        }
                    ],
                    "url": "www.bitdeer.com/**"
                }
            ]
        }
    }
}');

--
  -- Default Chat Engine Config
--

INSERT INTO chat_engine (name, engine, engine_options, is_default) VALUE ('default', 'condense-question', '{}', true);

UPDATE `chat_engine`
SET engine_options = JSON_MERGE_PATCH(engine_options, '{
    "index_id": 1,
    "llm": {
        "provider": "bitdeer",
        "config": {
            "model": "mistral"
        }
    },
    "prompts":{
        "condenseQuestion": "Given a conversation (between Human and Assistant) and a follow up message from Human, rewrite the message to be a standalone question that captures all relevant context from the conversation.\\n\\n<Chat History>\\n{{chatHistory}}\\n\\n<Follow Up Message>\\n{{question}}\\n\\n<Standalone question>\\n",
        "refine": "The original query is as follows: {{query}}\\nWe have provided an existing answer: {{existingAnswer}}\\nWe have the opportunity to refine the existing answer (only if needed) with some more context below.\\n------------\\n{{context}}\\n------------\\nGiven the new context, refine the original answer to better answer the query. If the context isn''t useful, return the original answer.\\nRefined Answer:",
        "textQa": "Context information is below.\\n---------------------\\n{{context}}\\n---------------------\\nGiven the context information and not prior knowledge, answer the query.\\nQuery: {{query}}\\nAnswer:"
    },
    "reranker": {},
    "retriever": {
        "search_top_k": 25,
        "top_k": 7
    }
}')
WHERE name = 'default';

--
-- Default Website Settings
--

-- Website Setting: General
INSERT INTO
    `option`
VALUES
    ('title', 'website', 'string', '"Bitdeer"'),
    ('description', 'website', 'string', '"Hello Bitdeer!"'),
    ('logo_in_dark_mode', 'website', 'string', '"https://tidb.ai/tidb-ai-light.svg"'),
    ('logo_in_light_mode', 'website', 'string', '"https://tidb.ai/tidb-ai.svg"'),
    ('language', 'website', 'string', '"en-US"');

-- Website Setting: Homepage
INSERT INTO
    `option`
VALUES
    ('homepage.title', 'website', 'string', '"Ask anything about Bitdeer"'),
    ('homepage.description', 'website', 'string', '"Including company intro, user cases, product intro and usage, FAQ, etc."'),
    ('homepage.example_questions', 'website', 'array', '[
        {"text": "What is Bitdeer?"},
        {"text": "Who use Bitdeer?"}
    ]'),
    ('homepage.footer_links', 'website', 'array', '[
        {"text": "Docs", "href": "/docs"},
        {"text": "Deploy your own within 5 minutes for free", "href": "/docs"},
        {"text": "How it works?", "href": "/docs"},
        {"text": "Powered by TiDB", "href": "https://tidb.cloud"},
        {"text": "© 2024 PingCAP", "href": "https://pingcap.com"}
    ]');

-- Custom JS Setting
INSERT INTO
    `option`
VALUES
    ('button_label', 'custom_js', 'string', '"Ask AI"'),
    ('button_img_src', 'custom_js', 'string', '"https://tidb.ai/tidb-ai.svg"'),
    ('logo_src', 'custom_js', 'string', '"https://tidb.ai/tidb-ai.svg"'),
    ('example_questions', 'custom_js', 'array', '[
        {"text": "What is Bitdeer?"},
        {"text": "Who use Bitdeer?"}
    ]'),
    ('widget_title', 'custom_js', 'string', '"Conversation Search Box"'),
    ('widget_input_placeholder', 'custom_js', 'string', '"Ask a question..."'),
    ('widget_color_mode', 'custom_js', 'string', '"system"');
