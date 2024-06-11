import { metadataCell } from '@/components/cells/metadata';
import type { Entity } from '@/components/graph/api';
import { Loader } from '@/components/loader';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { type ColumnDef, flexRender, Table as ReactTable } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { AlertTriangleIcon } from 'lucide-react';

export interface RemoteEntity extends Partial<Omit<Entity, 'id'>> {
  id: number | string;
  isLoading?: boolean;
  error?: unknown;
}

export function EntitiesTable ({ className, isLoading, table }: { className?: string, isLoading: boolean, table: ReactTable<RemoteEntity> }) {
  return (
    <TooltipProvider>
      <div className={cn('rounded-md border max-w-full max-h-[360px] overflow-x-hidden relative', className)}>
        <Loader loading={isLoading}>
          Searching entities...
        </Loader>
        <Table className="table-auto text-xs whitespace-nowrap">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="sticky top-0">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={entityColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}

const helper = createColumnHelper<RemoteEntity>();

export const entityColumns: ColumnDef<RemoteEntity, any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  helper.accessor('id', {}),
  helper.accessor('name', {
    cell: ({ getValue, row }) => {
      if (row.original.isLoading) {
        return <Skeleton className="w-12 h-4" />;
      }

      if (!!row.original.error) {
        return (
          <span className="text-destructive flex items-center gap-2 text-xs">
            <AlertTriangleIcon className="w-3 h-3" />
            <span>
              Failed to find entity #{row.id}
            </span>
          </span>
        );
      }

      return getValue();
    },
  }),
  helper.accessor('description', {
    cell: ({ getValue, row }) => {
      if (row.original.isLoading) {
        return <Skeleton className="w-12 h-4" />;
      }
      const maxLength = 80;
      const description = getValue() ?? '';
      if (description.length > maxLength) {
        return (
          <Tooltip>
            <TooltipTrigger>
              {description.slice(0, maxLength - 3) + '...'}
            </TooltipTrigger>
            <TooltipContent className="max-w-sm break-words text-wrap" align="start">
              <TooltipArrow className="fill-background" />
              <p className="text-xs">
                {description}
              </p>
            </TooltipContent>
          </Tooltip>
        );
      } else {
        return description;
      }
    },
  }),
  helper.accessor('meta', { cell: metadataCell }),
];

