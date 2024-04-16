import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/docs/icon-black.svg" />
        <script
          async
          src='https://tidb.ai/rag-widget.js'
          data-id='tidb-ai-widget'
          data-name='tidb-ai-widget'
          data-btn-label='Ask AI'
          data-btn-img-src='https://tidb.ai/tidb-ai.svg'
          data-logo-src='https://tidb.ai/tidb-ai.svg'
          data-preferred-mode='system'
          data-widget-title='Conversation Search Box'
          data-widget-input-placeholder='Ask a question...'
          data-example-questions='["What is TiDB?","Does TiDB support FOREIGN KEY?","Does TiDB support serverless?"]'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
