'use client';

import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { RowCheckbox } from '@/components/ui/row-checkbox';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {getSortedRowModel, SortingState, Table as ReactTable} from "@tanstack/react-table"
import { TooltipProvider } from '@/components/ui/tooltip';
import { DataTableProvider } from '@/components/use-data-table';
import type { Page } from '@/lib/database';
import { fetcher } from '@/lib/fetch';
import {
  ColumnDef,
  type ColumnFilter,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import type { PaginationState } from '@tanstack/table-core';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

interface DataTableRemoteProps<TData, TValue> {
  idColumn: keyof TData;
  api: string;
  columns: ColumnDef<TData, TValue>[];
  selectable?: boolean;
  batchOperations?: (rows: string[], revalidate: () => void) => ReactNode;
  refreshInterval?: number | ((data: Page<TData> | undefined) => number);
  before?: ReactNode;
  after?: ReactNode;
  toolbar?: (table: ReactTable<TData>) => ReactNode;
  ts?: number;
  defaultSorting?: SortingState;
}

export function DataTableRemote<TData, TValue> ({
  idColumn,
  api,
  columns,
  selectable = false,
  batchOperations,
  refreshInterval,
  before,
  after,
  toolbar,
  ts,
  defaultSorting = [],
}: DataTableRemoteProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>(() => {
    return { pageIndex: 0, pageSize: 10 };
  });
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>(defaultSorting)

  const idSelection = useMemo(() => {
    return Object.keys(rowSelection);
  }, [rowSelection]);

  // Fetch data.
  const { data, mutate, isLoading, isValidating } = useSWR(
    [
      'get',
      api,
      {
        page: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
        ...columnFilters.reduce((res, column) => {
          res[column.id] = column.value;
          return res;
        }, {} as any),
        ...globalFilter && {
          q: globalFilter,
        },
        sorting: getSortingSearchString(sorting),
        ts,
      },
    ],
    fetcher<Page<TData>>, {
      refreshInterval,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      focusThrottleInterval: 1000
    });

  useEffect(() => {
    void mutate();
  }, [pagination.pageSize, pagination.pageIndex]);

  // Column definitions.
  columns = useMemo(() => {
    if (!selectable) {
      return columns;
    }

    return [
      {
        id: 'select',
        header: ({ table }) => (
          <RowCheckbox
            onClick={table.getToggleAllRowsSelectedHandler()}
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
          />
        ),
        cell: ({ row }) => (
          <div>
            <RowCheckbox
              onClick={row.getToggleSelectedHandler()}
              checked={row.getIsSelected()}
              indeterminate={row.getIsSomeSelected()}
              disabled={!row.getCanSelect()}
            />
          </div>
        ),
      },
      ...columns,
    ];
  }, [columns, selectable]);

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    pageCount: data ? Math.ceil(data.total / data.pageSize) : 1,
    manualPagination: true,
    manualFiltering: true,
    enableRowSelection: selectable,
    enableMultiRowSelection: selectable,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    onSortingChange: async (val) => {
      await mutate();
      setSorting(val);
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getRowId: item => String(item[idColumn]),
  });

  return (
    <DataTableProvider value={table}>
      {before}
      {toolbar ? toolbar(table) : null}
      <TooltipProvider>
        <div className="rounded-md border relative">
          <Table className="text-xs whitespace-nowrap">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
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
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Loader loading={isLoading || isValidating} />
        </div>
        <div className="flex w-full items-center gap-2 py-4">
          {selectable && (
            <>
              <span className="text-xs text-secondary-foreground">
                Selected {Object.keys(rowSelection).length} rows
              </span>
              {batchOperations?.(idSelection, () => mutate())}
            </>
          )}
          <Button
            className="ml-auto"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </TooltipProvider>
      {after}
    </DataTableProvider>
  );
}

function getSortingSearchString(sorting: SortingState) {
  return sorting.map(({ id, desc }) => `${id}:${desc ? 'desc' : 'asc'}`).join(',');
}