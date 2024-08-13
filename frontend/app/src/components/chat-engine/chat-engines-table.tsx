'use client';

import { type ChatEngine, createChatEngine, deleteChatEngine, listChatEngines } from '@/api/chat-engines';
import { actions } from '@/components/cells/actions';
import { boolean } from '@/components/cells/boolean';
import { datetime } from '@/components/cells/datetime';
import { link } from '@/components/cells/link';
import { mono } from '@/components/cells/mono';
import { DangerousActionButton } from '@/components/dangerous-action-button';
import { DataTableRemote } from '@/components/data-table-remote';
import { usePush } from '@/components/nextjs/app-router-hooks';
import { Button } from '@/components/ui/button';
import { useDataTable } from '@/components/use-data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { CopyIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const helper = createColumnHelper<ChatEngine>();

const columns = [
  helper.accessor('id', { cell: mono }),
  helper.accessor('name', { cell: link({ url: row => `/chat-engines/${row.id}` }) }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('updated_at', { cell: datetime }),
  helper.accessor('is_default', { cell: boolean }),
  helper.display({
    header: 'Actions',
    cell: actions((chatEngine) => [
      {
        key: 'clone',
        action: async ({ startTransition, router }) => {
          const { name, llm_id, fast_llm_id, engine_options } = chatEngine;
          createChatEngine({
            name: `${name} Copy`, llm_id, fast_llm_id, engine_options,
          })
            .then(newEngine => {
              toast('Chat Engine successfully cloned.');
              startTransition(() => {
                router.push(`/chat-engines/${newEngine.id}`);
              });
            });
        },
        icon: <CopyIcon className="size-3" />,
        title: 'Clone',
      },
      {
        key: 'delete',
        action: async ({ table, setDropdownOpen }) => {
          await deleteChatEngine(chatEngine.id);
          table.reload?.();
          setDropdownOpen(false);
        },
        title: 'Delete',
        icon: <TrashIcon className="size-3" />,
        dangerous: {},
      },
    ]),
  }),
] as ColumnDef<ChatEngine>[];

export function ChatEnginesTable () {
  return (
    <DataTableRemote
      columns={columns}
      apiKey="api.chat-engines.list"
      api={listChatEngines}
      idColumn="id"
    />
  );
}

function ChatEngineActions ({ chatEngine }: { chatEngine: ChatEngine }) {
  return (
    <span className="flex gap-2 items-center">
      <CloneButton chatEngine={chatEngine} />
      <DeleteButton chatEngine={chatEngine} />
    </span>
  );
}

function CloneButton ({ chatEngine }: { chatEngine: ChatEngine }) {
  const [cloning, setCloning] = useState(false);
  const [navigating, push] = usePush();

  return (
    <Button
      variant="ghost"
      className="text-xs"
      disabled={cloning || navigating}
      size="sm"
      onClick={() => {
        setCloning(true);
        const { name, llm_id, fast_llm_id, engine_options } = chatEngine;
        createChatEngine({
          name: `${name} Copy`, llm_id, fast_llm_id, engine_options,
        })
          .then(newEngine => {
            toast('Chat Engine successfully cloned.');
            push(`/chat-engines/${newEngine.id}`);
          })
          .finally(() => {
            setCloning(false);
          });
      }}
    >
      <CopyIcon className="w-3 mr-1" />
      Clone
    </Button>
  );
}

function DeleteButton ({ chatEngine }: { chatEngine: ChatEngine }) {
  const { reload } = useDataTable();

  return (
    <DangerousActionButton
      action={async () => {
        await deleteChatEngine(chatEngine.id);
        reload?.();
      }}
      variant="ghost"
      className="text-xs text-destructive hover:text-destructive hover:bg-destructive/20"
    >
      <TrashIcon className="w-3 mr-1" />
      Delete
    </DangerousActionButton>
  );
}
