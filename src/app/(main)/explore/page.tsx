'use client';

import { DataTableRemote } from '@/components/data-table-remote';
import { Status } from '@/components/status';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { DB } from '@/core/db/schema';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import type { Selectable } from 'kysely';
import { GithubIcon } from 'lucide-react';

const helper = createColumnHelper<Selectable<DB['document']> & { index_state: string, metadata: any, trace: string | null }>();

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

const json = (cell: CellContext<any, any>) => {
  const metadata = cell.getValue();
  if (!metadata) {
    return '-';
  }
  return (
    <Tooltip>
      <TooltipTrigger>
        JSON
      </TooltipTrigger>
      <TooltipContent className="text-xs">
        <pre>{JSON.stringify(metadata, undefined, 2)}</pre>
      </TooltipContent>
    </Tooltip>
  );
};

const datetime = (cell: CellContext<any, any>) => <time>{format(cell.getValue(), 'yyyy-MM-dd HH:mm')}</time>;

const columns = [
  helper.accessor('id', { cell: mono }),
  helper.accessor('index_state', {
    cell: props => {
      const error = props.row.original.trace;
      switch (props.getValue()) {
        case 'notIndexed':
          return <Status title="Not indexed" status="gray" />;
        case 'indexed':
          return <Status title="Indexed" status="green" />;
        case 'indexing':
          return <Status title="Indexing" status="blue" />;
        case 'fail':
          return (
            <Tooltip>
              <TooltipTrigger>
                <Status title="Fail" status="red" />
              </TooltipTrigger>
              <TooltipContent>
                <h6 className="font-semibold mb-2">Error message</h6>
                <ScrollArea className="w-80 h-40">
                  <pre className="text-xs">
                     {error}
                  </pre>
                  <ScrollBar orientation="horizontal" />
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </TooltipContent>
            </Tooltip>
          );
      }
    },
  }),
  helper.accessor('metadata', {
    cell: json,
  }),
  helper.accessor('name', { cell: mono }),
  helper.accessor('mime', { cell: mono }),
  helper.accessor('source_uri', { cell: sourceUri }),
  helper.accessor('digest', { cell: mono }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('last_modified_at', { cell: datetime }),
] as ColumnDef<Selectable<DB['document']>>[];

export default function Page () {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold mb-4">Explore all documents</h1>

      <DataTableRemote
        columns={columns}
        api="/api/v1/documents"
        idColumn="id"
      />
    </div>
  );
}
