'use client';

import { RSCForm } from '@/components/auto-form/RSCForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { rag } from '@/core/interface';
import { getErrorMessage } from '@/lib/error';
import { handleErrors } from '@/lib/fetch';
import { createContext, type ReactNode, useContext, useState } from 'react';

const SplitterPlaygroundContext = createContext<{
  content: string
  setContent: (value: string) => void;
  result?: rag.ChunkedContent<any, any>;
  loading?: boolean;
  error?: unknown;
}>({
  content: '',
  setContent () {},
});

export function SplitterPlaygroundForm ({ identifier, defaultValues, children }: { identifier: string, defaultValues: any, children: ReactNode }) {
  const [content, setContent] = useState('');

  const [result, setResult] = useState<any>();
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(false);

  return (
    <RSCForm
      resolverApi={`/api/v1/extensions/${identifier}/validate-options`}
      onSubmit={async value => {
        try {
          setLoading(true);
          setError(undefined);
          const response = await fetch(`/api/v1/extensions/${identifier}/process`, {
            method: 'post',
            body: JSON.stringify({
              content: [content],
              options: value,
            }),
          })
            .then(handleErrors)
            .then(res => res.json().then(setResult), setError);
        } finally {
          setLoading(false);
        }
      }}
      defaultValues={defaultValues}
    >
      <SplitterPlaygroundContext.Provider value={{ result, content, setContent, error, loading }}>
        {children}
      </SplitterPlaygroundContext.Provider>
    </RSCForm>
  );
}

export function PlaygroundTextarea () {
  const { content, setContent } = useContext(SplitterPlaygroundContext);

  return (
    <Textarea
      className="w-full h-full resize-none"
      placeholder="Text content you want to test"
      value={content}
      onChange={e => setContent(e.currentTarget.value)}
    />
  );
}

export function PlaygroundError () {
  const { error } = useContext(SplitterPlaygroundContext);

  if (error) {
    return <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{getErrorMessage(error)}</AlertDescription>
    </Alert>;
  }
}

export function PlaygroundResult () {
  const { result } = useContext(SplitterPlaygroundContext);

  return (
    <div className="space-y-4">
      {result?.chunks.map((chunk, index) => (
        <div key={index} className="rounded-lg border space-y-4 text-xs p-4">
          <div className="text-muted-foreground flex items-center gap-2">
            <span className="font-semibold">
              Chunk {index}
            </span>
            <span>
              <code>{chunk.content.length}</code> Characters
            </span>
          </div>
          <div>{chunk.content}</div>
        </div>
      ))}
    </div>
  );
}

export function PlaygroundSubmit () {
  const { loading } = useContext(SplitterPlaygroundContext);

  return (
    <Button className="w-full" size="sm" disabled={loading}>
      Apply
    </Button>
  );
}