'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { metadataCell } from '@/components/cells/metadata';
import { DataTableHeading } from '@/components/data-table-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import { CreateChatEngineDialog } from '@/components/dialogs/create-chat-engine-dialog';
import type { ChatEngine } from '@/core/repositories/chat_engine';
import type { Document } from '@/core/repositories/document';
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
] as ColumnDef<Document>[];

export default function PageClient ({ ...props }: ComponentProps<typeof CreateChatEngineDialog>) {
  return (
    <>
      <AdminPageHeading title="Chat Engines" />
      <DataTableRemote
        before={(
          <DataTableHeading>
            <span className="ml-auto" />
            <CreateChatEngineDialog {...props} />
          </DataTableHeading>
        )}
        columns={columns}
        api="/api/v1/chat_engines"
        idColumn="id"
      />
    </>
  );
}

