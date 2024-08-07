<!-- markdownlint-disable MD033 MD041 -->

<div align="center">
<h1>TiDB.AI</h1>
  <a href='https://tidb.cloud/?utm_source=github&utm_medium=tidb.ai'>
    <img src="https://raw.githubusercontent.com/pingcap/tidb.ai/main/frontend/app/public/nextra/icon-dark.svg" alt="TiDB.AI" width =100 height=100></img>
  </a>
</div>

## Introduction

A conversational search tool based on GraphRAG (Knowledge Graph) that built on top of [TiDB Vector](https://tidb.cloud/ai) and [LlamaIndex](https://github.com/run-llama/llama_index) and [DSPy](https://github.com/stanfordnlp/dspy).

- **Live Demo**: [TiDB.AI](https://tidb.cloud/?utm_source=github&utm_medium=tidb.ai)
- **Documentation**: [Docs](https://tidb.ai/docs/?utm_source=github&utm_medium=tidb.ai)

## Features

1. **Perplexity-style Conversational Search page**: Our platform features an advanced built-in website crawler, designed to elevate your browsing experience. This crawler effortlessly navigates official and documentation sites, ensuring comprehensive coverage and streamlined search processes through sitemap URL scraping.

    ![out-of-box-conversational-search](https://github.com/pingcap/tidb.ai/assets/1237528/9cc87d32-14ac-47c6-b664-efa7ec53e751 "Image Title")

    You can even edit the Knowledge Graph to add more information or correct any inaccuracies. This feature is particularly useful for enhancing the search experience and ensuring that the information provided is accurate and up-to-date.

    ![out-of-box-conversational-search](https://github.com/pingcap/tidb.ai/assets/1237528/7bc57b34-99b7-4c4b-a098-9ad33dd0dfdc "Image Title")

2. **Embeddable JavaScript Snippet**: Integrate our conversational search window effortlessly into your website by copying and embedding a simple JavaScript code snippet. This widget, typically placed at the bottom right corner of your site, facilitates instant responses to product-related queries.

![embeddable-javascript-snippet](https://github.com/pingcap/tidb.ai/assets/1237528/5a445231-a27a-4ae6-8287-a4f8cf7b64d0 "Image Title")

## Deploy

> **Prerequisites:**
>
> 1. Set up a [TiDB Serverless cluster](https://docs.pingcap.com/tidbcloud/tidb-cloud-quickstart).
> 2. Install [Docker Compose](https://docs.docker.com/compose/install/).
> 3. Jina AI API key, get one from [Jina AI](https://jina.ai/reranker/).

1. Clone the repository:

    ```bash
    git clone https://github.com/pingcap/tidb.ai.git
    cd tidb.ai
    ```

2. Copy and edit the `.env` file:

    ```bash
    cp .env.example .env
    vim .env # or use another text editor to edit this file
    ```

    Replace the following placeholders with your own values:
    - `SECRET_KEY`: you can generate a random secret key using `python3 -c "import secrets; print(secrets.token_urlsafe(32))"`
    - `JINAAI_API_KEY`: get one from [Jina AI](https://jina.ai/reranker/)
    - `TIDB_HOST`, `TIDB_USER`, `TIDB_PASSWORD` and `TIDB_DATABASE`: get them from your [TiDB Serverless cluster](https://tidbcloud.com/)

      - Note: TiDB Serverless will provide a default database name called `test`, if you want to use another database name, you need to create a new database in the TiDB Serverless console.

3. Build docker images:

    ```bash
    docker compose build
    ```

4. Migrate the database schema:

    ```bash
    docker compose run backend /bin/sh -c "alembic upgrade head"
    ```

5. Bootstrap the database with initial data:

    ```bash
    docker compose run backend /bin/sh -c "python bootstrap.py"
    ```

    Running the bootstrap script creates an admin user. You can find the username and password in the output.

6. Start the services:

    ```bash
    docker compose up
    ```

7. Open your browser and visit `http://localhost:3000` to access the web interface.

## Tech Stack

- [TiDB](https://pingcap.com/ai/?utm_source=github&utm_medium=tidb.ai) – Database to store chat history, vector, json, and analytic
- [LlamaIndex](https://www.llamaindex.ai/) - RAG framework
- [DSPy](https://github.com/stanfordnlp/dspy) - The framework for programming—not prompting—foundation models
- [Next.js](https://nextjs.org/) – Framework
- [shadcn/ui](https://ui.shadcn.com/) - Design

## Contact Us

You can post topics on our [TiDB Community](https://ask.pingcap.com/) page.

## License

TiDB.AI is open-source under the Apache License, Version 2.0. You can [find it here](/LICENSE.txt).
