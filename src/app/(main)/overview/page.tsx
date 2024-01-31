'use client';

import { Status, type StatusProps } from '@/components/status';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { getErrorMessage } from '@/lib/error';
import { fetcher, handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';
import { AlertTriangleIcon } from 'lucide-react';
import { type ReactElement, type ReactNode, useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import useSWR from 'swr';

export default function Page () {

  return (
    <div className="p-body space-y-6">
      <section className="grid grid-cols-4 gap-4">
        <IndexStats />
        <TaskStats />
        <ChatStats />
      </section>
      <section className="space-y-2">
        <h6 className="font-semibold">Import documents</h6>
      </section>
      <section className="space-y-2">
        <h6 className="font-semibold">Import documents</h6>
        <div className="flex gap-2">
          <ImportSiteDialog />
          <UploadFileDialog />
        </div>
      </section>
    </div>
  );
}

function IndexStats ({}: {}) {
  type IndexStatsData = Partial<Record<'notIndexed' | 'indexed' | 'staled', number>>
  const { data, isLoading } = useSWR(['get', '/api/v1/indexes/default/stats'], fetcher<IndexStatsData>, {
    refreshInterval: data => {
      if (data?.notIndexed || data?.staled) {
        return 1000;
      }
      return 5000;
    },
  });

  return (
    <StatsCard title="Index stats">
      <StatsList>
        <StatsEntry status="green" label="Indexed" loading={isLoading}>{data?.indexed ?? 0}</StatsEntry>
        <StatsEntry status="gray" label="Not indexed" loading={isLoading}>{data?.notIndexed ?? 0}</StatsEntry>
        <StatsEntry status="gray" label="Staled" loading={isLoading}>{data?.staled ?? 0}</StatsEntry>
      </StatsList>
    </StatsCard>
  );
}

function TaskStats () {
  type TaskStatsData = Partial<Record<'pending' | 'processing' | 'succeed' | 'failed', number>>
  const { data, isLoading } = useSWR(['get', '/api/v1/sources/tasks/stats'], fetcher<TaskStatsData>, {
    refreshInterval: data => {
      if (data?.processing || data?.pending) {
        return 1000;
      }

      return 5000;
    },
  });

  return (
    <StatsCard title="Import task stats">
      <StatsList>
        <StatsEntry status="green" label="Succeed" loading={isLoading}>{data?.succeed ?? 0}</StatsEntry>
        <StatsEntry status="blue" label="Processing" loading={isLoading}>{data?.processing ?? 0}</StatsEntry>
        <StatsEntry status="gray" label="Pending" loading={isLoading}>{data?.pending ?? 0}</StatsEntry>
        <StatsEntry status="red" label="Failed" loading={isLoading}>{data?.failed ?? 0}</StatsEntry>
      </StatsList>
    </StatsCard>
  );
}

function ChatStats () {
  type ChatStatsData = Partial<Record<'chats' | 'chat_messages', number>>;
  const { data, isLoading } = useSWR(['get', '/api/v1/chats/stats'], fetcher<ChatStatsData>);

  return (
    <StatsCard title="Chats">
      <StatsList>
        <StatsEntry label="Conversations" loading={isLoading}>{data?.chats ?? 0}</StatsEntry>
        <StatsEntry label="User Messages" loading={isLoading}>{data?.chat_messages ?? 0}</StatsEntry>
      </StatsList>
    </StatsCard>
  );
}

function StatsList ({ children }: { children: ReactNode }) {
  return (
    <dl className="space-y-2">
      {children}
    </dl>
  );
}

function StatsEntry ({ label, status, loading, children }: { label: ReactNode, status?: StatusProps['status'], loading: boolean, children: ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <dd>
        <Status simple status={status} title={label} className="flex-row-reverse" />
      </dd>
      <dt>
        <LoadingValue loading={loading}>
          <pre>{children}</pre>
        </LoadingValue>
      </dt>
    </div>
  );
}

function StatsCard ({ title, children }: { title?: ReactNode, children: ReactNode }) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs">
        {children}
      </CardContent>
    </Card>
  );
}

function LoadingValue ({ loading, children }: { loading: boolean, children: ReactNode }) {
  if (loading) {
    return <Skeleton className="inline-block w-6 align-middle" style={{ height: '1em' }} />;
  }

  return children;
}

function ImportSiteDialog () {
  return (
    <ImportDialog<ImportWebsiteFormValues>
      trigger={<Button>Import pages from your website</Button>}
      title="Import website"
      onSubmit={importWebsite}
    >
      <FormItem>
        <FormLabel>URL List</FormLabel>
        <FormField
          name="uriList"
          render={({ field }) => <Textarea {...field} />}
        />
        <FormDescription>
          One line for each url. Make sure your site has <code>robots.txt</code> containing sitemap.
        </FormDescription>
      </FormItem>
    </ImportDialog>
  );
}

type ImportWebsiteFormValues = {
  uriList: string
}

const importWebsite = withToast(async ({ uriList }: ImportWebsiteFormValues) => {
  await fetch('/api/v1/documents', {
    method: 'put',
    body: uriList,
    headers: {
      'Content-Type': 'text/uri-list',
    },
  }).then(handleErrors);
});

type UploadFileFormValues = {
  file: File;
  sourceUri: string;
}

function UploadFileDialog () {
  return (
    <ImportDialog
      trigger={<Button variant="secondary">Upload file</Button>}
      title="Upload file"
      onSubmit={uploadFile}>
      <FormItem>
        <FormField
          name="file"
          render={({ field: { onChange, value, ...field } }) => <Input type="file" {...field} onChange={e => onChange(e.target.files?.item(0))} />}
        />
        <FormDescription>
          Text, html, markdown or PDF
        </FormDescription>
      </FormItem>
      <FormItem>
        <FormLabel>Source URL</FormLabel>
        <FormField
          name="sourceUri"
          render={({ field }) => <Input {...field} />}
        />
        <FormDescription>
          Source URL is useful when AI generating answers.
        </FormDescription>
      </FormItem>
    </ImportDialog>
  );
}

const uploadFile = withToast(async ({ file, sourceUri }: UploadFileFormValues) => {
  const formData = new FormData();
  formData.set('file', file);
  formData.set('sourceUri', sourceUri);

  await fetch('/api/v1/documents', {
    method: 'put',
    body: formData,
  }).then(handleErrors);
});

function ImportDialog<T extends FieldValues> ({ title, description, onSubmit, trigger, children }: { title: ReactNode, onSubmit: (value: T) => Promise<void>, description?: ReactNode, trigger: ReactElement, children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const form = useForm<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const handleSubmit = form.handleSubmit(async (value) => {
    try {
      setLoading(true);
      await onSubmit(value);
      setOpen(false);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {title}
        </DialogHeader>
        {!!error && (<Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>
            Failed to submit
          </AlertTitle>
          <AlertDescription>
            {getErrorMessage(error)}
          </AlertDescription>
        </Alert>)}
        <Form {...form}>
          <form id="import-uri-list" className="space-y-4" onSubmit={handleSubmit}>
            {children}
          </form>
        </Form>
        {description && <DialogDescription>{description}</DialogDescription>}
        <DialogFooter>
          <Button form="import-uri-list" type="submit" disabled={loading}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
