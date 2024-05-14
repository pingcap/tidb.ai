'use client';

import {CreateChatEngineDialog} from "@/app/(main)/(admin)/chat-engines/components/create-chat-engine-dialog";
import {DataTableRowActions} from "@/app/(main)/(admin)/chat-engines/components/data-table-row-actions";
import { AdminPageHeading } from '@/components/admin-page-heading';
import { metadataCell } from '@/components/cells/metadata';
import { DataTableHeading } from '@/components/data-table-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import {Button} from "@/components/ui/button";
import type { ChatEngine } from '@/core/repositories/chat_engine';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import type { ComponentProps } from 'react';

const helper = createColumnHelper<ChatEngine>();

const mono = (cell: CellContext<any, any>) => <span className="font-mono">{cell.getValue()}</span>;

const columns = [
  helper.accessor('id', { cell: mono }),
  helper.accessor('name', { cell: mono }),
  helper.accessor('engine', { cell: mono }),
  helper.accessor('engine_options', { cell: metadataCell }),
  helper.accessor('is_default', { cell: (ctx) => ctx.getValue() ? 'Yes' : '' }),
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
] as ColumnDef<ChatEngine>[];

export default function PageClient ({ ...props }: ComponentProps<typeof CreateChatEngineDialog>) {
  return (
    <>
      <AdminPageHeading title="Chat Engines" />
      <DataTableRemote
        before={(
          <DataTableHeading>
            <span className="ml-auto" />
            <CreateChatEngineDialog {...props} trigger={<Button size="sm">New chat engine</Button>}/>
          </DataTableHeading>
        )}
        columns={columns}
        api="/api/v1/chat_engines"
        idColumn="id"
      />
    </>
  );
}

