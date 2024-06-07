import { metadataCell } from '@/components/cells/metadata';
import { createSynopsisEntity, type Entity, handleServerEntity, type ServerEntity } from '@/components/graph/api';
import { JsonEditor } from '@/components/graph/components/JsonEditor';
import { Loader } from '@/components/loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Index } from '@/core/repositories/index_';
import { fetcher } from '@/lib/fetch';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { RowSelectionState } from '@tanstack/table-core';
import { createColumnHelper } from '@tanstack/table-core';
import isHotkey from 'is-hotkey';
import { Maximize2Icon, PlusIcon } from 'lucide-react';
import type monaco from 'monaco-editor';
import { useRouter } from 'next/navigation';
import { type ReactNode, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import z from 'zod';

export function GraphEntitiesTable ({ index, className }: { index: Index, className?: string }) {
  const { filter, setFilter, table, selectedEntities, isLoading, clearSelection, error } = useGraphEntitiesTable();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="lg:max-w-[50vw]">
        <CreateEntityForm
          entities={selectedEntities}
          onSubmit={async (data) => {
            const createdEntity = await createSynopsisEntity(data);
            router.push(`/indexes/${index.id}/graph-editor?query=entity:${createdEntity.id}`);
          }}
          onClearSelection={clearSelection}
          afterEntities={(
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Select entities
                </Button>
              </DialogTrigger>
              <DialogContent className="overflow-x-hidden max-w-screen-md space-y-2">
                <DialogHeader>
                  <DialogTitle>
                    Add entities
                  </DialogTitle>
                </DialogHeader>
                <TableFilterForm filter={filter} onFilterChange={setFilter} disabled={isLoading} />
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
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                              No results.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TooltipProvider>
                <DialogClose asChild>
                  <Button>Confirm</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          )}
        />
      </div>
    </div>
  );
}

function TableFilterForm ({ className, filter, onFilterChange, disabled }: { className?: string, filter: TableFilter, onFilterChange: (filter: TableFilter) => void, disabled?: boolean }) {
  const form = useForm<TableFilter>({
    values: filter,
    resolver: zodResolver(tableFilterSchema),
    disabled,
    defaultValues: {
      query: '',
      top_k: undefined,
    },
  });

  return (
    <Form {...form}>
      <form className={cn('flex gap-2 items-center', className)} onSubmit={event => {
        event.stopPropagation();
        event.preventDefault();
        return false;
      }}>
        <FormField
          name="query"
          render={({ field }) => (
            <FormControl>
              <Input
                {...field}
                placeholder="Input your query..."
                onKeyDown={ev => {
                  if (isHotkey('Entry', ev)) {
                    onFilterChange(form.getValues());
                  }
                }}
              />
            </FormControl>
          )}
        />
        <Button className="w-max" variant="secondary" type="button" onClick={() => { onFilterChange(form.getValues()); }} disabled={disabled}>Search</Button>
      </form>
    </Form>
  );
}

function CreateEntityForm ({ className, entities, onSubmit, onClearSelection, afterEntities }: { className?: string, entities: Entity[], onSubmit: (data: z.infer<typeof createEntitySchema> & { meta: any, entities: number[] }) => Promise<void>, onClearSelection: (id?: number) => void, afterEntities?: ReactNode }) {
  const form = useForm<z.infer<typeof createEntitySchema>>({
    resolver: zodResolver(createEntitySchema),
    defaultValues: {
      name: '',
      description: '',
      topic: '',
    },
  });
  const metaRef = useRef<monaco.editor.IStandaloneCodeEditor | undefined | null>(null);

  const handleSubmit = form.handleSubmit(async values => onSubmit({
    ...values,
    meta: JSON.parse(metaRef.current!.getValue()),
    entities: entities.map(entity => Number(entity.id)),
  }));

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickFullscreen = () => {
    containerRef.current?.requestFullscreen();
  };

  return (
    <Form {...form}>
      <form className={cn('space-y-4', className)} onSubmit={handleSubmit}>
        <h2 className="font-bold text-xl">Create synopsis entity</h2>
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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <div className="flex items-center justify-between">
            <Label>
              Meta
            </Label>
            <button className="text-foreground/50 hover:text-foreground transition-colors" onMouseDown={handleClickFullscreen}>
              <Maximize2Icon className="w-3 h-3" />
            </button>
          </div>
          <FormControl>
            <div className="w-full h-32 border" ref={containerRef}>
              <JsonEditor defaultValue="{}" ref={metaRef} />
            </div>
          </FormControl>
        </FormItem>
        <FormItem>
          <Label>Entities</Label>
          <TooltipProvider>
            <div className="flex gap-2 flex-wrap">
              {entities.map(entity => (
                <Tooltip key={entity.id}>
                  <TooltipTrigger type="button">
                    <Badge key={entity.id} variant="secondary">{entity.name} #{entity.id}</Badge>
                  </TooltipTrigger>
                  <TooltipContent className="space-y-2 w-[360px]">
                    <h3 className="font-bold">{entity.name} #{entity.id}</h3>
                    <p className="text-xs text-accent-foreground">{entity.description}</p>
                    <Button variant="secondary" className="w-full mt-4" size="sm" onClick={() => onClearSelection(Number(entity.id))}>Remove from entities</Button>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
          <div className="grid grid-cols-2 gap-2">
            {afterEntities}
            <Button variant="ghost" onClick={() => onClearSelection()}>
              Clear Selection
            </Button>
          </div>
        </FormItem>
        <div className="!mt-8">
          <Button type="submit">Create Entity</Button>
        </div>
      </form>
    </Form>
  );
}

type TableFilter = {
  query: string;
  top_k?: number
}

const tableFilterSchema = z.object({
  query: z.string(),
  top_k: z.coerce.number().optional(),
});

const createEntitySchema = z.object({
  name: z.string().min(1).regex(/\S/),
  description: z.string().min(1).regex(/\S/),
  topic: z.string().min(1).regex(/\S/),
});

function shouldFetch (filter: TableFilter) {
  return !!filter.query.trim();
}

function useGraphEntitiesTable () {
  const [filter, setFilter] = useState<TableFilter>(() => ({ query: '', top_k: undefined }));

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const entityMap = useRef<Map<string, Entity>>(undefined as never);
  if (!entityMap.current) {
    entityMap.current = new Map<string, Entity>();
  }

  const { data, isLoading, error } = useSWR(shouldFetch(filter) && ['get', '/api/v1/indexes/graph/entities/search', filter], fetcher<ServerEntity[]>, {
    revalidateOnFocus: false,
  });

  const entities = useMemo(() => {
    if (data) {
      return data.map(serverEntity => {
        const entity = handleServerEntity(serverEntity);
        entityMap.current.set(String(entity.id), entity);
        return entity;
      });
    } else {
      return [];
    }
  }, [data]);

  const table = useReactTable<Entity>({
    data: entities,
    getRowId: row => String(row.id),
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    enableMultiRowSelection: true,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  });

  const selectedEntities = useMemo(() => {
    return Object.keys(rowSelection).map(id => entityMap.current.get(id)).filter(Boolean) as Entity[];
  }, [rowSelection]);

  const clearSelection = (id?: number) => {
    if (id == null) {
      setRowSelection({});
    } else {
      setRowSelection(selection => {
        const idStr = String(id);
        if (idStr in selection) {
          selection = { ...selection };
          delete selection[idStr];
        }

        return selection;
      });
    }
  };

  return {
    table,
    filter,
    setFilter,
    isLoading,
    error,
    selectedEntities,
    clearSelection,
  };
}

const helper = createColumnHelper<Entity>();

const columns: ColumnDef<Entity, any>[] = [
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
  helper.accessor('name', {}),
  helper.accessor('description', {
    cell: row => {
      const maxLength = 80;
      const description = row.getValue();
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

