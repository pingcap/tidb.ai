'use client';

import { type ChatEngine, createChatEngine, deleteChatEngine, listChatEngines } from '@/api/chat-engines';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { datetime } from '@/components/cells/datetime';
import { DangerousActionButton } from '@/components/dangerous-action-button';
import { DataTableRemote } from '@/components/data-table-remote';
import { Button } from '@/components/ui/button';
import { useDataTable } from '@/components/use-data-table';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { CopyIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

const helper = createColumnHelper<ChatEngine>();

const mono = (cell: CellContext<any, any>) => <span className="font-mono">{cell.getValue()}</span>;

const columns = [
  helper.accessor('id', { cell: mono }),
  helper.accessor('name', { cell: (cell) => <Link className="underline font-mono" href={`/chat-engines/${cell.row.original.id}`}>{cell.getValue()}</Link> }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('updated_at', { cell: datetime }),
  helper.accessor('is_default', { cell: (ctx) => ctx.getValue() ? 'Yes' : '' }),
  helper.display({
    header: 'Actions',
    cell: ({ row }) => (
      <span className="flex gap-2 items-center">
        <CloneButton chatEngine={row.original} />
        <DeleteButton chatEngine={row.original} />
      </span>
    ),
  }),
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

function CloneButton ({ chatEngine }: { chatEngine: ChatEngine }) {
  const [cloning, setCloning] = useState(false);
  const [transitioning, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="text-xs"
      disabled={cloning || transitioning}
      size="sm"
      onClick={() => {
        setCloning(true);
        const { name, llm_id, fast_llm_id, engine_options } = chatEngine;
        createChatEngine({
          name: `${name} Copy`, llm_id, fast_llm_id, engine_options,
        })
          .then(newEngine => {
            toast('Chat Engine successfully cloned.');
            router.push(`/chat-engines/${newEngine.id}`);
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
