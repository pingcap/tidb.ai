'use client';

import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination';
import { RowCheckbox } from '@/components/ui/row-checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DataTableProvider } from '@/components/use-data-table';
import type { Page } from '@/lib/database';
import { fetcher } from '@/lib/fetch';
import { ColumnDef, type ColumnFilter, flexRender, getCoreRowModel, getSortedRowModel, SortingState, Table as ReactTable, useReactTable } from '@tanstack/react-table';
import type { PaginationState } from '@tanstack/table-core';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);

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
      focusThrottleInterval: 1000,
      keepPreviousData: true,
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
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Loader loading={isLoading || isValidating} />
        </div>
        <div className="flex w-full gap-2 py-4">
          {selectable && (
            <>
              <span className="text-xs text-secondary-foreground">
                Selected {Object.keys(rowSelection).length} rows
              </span>
              {batchOperations?.(idSelection, () => mutate())}
            </>
          )}
          <TablePagination className="mx-0 ml-auto w-max" loading={isLoading} table={table} />
        </div>
      </TooltipProvider>
      {after}
    </DataTableProvider>
  );
}

function getSortingSearchString (sorting: SortingState) {
  return sorting.map(({ id, desc }) => `${id}:${desc ? 'desc' : 'asc'}`).join(',');
}

const sizes = [10, 20, 50, 100];

function TablePagination ({ className, limit = 4, loading, table }: { className?: string, limit?: number, loading: boolean, table: ReactTable<any> }) {
  const options = table.getPageOptions();
  const pagination = table.getState().pagination;

  const min = Math.max(pagination.pageIndex - limit / 2, 0);
  const max = Math.min(min + limit + 1, options.length - 1);

  if (min >= max) {
    return <span className={className} />;
  }

  return (
    <Pagination className={className}>
      <Select value={String(pagination.pageSize)} onValueChange={value => table.setPageSize(Number(value))}>
        <SelectTrigger className="w-max">
          {pagination.pageSize} / page
        </SelectTrigger>
        <SelectContent>
          {sizes.map(size => (
            <SelectItem value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <PaginationContent>
        <PaginationItem>
          <Button variant="ghost" size="icon" disabled={loading || !table.getCanPreviousPage()} onClick={() => table.previousPage()}>
            <ChevronLeft />
          </Button>
        </PaginationItem>
        {min > 0 && (
          <PaginationItem>
            <Button variant="ghost" size="icon" disabled={loading} onClick={() => table.setPageIndex(0)}>
              1
            </Button>
          </PaginationItem>
        )}
        {min > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {steps(min, max).map((page) => (
          <PaginationItem key={page}>
            <Button
              variant={page === pagination.pageIndex ? 'outline' : 'ghost'}
              disabled={loading}
              size="icon"
              onClick={() => table.setPageIndex(page)}
            >
              {page + 1}
            </Button>
          </PaginationItem>
        ))}
        {(max < options.length - 2) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {(max < options.length - 1) && (
          <PaginationItem>
            <Button variant="ghost" size="icon" disabled={loading} onClick={() => table.setPageIndex(options.length - 1)}>
              {options.length}
            </Button>
          </PaginationItem>
        )}
        <PaginationItem>
          <Button variant="ghost" size="icon" disabled={loading || !table.getCanNextPage()} onClick={() => table.nextPage()}>
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function steps (from: number, to: number) {
  if (from >= to) {
    return [];
  }
  let arr = new Array(to - from + 1);
  for (let i = from; i <= to; i++) {
    arr[i - from] = i;
  }

  return arr;
}
