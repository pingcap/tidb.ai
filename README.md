<div align="center">
<h1>TiDB.AI</h1>
  <a href='https://tidb.cloud/?utm_source=github&utm_medium=tidb.ai'>
    <img src="https://raw.githubusercontent.com/pingcap/tidb.ai/main/www/public/nextra/icon-dark.svg" alt="TiDB.AI" width =100 height=100></img>
  </a>
</div>

## Introduction
A [WIP] out-of-the-box RAG (Retrieval-Augmented Generation) app based on the working-in-progress vector storage feature within the TiDB Serverless. You can find a live demo at https://tidb.ai. With this tool, you can achieve:


## Features
1. Conversational Search with Built-in Web Crawler: Our AI-powered conversational search comes with a built-in website crawler. It can effortlessly scrape sitemap URL lists, enabling seamless information retrieval.

![who-use-tidb](https://github.com/pingcap/tidb.ai/assets/1237528/0784e26e-8392-4bbe-bda1-6a680b12a805 "Image Title")

2. Embeddable Conversational Search Widget: Integrate our conversational search window effortlessly into your website by copying and embedding a simple JavaScript code snippet. This widget, typically placed at the bottom right corner of your site, facilitates instant responses to product-related queries.

(screenshot to be uploaded)

## Quick Start [Working in Progress]
To deploy the application in a self-hosted environment, run the following command:

```
curl https://tidb.cloud/install.sh | sh
```
then:
```
ticloud create-app --template rag
```


## Deploy to Vercel [TODO]
For deploying the application to Vercel, you can use the 'Deploy to Vercel' button

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=YOUR_GITHUB_REPOSITORY_URL)


## Tech Stack
- [Next.js](https://nextjs.org/) – Framework
- [TypeScript](https://www.typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [shadcn/ui](https://ui.shadcn.com/) - Design
- [TiDB](https://tidb.cloud/) – Database to store chat history, vector, json, and analytic
- [Kysely](https://kysely.dev/) - SQL query builder
- [NextAuth.js](https://next-auth.js.org/) – Auth
- [Vercel](https://vercel.com/) – Deployments


## Roadmap & Timeline

* Migrate tidb.ai to a vector storage instance with indexing capabilities. Estimated completion by March 29th.
* Revise the table structure to accommodate the requirements of the llamaindex's RAG process and successfully integrate llamaindex. Target date: April 4th.
* Conduct tests on Jina.AI's embedding and reranker API functionalities. Expected to be done by April 15th.
* Complete deployment documentation with a target date of April 10th. This includes:
  * Self-hosted solutions.
  * Deployment on Vercel.
* Adapt the system for AWS Redrock Claude3, with an anticipated completion date of April 15th.
* Finalize the "How It Works" series of documentation by April 30th.


## License
TiDB.AI is open-source under the Apache License, Version 2.0. You can [find it here](/LICENSE.txt).
