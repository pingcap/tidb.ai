'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { AdminPageLayout } from '@/components/admin-page-layout';
import { DataTableRemote } from '@/components/data-table-remote';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { DB } from '@/core/db/schema';
import { deleteChat } from '@/operations/chats';
import type { CellContext } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import type { Selectable } from 'kysely';
import { LinkIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Page () {
  const [ts, setTs] = useState<number>();

  const columns = [
    helper.display({
      id: 'name',
      cell: ({ row }) => (
        <Link href={`/c/${row.original.id}`} target="_blank">
          <LinkIcon className='w-3 h-3 mr-2 inline-block' />
          {row.original.name}
        </Link>
      ),
    }),
    helper.accessor('created_at', { cell: datetime }),
    helper.accessor('llm', {}),
    helper.accessor('llm_model', {}),
    helper.display({
      id: 'delete',
      header: 'Delete',
      cell: ({ row }) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="flex-shrink-0 w-max h-max rounded-full p-1 hover:text-destructive hover:bg-transparent" size="icon" variant="ghost">
              <TrashIcon className="w-3 h-3" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure to delete this chat?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteChat(row.original.id)
                    .then(() => {
                      setTs(Date.now());
                    });
                }}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    }),
  ];

  return (
    <AdminPageLayout>
      <AdminPageHeading title="Conversations history" />
      <DataTableRemote
        idColumn="id"
        api="/api/v1/chats"
        columns={columns as any}
        ts={ts}
      />
    </AdminPageLayout>
  );
}

const datetime = (cell: CellContext<any, any>) => <time>{cell.getValue() ? format(cell.getValue(), 'yyyy-MM-dd HH:mm') : ''}</time>;

const helper = createColumnHelper<Selectable<DB['chat']>>();

export const dynamic = 'force-dynamic';
