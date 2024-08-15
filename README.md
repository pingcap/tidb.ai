<!-- markdownlint-disable MD033 MD041 -->

<div align="center">
<h1>TiDB.AI</h1>
  <a href='https://tidb.cloud/?utm_source=github&utm_medium=tidb.ai'>
    <img src="https://raw.githubusercontent.com/pingcap/tidb.ai/main/frontend/app/public/nextra/icon-dark.svg" alt="TiDB.AI" width =100 height=100></img>
  </a>
</div>

![Backend Docker Image Version](https://img.shields.io/docker/v/tidbai/backend?sort=semver&arch=amd64&label=tidbai%2Fbackend)
![Frontend Docker Image Version](https://img.shields.io/docker/v/tidbai/frontend?sort=semver&arch=amd64&label=tidbai%2Ffrontend)

## Introduction

A open source alternative of Kapa.ai, conversational search tool based on GraphRAG (Knowledge Graph) built on top of [TiDB Vector](https://tidb.cloud/ai) and [LlamaIndex](https://github.com/run-llama/llama_index) and [DSPy](https://github.com/stanfordnlp/dspy).

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

- [Deploy with Docker Compose](https://tidb.ai/docs/deploy-with-docker)

## Tech Stack

- [TiDB](https://pingcap.com/ai/?utm_source=github&utm_medium=tidb.ai) – Database to store chat history, vector, json, and analytic
- [LlamaIndex](https://www.llamaindex.ai/) - RAG framework
- [DSPy](https://github.com/stanfordnlp/dspy) - The framework for programming—not prompting—foundation models
- [Next.js](https://nextjs.org/) – Framework
- [shadcn/ui](https://ui.shadcn.com/) - Design

## Contact Us

You can reach out to us on [@TiDB_Developer](https://twitter.com/TiDB_Developer) on Twitter.

## Contributing

We welcome contributions from the community. If you are interested in contributing to the project, please read the [Contributing Guidelines](/CONTRIBUTING.md).

## License

TiDB.AI is open-source under the Apache License, Version 2.0. You can [find it here](/LICENSE.txt).
