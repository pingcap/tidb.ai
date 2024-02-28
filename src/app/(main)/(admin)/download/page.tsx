'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher, handleErrors } from '@/lib/fetch';
import { useState } from 'react';
import useSWR from 'swr';
import { downloadZip } from 'client-zip';

export default function DownloadPage () {
  const [q, setQ] = useState('');

  const { data = [], isLoading } = useSWR(['get', '/api/v1/documents/batch-get-ids', {
    q,
  }], fetcher<string[]>, {
    revalidateOnMount: false, revalidateOnFocus: false, revalidateOnReconnect: false,
    refreshWhenHidden: false, refreshWhenOffline: false,
  });

  const { download, finished, downloading } = useDownloadZip();

  return (
    <>
      <AdminPageHeading title="Download data" />
      <div>
        <Input
          placeholder="Search..."
          disabled={isLoading}
          onKeyDown={e => {
            if (!e.nativeEvent.isComposing && e.key === 'Enter') {
              e.preventDefault();
              setQ(e.currentTarget.value);
            }
          }}
          onBlur={(e) => setQ(e.currentTarget.value)}
        />
      </div>
      <div>{isLoading ? <Skeleton className="inline-block w-7 h-4" /> : data.length} documents included.</div>
      <Button disabled={data.length === 0 || isLoading || downloading} onClick={() => download(data)}>
        Download text contents
      </Button>
      <Progress className='w-full' value={finished / data.length * 100} />
    </>
  );
}

function useDownloadZip () {
  const [finished, setFinished] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const download = async (ids: string[]) => {
    const docs: { name: string, source_uri: string, text_content: string }[] = [];
    setDownloading(true);
    setFinished(0);
    await Promise.allSettled(ids.map(id => fetch(`/api/v1/documents/${encodeURIComponent(id)}`)
      .then(handleErrors)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setFinished(i => i + 1);
        docs.push(data);
      })));
    setDownloading(false);

    const zip = downloadZip(docs.map(doc => ({
      name: parseSourceUri(doc.source_uri),
      input: doc.text_content,
    })))

    const link = document.createElement("a")
    link.href = URL.createObjectURL(await zip.blob())
    link.download = "text_contents.zip"
    link.click()
    link.remove()
  };

  return { download, finished, downloading };
}

function parseSourceUri (uri: string) {
  return uri.replace(/^https?:\/\//, '')
}
