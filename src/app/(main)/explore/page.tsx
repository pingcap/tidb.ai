'use client';

import { DataTable } from '@/components/data-table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { DB } from '@/core/db/schema';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import type { Selectable } from 'kysely';
import { GithubIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';

const helper = createColumnHelper<Selectable<DB['document']>>();

const mono = (cell: CellContext<any, any>) => <span className="font-mono">{cell.getValue()}</span>;

const sourceUri = (cell: CellContext<any, any>) => {
  const value = cell.getValue();
  const REGEXP = /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/blob\/([^/]+))?/;

  const matched = REGEXP.exec(value);
  if (matched) {
    const [, owner, repo, branch] = matched;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <a href={value} target="_blank" className="flex items-center">
            <GithubIcon size="1em" className="mr-1" />
            <span>{owner}</span>
            /
            <span>{repo}</span>
            {branch && <>/<span>{branch}</span></>}
          </a>
        </TooltipTrigger>
        <TooltipContent className="text-xs">
          {value}
        </TooltipContent>
      </Tooltip>
    );
  }
  return <a href={value} target="_blank">{value}</a>;
};

const datetime = (cell: CellContext<any, any>) => <time>{format(cell.getValue(), 'yyyy-MM-dd HH:mm')}</time>;

const columns = [
  helper.accessor('id', { cell: mono }),
  helper.accessor('name', { cell: mono }),
  helper.accessor('mime', { cell: mono }),
  helper.accessor('source_uri', { cell: sourceUri }),
  helper.accessor('digest', { cell: mono }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('last_modified_at', { cell: datetime }),
] as ColumnDef<Selectable<DB['document']>>[];

export default function Page () {
  const { data, isLoading, isValidating } = useDocuments();

  useEffect(() => {
    if (isLoading || isValidating) {
      const id = toast('Loading...');
      return () => {
        toast.dismiss(id);
      };
    }
  }, [isLoading, isValidating]);

  return (
    <TooltipProvider>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Explore all documents</h1>
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </TooltipProvider>
  );
}

const fetcher = async ([url]: [string]) => {
  const res = await fetch(url);
  if (!res.ok || res.redirected) {
    const error = new Error(`${res.status} ${res.statusText}`);
    throw error;
  }

  return res.json();
};

function useDocuments () {
  return useSWR<Selectable<DB['document']>[]>(['/api/v1/documents'], fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
