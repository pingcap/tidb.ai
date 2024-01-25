'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCompletion } from 'ai/react';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import * as prod from 'react/jsx-runtime';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import useSWR from 'swr';
import { unified } from 'unified';

const production = { Fragment: (prod as any).Fragment, jsx: (prod as any).jsx, jsxs: (prod as any).jsxs };

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeReact, production)
  .freeze();

function useRemarkReact (text: string) {
  const [el, setEl] = useState<ReactNode>(null);

  useEffect(() => {
    processor.process(text ?? '')
      .then(res => {
        setEl(res.result);
      });
  }, [text]);

  return el;
}

export default function Page () {
  const { completion, input, handleInputChange, handleSubmit, error, isLoading, queryId } = useAsk();
  const { data } = useQuery(queryId);

  const mdContent = useRemarkReact(completion);

  const uris = useMemo(() => {
    if (!data) {
      return [];
    }
    const files = new Set<string>();
    return data.filter((item: any) => {
      if (files.has(item.source_uri)) {
        return false;
      }
      files.add(item.source_uri);
      return item.source_uri;
    }).map((item: any) => item.source_uri);
  }, [data]);

  return (
    <div className="p-4 space-y-4">
      <div className="max-w-screen-sm mx-auto space-y-4 my-16">
        <h1 className="text-2xl font-semibold text-center">Ask a question about indexed document</h1>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <Input
            className="dark:invert flex-1"
            placeholder="Ask sth..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button disabled={isLoading}>Go</Button>
        </form>

        <div>
          {error && <Alert>
            <AlertTitle>
              {error.name}
            </AlertTitle>
            <AlertDescription>
              {error.message}
            </AlertDescription>
          </Alert>}
          {completion && <Card>
            <CardHeader>
              <CardTitle>
                {input}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <article className="prose prose-sm prose-neutral dark:prose-invert">
                {mdContent}
                <hr />
                <h6>
                  Context links
                </h6>
                {uris.length && (
                  <ul>
                    {uris.map((item: any, i: any) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            </CardContent>
          </Card>}
        </div>
      </div>
    </div>
  );
}

function useAsk () {
  const [queryId, setQueryId] = useState<string>();

  const completion = useCompletion({
    api: '/api/v1/ask',
    body: {
      retrieve_top_k: 10,
      index: 'default',
    },
    onResponse: (response) => {
      setQueryId(response.headers.get('X-Index-Query-Id') ?? undefined);
    },
  });

  return {
    ...completion,
    queryId,
  };
}

const fetcher = async ([url]: [string]) => {
  const res = await fetch(url);
  if (!res.ok || res.redirected) {
    const error = new Error(`${res.status} ${res.statusText}`);
    throw error;
  }

  return res.json();
};

function useQuery (queryId: string | undefined) {
  return useSWR(queryId && [`/api/v1/indexes/default/query/${queryId}/results`], fetcher);
}
