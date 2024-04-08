--
-- Initial Index Config
--
INSERT INTO `index` (id, name, config) VALUES (1, 'default', '{}');


-- Index Config: Provider
UPDATE `index`
SET config = JSON_MERGE_PATCH(config, '{
  "provider": "llamaindex"
}');

-- Index Config: LLM
UPDATE `index`
SET config = JSON_MERGE_PATCH(config, '{
  "llm": {
    "provider": "openai",
    "config": {
      "model": "gpt-3.5-turbo"
    }
  }
}');

-- Index Config: Reader
UPDATE
    `index`
SET
    config = JSON_MERGE_PATCH(config, '{
      "reader": {
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
      }
    }')
WHERE
    name = 'default';

-- Index Config: Parser
UPDATE
    `index`
SET
    config = JSON_MERGE_PATCH(config, '{
      "parser": {
      }
    }')
WHERE
    name = 'default';

-- Index Config: Metadata Extractor
UPDATE
    `index`
SET
    config = JSON_MERGE_PATCH(config, '{
      "metadata_extractors": [
        {
          "provider": "llamaindex.extractor.title",
          "config": {}
        },
        {
          "provider": "llamaindex.extractor.summary",
          "config": {}
        },
        {
          "provider": "llamaindex.extractor.keyword",
          "config": {}
        },
        {
          "provider": "llamaindex.extractor.question-answered",
          "config": {}
        }
      ]
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
        "config": {
          "model": "text-embedding-3-small"
        }
      }
    }')
WHERE
    name = 'default';

-- Index Config: LLM
UPDATE
    `index`
SET
    config = JSON_MERGE_PATCH(config, '{
      "llm": {
        "provider": "openai",
        "config": {
          "model": "gpt-3.5-turbo"
        }
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
