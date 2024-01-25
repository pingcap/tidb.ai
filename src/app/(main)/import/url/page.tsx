'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ImportUrlPage () {

  const [url, setUrl] = useState('');
  const [resp, setResp] = useState('NO');

  return (
    <>
      <h1>Import document from URL</h1>
      <Input name="uri" placeholder="URL" value={url} onChange={e => setUrl(e.currentTarget.value)} />
      <Button onClick={() => void upload(url)}>go</Button>
      <br />
      <pre className="whitespace-pre-wrap">{(resp[0] as any).content}</pre>
    </>
  );
}

async function upload (url: string) {
  const id = toast.loading('Uploading document...');
  try {
    const response = await fetch('/api/v1/documents', {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/uri-list',
      },
      body: url,
    });

    if (!response.ok || response.redirected) {
      throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
    }

    toast.dismiss(id);
    toast.success((
      <div className='space-y-2'>
        <h1>Uploaded document</h1>
        <pre>{JSON.stringify(await response.json(), undefined, 2)}</pre>
      </div>
    ))
  } catch (e: any) {
    toast.dismiss(id);
    toast.error((
      <div className="space-y-2">
        <h6 className="text-lg">Upload document failed</h6>
        <p className="text-sm">{e.message}</p>
      </div>
    ));
  }
}

export const dynamic = 'force-dynamic';
