import { ImportDocumentsFromUrlsOptions, ImportDocumentsFromUrlsOptionsSchema } from '@/app/api/v1/documents/import/from/urls/schema';
import { importDocumentFromFile, importDocumentsFromUrls } from '@/client/operations/documents';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { getErrorMessage } from '@/lib/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangleIcon } from 'lucide-react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import z, { type ZodType } from 'zod';

export interface ImportDocumentsDialogProps {
  trigger: ReactNode;
}

type ImportMethod<T extends {}> = {
  type: string
  schema: ZodType<T>
  title: string
  description: ReactNode
  form: (form: UseFormReturn<T>) => ReactNode
  handler: (value: T) => Promise<void>
}

export function ImportDocumentsDialog (props: ImportDocumentsDialogProps) {
  const { trigger } = props;
  const [open, setOpen] = useState(false);
  const [methodType, setMethodType] = useState(importMethods[0].type);
  const method: ImportMethod<any> = useMemo(() => {
    return importMethods.find(method => method.type === methodType)!;
  }, [methodType]);

  // Form instance.
  const form = useForm<any>({
    defaultValues: {},
    resolver: zodResolver(method.schema),
  });

  useEffect(() => {
    form.reset();
  }, [method]);

  // UI state.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  // Handlers.
  const handleSubmit = form.handleSubmit(async (value) => {
    try {
      setLoading(true);
      await method.handler(value);
      setOpen(false);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {
        trigger && (<DialogTrigger asChild>{trigger}</DialogTrigger>)
      }
      <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
        <DialogHeader>Import documents</DialogHeader>
        <Tabs value={methodType} onValueChange={setMethodType}>
          <TabsList>
            {importMethods.map((method) => (
              <TabsTrigger key={method.type} value={method.type}>{method.title}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <DialogDescription>
          {method.description}
        </DialogDescription>
        <Form {...form}>
          <form id="import-document-form" className="space-y-4" onSubmit={handleSubmit}>
            {method.form(form)}
          </form>
        </Form>

        {!!error && (
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>
              Failed to operate
            </AlertTitle>
            <AlertDescription>
              {getErrorMessage(error)}
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button form="import-document-form" type="submit" disabled={loading}>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const importMethods = [
  {
    type: 'urls',
    schema: ImportDocumentsFromUrlsOptionsSchema,
    title: 'Import from URLs',
    description: 'Import documents from urls (one URL per line)',
    handler: async value => {
      await importDocumentsFromUrls({
        ...value,
        urls: value.urls.map(url => url.trim()).filter(Boolean),
      });
    },
    form: form => (
      <FormField
        control={form.control}
        name="urls"
        render={({ field }) => {
          return <FormItem>
            <Textarea {...field} value={(field.value ?? []).join('\n')} onChange={(e) => {
              return field.onChange((e.target.value ?? '').split('\n'));
            }} />
            <FormMessage />
          </FormItem>;
        }}
      />
    ),
  } satisfies ImportMethod<ImportDocumentsFromUrlsOptions>,
  {
    type: 'content',
    schema: z.object({
      file: z.instanceof(File, { message: 'Select a file' }),
    }),
    title: 'Upload',
    description: 'Upload txt, Markdown, HTML or PDF',
    handler: async value => importDocumentFromFile(value),
    form: form => (
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => {
          return <FormItem>
            <Input
              type="file"
              accept="text/plain, text/html, text/markdown"
              {...field}
              value={undefined}
              onChange={event => {
                field.onChange(event.target.files?.[0]);
              }}
            />
            <FormMessage />
          </FormItem>;
        }}
      />
    ),
  } satisfies ImportMethod<{ file: File }>,
];

