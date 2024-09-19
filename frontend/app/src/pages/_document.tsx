import { Head, Html, Main, NextScript } from 'next/document';

export default function Document () {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/docs/icon-black.svg" />
        <script async src="/widget.js" data-is-main-site="true" />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  );
}
