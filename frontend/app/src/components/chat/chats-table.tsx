'use client';

import { type Chat, deleteChat, listChats } from '@/api/chats';
import { actions } from '@/components/cells/actions';
import { datetime } from '@/components/cells/datetime';
import { link } from '@/components/cells/link';
import { metadataCell } from '@/components/cells/metadata';
import { DataTableRemote } from '@/components/data-table-remote';
import { createColumnHelper } from '@tanstack/table-core';
import { Trash2Icon } from 'lucide-react';

export function ChatsTable () {
  return (
    <DataTableRemote
      idColumn="id"
      apiKey="api.chats.list"
      api={listChats}
      columns={columns as any}
    />
  );
}

const helper = createColumnHelper<Chat>();

const columns = [
  helper.accessor('title', {
    cell: link({ url: chat => `/c/${chat.id}` }),
  }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('engine_id', {}),
  helper.accessor('engine_options', { cell: metadataCell }),
  helper.display({
    header: 'Operations',
    cell: actions(chat => [
      {
        key: 'delete',
        title: 'Delete',
        icon: <Trash2Icon className="size-3" />,
        dangerous: {
          dialogTitle: 'Are you sure to delete this chat?',
          dialogDescription: 'This action cannot be undone.',
        },
        action: async ({ table }) => {
          await deleteChat(chat.id);
          table.reload?.();
        },
      },
    ]),
  }),
];
