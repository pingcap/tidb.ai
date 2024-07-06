'use client';

import { type ChatEngine, listChatEngines } from '@/api/chat-engines';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { datetime } from '@/components/cells/datetime';
import { DataTableRemote } from '@/components/data-table-remote';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import Link from 'next/link';

const helper = createColumnHelper<ChatEngine>();

const mono = (cell: CellContext<any, any>) => <span className="font-mono">{cell.getValue()}</span>;

const columns = [
  helper.accessor('id', { cell: mono }),
  helper.accessor('name', { cell: (cell) => <Link className="underline font-mono" href={`/chat-engines/${cell.row.original.id}`}>{cell.getValue()}</Link> }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('updated_at', { cell: datetime }),
  helper.accessor('is_default', { cell: (ctx) => ctx.getValue() ? 'Yes' : '' }),
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
] as ColumnDef<ChatEngine>[];

export default function ChatEnginesPage () {
  return (
    <>
      <AdminPageHeading title="Chat Engines" />
      <DataTableRemote
        // before={(
        //   <DataTableHeading>
        //     <span className="ml-auto" />
        //     <CreateChatEngineDialog {...props} trigger={<Button size="sm">New chat engine</Button>} />
        //   </DataTableHeading>
        // )}
        columns={columns}
        apiKey="api.chat-engines.list"
        api={listChatEngines}
        idColumn="id"
      />
    </>
  );
}

