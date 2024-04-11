'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { OverviewCard } from '@/components/overview-card';
import { fetcher } from '@/lib/fetch';
import { differenceInDays } from 'date-fns';
import { ArrowRightIcon, BarChartIcon, BinaryIcon, ListTodoIcon, MessageSquareTextIcon, MessagesSquareIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
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
      <section>
        <ChatDailyStats />
      </section>
    </>
  );
}

function IndexStats ({}: {}) {
  const { data, isLoading } = useSWR(['get', '/api/v2/stats/document_index_state'], fetcher<{ documents: number, chunks: number }>, {});

  return (
    <OverviewCard
      title="Embedded documents"
      icon={BinaryIcon}
      value={data?.documents}
      description={(
        <div className="mt-2 flex gap-2 flex-wrap items-center justify-between">
          <div>
            {data?.chunks ?? '--'} chunks
          </div>
          <Link href="/explore" className="text-xs flex items-center gap-1 transition-colors text-muted-foreground hover:text-foreground">
            Explore <ArrowRightIcon size="1em" />
          </Link>
        </div>
      )}
    >
    </OverviewCard>
  );
}

function TaskStats () {
  type TaskStatsData = Partial<Record<'CREATED' | 'SUCCEED' | 'PENDING' | 'IMPORTING' | 'FAILED', number>>
  const { data, isLoading } = useSWR(['get', '/api/v2/stats/document_import_tasks'], fetcher<TaskStatsData>, {});

  return (
    <OverviewCard
      title="Finished import tasks"
      icon={ListTodoIcon}
      value={data?.SUCCEED ?? 0}
    >
      <div className="mt-2">
        <Link href="/import-tasks" className="text-xs flex items-center gap-1 transition-colors text-muted-foreground hover:text-foreground">
          View all tasks <ArrowRightIcon size="1em" />
        </Link>
      </div>
    </OverviewCard>
  );
}

type ChatStatsData = Partial<Record<'chats' | 'chat_messages' | 'sessions', number>>;
type DailyChatStatsData = (ChatStatsData & { date: string })[];

function ChatStats () {
  const { data, isLoading } = useSWR(['get', '/api/v1/chats/stats'], fetcher<ChatStatsData>);

  return (
    <OverviewCard
      title="All Conversations"
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

function ChatDailyStats () {
  const { data = [] } = useSWR(['get', '/api/v1/chats/daily-stats'], fetcher<DailyChatStatsData>);

  const refinedData = useMemo(() => {
    const res: { day: number, value: number }[] = [];
    for (let i = 0; i < 28; i++) {
      res[i] = { day: 0, value: 0 };
    }
    const now = new Date();
    data.forEach(item => {
      const i = differenceInDays(now, item.date);
      if (i >= 0 && i < 28) {
        res[i].value = item.chat_messages ?? 0;
      }
    });
    return res;
  }, [data]);

  return (
    <OverviewCard
      title="Conversations Trends"
      value={refinedData[0].value} icon={BarChartIcon}
      description={diff(refinedData[0].value, refinedData[1].value) + ' compared to yesterday'}
    >
      <ResponsiveContainer width="100%" height="100%" minHeight={160}>
        <BarChart data={refinedData}>
          <Bar dataKey="value" className="fill-primary" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </OverviewCard>
  );
}

function diff (a: number, b: number) {
  if (b === 0) {
    return `+${a}`;
  } else {
    return ((a - b) / b * 100).toFixed(0) + '%';
  }
}
