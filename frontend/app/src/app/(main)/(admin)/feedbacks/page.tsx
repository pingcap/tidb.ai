'use client';

import { type Feedback, FeedbackType, listFeedbacks } from '@/api/feedbacks';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { datetime } from '@/components/cells/datetime';
import { DataTableRemote } from '@/components/data-table-remote';
import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import Link from 'next/link';

const helper = createColumnHelper<Feedback>();

const mono = (cell: CellContext<any, any>) => <span className="font-mono">{cell.getValue()}</span>;

const columns = [
  helper.accessor('id', { cell: mono }),
  helper.display({ id: 'chat', cell: ({ row }) => <Link className='underline' href={`/c/${row.original.chat_id}#${row.original.chat_message_id}`}>{row.original.chat_id} #{row.original.chat_message_id}</Link> }),
  helper.accessor('feedback_type', {
    cell: (cell) => {
      const type = cell.getValue();
      switch (type) {
        case FeedbackType.like:
          return (<span className="flex gap-2 items-center text-green-500"><ThumbsUpIcon className='size-4' /> LIKE</span>);
        case FeedbackType.dislike:
          return (<span className="flex gap-2 items-center text-red-500"><ThumbsDownIcon className='size-4' /> DISLIKE</span>);
      }
    },
  }),
  helper.accessor('comment', { cell: mono }),
  helper.accessor('user_id', { cell: mono }),
  helper.accessor('created_at', { cell: datetime }),
  helper.accessor('updated_at', { cell: datetime }),
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
] as ColumnDef<Feedback>[];

export default function ChatEnginesPage () {
  return (
    <>
      <AdminPageHeading title="Feedbacks" />
      <DataTableRemote
        // before={(
        //   <DataTableHeading>
        //     <span className="ml-auto" />
        //     <CreateChatEngineDialog {...props} trigger={<Button size="sm">New chat engine</Button>} />
        //   </DataTableHeading>
        // )}
        columns={columns}
        apiKey="api.feedbacks.list"
        api={listFeedbacks}
        idColumn="id"
      />
    </>
  );
}
