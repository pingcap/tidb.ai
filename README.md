
<div align="center">
<h1>TiDB.AI</h1>
  <a href='https://tidb.cloud/?utm_source=github&utm_medium=tidb.ai'>
    <img src="/www/public/icon-light.svg" alt="TiDB.AI" height=100></img>
  </a>
</div>

## Introduction
A [WIP] out-of-the-box RAG (Retrieval-Augmented Generation) app based on the [WIP] vector storage in TiDB Serverless.

[![who-use-tidb](https://github.com/pingcap/tidb.ai/assets/1237528/0784e26e-8392-4bbe-bda1-6a680b12a805)](url)


## Features

## Local Deployment [WIP]
To deploy the application in a self-hosted environment, run the following command:

```shell
curl https://tidb.cloud/install.sh | sh
```
then:
```shell
ticloud create-app --template rag
```

This is all there is to do.

## Deploy to Vercel
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

## License
TiDB.AI is open-source under the Apache License, Version 2.0. You can [find it here](/LICENSE.txt).
