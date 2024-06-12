'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import type { Feedback } from '@/core/repositories/feedback';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import { LinkIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import Link from 'next/link';

export default function FeedbackPage () {
  return (
    <>
      <AdminPageHeading title="Feedbacks" />
      <DataTableRemote<Feedback & { chat_key: string, chat_title: string }, any>
        idColumn="id"
        api="/api/v1/feedbacks"
        columns={columns}
      />
    </>
  );
}

const helper = createColumnHelper<Feedback & { chat_key: string, chat_title: string }>();
const columns: ColumnDef<Feedback & { chat_key: string, chat_title: string }, any>[] = [
  helper.accessor('id', {}),
  helper.accessor('chat_key', {
    id: 'go_to_chat',
    header: 'chat',
    cell: (cell) => (
      <Link href={`/c/${encodeURIComponent(cell.getValue())}`}>
        <LinkIcon className="w-3 h-3 mr-1 inline-block" />
        {cell.row.original.chat_title}
      </Link>
    ),
  }),
  helper.accessor('action', {
    cell: (cell) => {
      switch (cell.getValue()) {
        case 'like':
          return <span className="text-green-500 flex items-center gap-1"><ThumbsUpIcon className="w-3 h-3 inline-block" /> Like</span>;
        case 'dislike':
          return <span className="text-red-500 flex items-center gap-1"><ThumbsDownIcon className="w-3 h-3 inline-block" /> Dislike</span>;
      }
    },
  }),
  helper.accessor('comment', {}),
  helper.accessor('created_by', {}),
  helper.accessor('created_at', {
    cell: cell => <time>{format(cell.getValue(), 'yyyy-MM-dd HH:mm:ss')}</time>,
  }),
];
