--
-- Initial Index Config
--

INSERT INTO `index` (id, name, config) VALUES (1, 'default', '{}');

-- TODO: New index config structure

-- Index Config: Reader / Loader
UPDATE
    `index`
SET
    config = JSON_MERGE_PATCH(config, '{
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
    }')
WHERE
    name = 'default';

-- Index Config: Prompting
-- TODO: Should using option table instead
UPDATE `index`
SET
    config = JSON_MERGE_PATCH(config, '{
      "rag.prompting.direct": {
        "top_k": 5,
        "template": "Use the following pieces of context to answer the user question. This context retrieved from a knowledge base and you should use only the facts from the context to answer.\\nYour answer must be based on the context. If the context not contain the answer, just say that ''I don''t know'', don''t try to make up an answer, use the context.\\n\\n<contexts>\\n{%- for context in contexts %}\\n  <context source_uri=\\"{{context.source_uri}}\\" name=\\"{{context.source_name}}\\">\\n    <name>{{context.source_name}}</name>\\n    <source_uri>{{context.source_uri}}</source_uri>\\n    <content>{{context.text_content}}</content>\\n  </context>\\n{%- endfor %}\\n</contexts>\\n\\nYour answer must be based on the context, don''t use your own knowledge. \\n\\nUse markdown to answer. Write down uri reference you used for answer the question.\\n"
      }
    }')
WHERE
    name = 'default';

-- Index Config: Splitter
UPDATE
    `index`
SET
    config = JSON_MERGE_PATCH(config, '{
      "rag.splitter.langchain.recursive-character": {
        "chunkOverlap": 10,
        "chunkSize": 512,
        "separators": ["\\n\\n", "\\n", " ", ""]
      }
    }')
WHERE
    name = 'default';

-- Index Config: Metadata Extractor
UPDATE
    `index`
SET
    config = JSON_MERGE_PATCH(config, '{
      "metadata_extractors": []
    }')
WHERE
    name = 'default';

-- Index Config: Embedding
UPDATE
    `index`
SET
    config = JSON_MERGE_PATCH(config, '{
      "embedding": {
        "provider": "openai",
        "model": "text-embedding-ada-002"
      }
    }')
WHERE
    name = 'default';

--
-- Initial Website Settings
--

-- Website Setting: General
INSERT INTO
    `option`
VALUES
    ('title', 'website', 'string', '"tidb.ai"'),
    ('description', 'website', 'string', '"Hello TiDB Cloud!"'),
    ('logo_in_dark_mode', 'website', 'string', '"https://tidb.ai/tidb-ai-light.svg"'),
    ('logo_in_light_mode', 'website', 'string', '"https://tidb.ai/tidb-ai.svg"'),
    ('language', 'website', 'string', '"en-US"');

-- Website Setting: Homepage
INSERT INTO
    `option`
VALUES
    ('homepage.title', 'website', 'string', '"Ask anything about TiDB"'),
    ('homepage.description', 'website', 'string', '"Including company intro, user cases, product intro and usage, FAQ, etc."'),
    ('homepage.example_questions', 'website', 'array', '[
      {"text": "What is TiDB?"},
      {"text": "Does TiDB support FOREIGN KEY?"},
      {"text": "Does TiDB support serverless?"}
    ]'),
    ('homepage.footer_links', 'website', 'array', '[
      {"text": "Docs", "href": "/docs"},
      {"text": "Deploy your own within 5 minutes for free", "href": "/docs"},
      {"text": "How it works?", "href": "/docs"},
      {"text": "Powered by TiDB", "href": "https://tidb.cloud"},
      {"text": "© 2024 PingCAP", "href": "https://pingcap.com"}
    ]');

-- Website Setting: Social Links
INSERT INTO
    `option`
VALUES
    ('social.github', 'website', 'string', '"https://github.com/pingcap/tidb.ai"'),
    ('social.twitter', 'website', 'string', '"https://twitter.com/PingCAP"'),
    ('social.discord', 'website', 'string', '"https://discord.gg/XzSW23Jg9p"');

-- Security Setting: Google Recaptcha
INSERT INTO `option` VALUES
    ('google_recaptcha', 'security', 'string', '"v3"'),
    ('google_recaptcha_site_key', 'security', 'string', '""'),
    ('google_recaptcha_secret_key', 'security', 'string', '""'),
    ('google_recaptcha_enterprise_project_id', 'security', 'string', '""');

-- Custom JS Setting
INSERT INTO
    `option`
VALUES
    ('button_label', 'custom_js', 'string', '"Ask AI"'),
    ('button_img_src', 'custom_js', 'string', '"https://tidb.ai/tidb-ai.svg"'),
    ('logo_src', 'custom_js', 'string', '"https://tidb.ai/tidb-ai.svg"'),
    ('example_questions', 'custom_js', 'array', '[
      {"text": "What is TiDB?"},
      {"text": "Does TiDB support FOREIGN KEY?"},
      {"text": "Does TiDB support serverless?"}
    ]'),
    ('widget_title', 'custom_js', 'string', '"Conversation Search Box"'),
    ('widget_input_placeholder', 'custom_js', 'string', '"Ask a question..."'),
    ('widget_color_mode', 'custom_js', 'string', '"system"');

--
-- Initial Preload Status
--

INSERT INTO
    status (status_name, status_type, status_value)
VALUES
    ('last_preload_at', 'date', '"1970-01-01"');
