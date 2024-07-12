'use client';

import { type BaseCreateDatasourceParams, createDatasource, uploadFiles } from '@/api/datasources';
import { DataTable } from '@/components/data-table';
import { DataTableHeading } from '@/components/data-table-heading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { filesize } from 'filesize';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type Dispatch, type SetStateAction, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z, type ZodType } from 'zod';

const helper = createColumnHelper<File>();

const schema = z.object({
  name: z.string(),
  description: z.string(),
  build_kg_index: z.boolean(),
}) satisfies ZodType<BaseCreateDatasourceParams, any, any>;

export default function Page () {
  const [navigating, startNavigation] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      build_kg_index: false,
    },
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = form.handleSubmit(async data => {
    const uploadedFiles = await uploadFiles(files);
    const createdDatasource = await createDatasource({
      ...data,
      data_source_type: 'file',
      config: uploadedFiles.map(file => ({
        file_name: file.name,
        file_id: file.id,
      })),
    });
    startNavigation(() => {
      router.push(`/datasources/${createdDatasource.id}`);
    })
  });

  return (
    <Form {...form}>
      <form id="create-datasource-form" className="space-y-4" onSubmit={handleSubmit}>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <div className="mt-4 space-y-4">
        <Separator />
        <FilesField files={files} onFilesChange={setFiles} />
        <FormField
          name="build_kg_index"
          render={({ field }) => (
            <FormItem className="rounded-lg border p-4 flex items-center justify-between text-sky-500 bg-sky-500/5 border-sky-500/30">
              <div className="space-y-2">
                <FormLabel>Build KnowledgeGraph Index</FormLabel>
                <FormDescription className="text-sky-500/70">
                  Enable to build knowledge graph index.
                </FormDescription>
              </div>
              <FormControl>
                <Switch {...field} onChange={undefined} checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={files.length === 0 || navigating || form.formState.isSubmitting} className="gap-2" form="create-datasource-form">
          {(navigating || form.formState.isSubmitting) && <Loader2Icon className="size-4 animate-spin repeat-infinite" />}
          <span>Create</span>
        </Button>
      </div>
    </Form>
  );
}

function FilesField ({ files, onFilesChange }: { files: File[], onFilesChange: Dispatch<SetStateAction<File[]>> }) {
  const columns: ColumnDef<File, any>[] = useMemo(() => [
    helper.accessor('name', {}),
    helper.accessor('type', {}),
    helper.accessor('size', { cell: cell => filesize(cell.getValue()) }),
    helper.display({
      id: 'op',
      cell: (cell) => <Button
        variant="ghost"
        onClick={() => onFilesChange(([...files]) => {
          files.splice(cell.row.index, 1);
          return files;
        })}
      >
        Remove
      </Button>,
    }),
  ], []);

  const handleSelectFiles = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    if (ev.target.files) {
      const newFiles = Array.from(ev.target.files);
      onFilesChange(files => [...files, ...newFiles]);
    }
  };

  return (
    <>
      <DataTable<File, any>
        before={
          <DataTableHeading>
            <input className="hidden" id="x-select-files" type="file" multiple accept="text/plain, .md" onChange={handleSelectFiles} />
            <Button variant="secondary" onClick={() => document.getElementById('x-select-files')?.click()}>
              Select files...
            </Button>
            <div className="text-muted-foreground text-sm">Currently support Markdown (*.md) and Text (*.txt) files.</div>
          </DataTableHeading>
        }
        columns={columns}
        data={files}
      />
    </>
  );
}
