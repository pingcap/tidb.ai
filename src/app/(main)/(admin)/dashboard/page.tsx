'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { OverviewCard } from '@/components/overview-card';
import { fetcher } from '@/lib/fetch';
import { ArrowRightIcon, BinaryIcon, ListTodoIcon, MessageSquareTextIcon, MessagesSquareIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';

export default function Page () {

  return (
    <>
      <AdminPageHeading title="Overview" />
      <section className="grid grid-cols-4 gap-4">
        <IndexStats />
        <TaskStats />
        <ChatStats />
      </section>
    </>
  );
}

function IndexStats ({}: {}) {
  type IndexStatsData = Partial<Record<'notIndexed' | 'indexed' | 'staled', number>>
  const { data, isLoading } = useSWR(['get', '/api/v1/indexes/default/stats'], fetcher<IndexStatsData>, {
    refreshInterval: data => {
      if (data?.notIndexed || data?.staled) {
        return 1000;
      }
      return 5000;
    },
  });

  const sum = (data?.indexed ?? 0) + (data?.staled ?? 0);

  return (
    <OverviewCard
      title="Embedded documents"
      icon={BinaryIcon}
      value={sum}
    >
      <div className="mt-2">
        <Link href="/explore" className="text-xs flex items-center gap-1 transition-colors text-muted-foreground hover:text-foreground">
          Explore all documents <ArrowRightIcon size="1em" />
        </Link>
      </div>
    </OverviewCard>
  );
}

function TaskStats () {
  type TaskStatsData = Partial<Record<'pending' | 'processing' | 'succeed' | 'failed', number>>
  const { data, isLoading } = useSWR(['get', '/api/v1/sources/tasks/stats'], fetcher<TaskStatsData>, {
    refreshInterval: data => {
      if (data?.processing || data?.pending) {
        return 1000;
      }

      return 5000;
    },
  });

  return (
    <OverviewCard
      title="Importing tasks"
      icon={ListTodoIcon}
      value={data?.succeed ?? 0}
    >
      <div className="mt-2">
        <Link href="/import-tasks" className="text-xs flex items-center gap-1 transition-colors text-muted-foreground hover:text-foreground">
          View all tasks <ArrowRightIcon size="1em" />
        </Link>
      </div>
    </OverviewCard>
  );
}

function ChatStats () {
  type ChatStatsData = Partial<Record<'chats' | 'chat_messages' | 'sessions', number>>;
  const { data, isLoading } = useSWR(['get', '/api/v1/chats/stats'], fetcher<ChatStatsData>);

  return (
    <OverviewCard
      title="Conversations"
      icon={MessagesSquareIcon}
      value={data?.chats ?? 0}
    >
      <div className="mt-2 flex items-center justify-between">
        <span className="inline-flex items-center text-xs gap-2 text-muted-foreground mr-2">
          <span className="flex items-center gap-1">
            <UserIcon size="1em" />
            <code>{data?.sessions ?? 0}</code>
          </span>
          <span className="flex items-center gap-1">
            <MessageSquareTextIcon size="1em" />
            <code>{data?.chat_messages ?? 0}</code>
          </span>
        </span>
        <Link href="#" className="text-xs inline-flex items-center gap-1 transition-colors text-muted-foreground hover:text-foreground">
          View all chats <ArrowRightIcon size="1em" />
        </Link>
      </div>
    </OverviewCard>
  );
}
