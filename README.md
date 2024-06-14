<div align="center">
<h1>TiDB.AI</h1>
  <a href='https://tidb.cloud/?utm_source=github&utm_medium=tidb.ai'>
    <img src="https://raw.githubusercontent.com/pingcap/tidb.ai/main/www/public/nextra/icon-dark.svg" alt="TiDB.AI" width =100 height=100></img>
  </a>
</div>

## Introduction
A [WIP] conversational search RAG (Retrieval-Augmented Generation) app based on TiDB Serverless Vector Storage, providing a out-of-the-box and **embeddable** QA robot experience based on your knowledge on official and documentation sites.

**Live Demo**: [TiDB.AI](https://tidb.cloud/?utm_source=github&utm_medium=tidb.ai)

With this tool, you can achieve:

## Features
1. **Perplexity-style Conversational Search page**: Our platform features an advanced built-in website crawler, designed to elevate your browsing experience. This crawler effortlessly navigates official and documentation sites, ensuring comprehensive coverage and streamlined search processes through sitemap URL scraping.


![out-of-box-conversational-search](https://github.com/pingcap/tidb.ai/assets/1237528/0784e26e-8392-4bbe-bda1-6a680b12a805 "Image Title")

2. **Embeddable JavaScript Snippet**: Integrate our conversational search window effortlessly into your website by copying and embedding a simple JavaScript code snippet. This widget, typically placed at the bottom right corner of your site, facilitates instant responses to product-related queries.

![embeddable-javascript-snippet](https://github.com/pingcap/tidb.ai/assets/1237528/5a445231-a27a-4ae6-8287-a4f8cf7b64d0 "Image Title")


## Tech Stack
- [Next.js](https://nextjs.org/) – Framework
- [TypeScript](https://www.typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [shadcn/ui](https://ui.shadcn.com/) - Design
- [TiDB](https://tidb.cloud/) – Database to store chat history, vector, json, and analytic
- [Kysely](https://kysely.dev/) - SQL query builder
- [NextAuth.js](https://next-auth.js.org/) – Auth
- [Vercel](https://vercel.com/) – Deployments
- [LlamaIndex](https://www.llamaindex.ai/) - RAG framework


## License
TiDB.AI is open-source under the Apache License, Version 2.0. You can [find it here](/LICENSE.txt).
