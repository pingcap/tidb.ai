'use client';

import { deleteEvaluationDataset, type EvaluationDataset, listEvaluationDatasets } from '@/api/evaluations';
import { actions } from '@/components/cells/actions';
import { datetime } from '@/components/cells/datetime';
import { link } from '@/components/cells/link';
import { mono } from '@/components/cells/mono';
import { DataTableRemote } from '@/components/data-table-remote';
import { mutateEvaluationDatasets } from '@/components/evaluations/hooks';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useDataTable } from '@/components/use-data-table';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const helper = createColumnHelper<EvaluationDataset>();

const columns = [
  helper.accessor('id', { header: 'ID', cell: mono }),
  helper.accessor('name', { header: 'Name', cell: link({ text: row => row.name, url: row => `/evaluation/datasets/${row.id}` }) }),
  helper.accessor('user_id', { header: 'User ID' }),
  helper.accessor('created_at', { header: 'Created At', cell: datetime }),
  helper.accessor('updated_at', { header: 'Updated At', cell: datetime }),
  helper.display({
    id: 'op',
    header: 'Operations',
    cell: actions(row => [
      {
        key: 'update',
        title: 'Update',
        action: context => {
          context.startTransition(() => {
            context.router.push(`/evaluation/datasets/${row.id}`);
          });
        },
      },
      {
        key: 'delete',
        title: 'Delete',
        dangerous: {},
        action: async context => {
          await deleteEvaluationDataset(row.id);
          context.startTransition(() => {
            context.router.refresh();
            void mutateEvaluationDatasets();
          });
          context.setDropdownOpen(false);
        },
      },
    ]),
  }),
] as ColumnDef<EvaluationDataset>[];

export function EvaluationDatasetsTable () {
  const [filter, setFilter] = useState<EvaluationDatasetFilter>({ keyword: '' });
  return (
    <DataTableRemote
      toolbar={() => (
        <EvaluationDatasetsFilter onFilterChange={setFilter} />
      )}
      columns={columns}
      apiKey="api.evaluation.datasets.list"
      api={page => listEvaluationDatasets({ ...page, ...filter })}
      apiDeps={[filter.keyword]}
      idColumn="id"
    />
  );
}

function EvaluationDatasetsFilter ({ onFilterChange }: { onFilterChange: (filters: EvaluationDatasetFilter) => void }) {
  const { loading } = useDataTable();

  const form = useForm({
    resolver: zodResolver(evaluationDatasetFilterSchema),
    defaultValues: {
      keyword: '',
    },
    disabled: loading,
  });

  const handleSubmit = form.handleSubmit(({ keyword, ...rest }) => {
    onFilterChange({
      keyword: keyword.trim(),
      ...rest,
    });
  });

  return (
    <Form {...form}>
      <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
        <FormField
          name="keyword"
          render={({ field }) => (
            <FormControl>
              <Input
                className="flex-1"
                placeholder="Search Evaluation Datasets..."
                {...field}
              />
            </FormControl>
          )}
        />
        <Button variant='secondary' disabled={form.formState.disabled} type="submit">
          Search
        </Button>
      </form>
    </Form>
  );
}

const evaluationDatasetFilterSchema = z.object({
  keyword: z.string(),
});

type EvaluationDatasetFilter = z.infer<typeof evaluationDatasetFilterSchema>;
