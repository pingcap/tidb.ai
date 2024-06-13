'use client';

import { AdminPageHeading } from '@/components/admin-page-heading';
import { OverviewCard } from '@/components/overview-card';
import { fetcher } from '@/lib/fetch';
import { differenceInDays } from 'date-fns';
import { ArrowRightIcon, BarChartIcon, BinaryIcon, ListTodoIcon, MessageSquareTextIcon, MessagesSquareIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer } from 'recharts';
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
  const { data, isLoading } = useSWR(['get', '/api/v1/stats/document_index_state'], fetcher<{ documents: number, chunks: number }>, {});

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
          <Link href="/documents" className="text-xs flex items-center gap-1 transition-colors text-muted-foreground hover:text-foreground">
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
  const { data, isLoading } = useSWR(['get', '/api/v1/stats/document_import_tasks'], fetcher<TaskStatsData>, {});

  return (
    <OverviewCard
      title="Finished import tasks"
      icon={ListTodoIcon}
      value={data?.SUCCEED ?? 0}
    >
    </OverviewCard>
  );
}

type ChatStatsData = Partial<Record<'chats' | 'chat_messages' | 'sessions', number>>;
type DailyChatStatsData = (ChatStatsData & { date: string, user_type: 'bot' | 'admin' | 'anonymous' | 'user' })[];

function ChatStats () {
  const { data, isLoading } = useSWR(['get', '/api/v1/stats/chats'], fetcher<ChatStatsData>);

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
        <Link href="/c" className="text-xs inline-flex items-center gap-1 transition-colors text-muted-foreground hover:text-foreground">
          View all chats <ArrowRightIcon size="1em" />
        </Link>
      </div>
    </OverviewCard>
  );
}

function ChatDailyStats () {
  const { data = [] } = useSWR(['get', '/api/v1/stats/chats_daily'], fetcher<DailyChatStatsData>);

  const refinedData = useMemo(() => {
    const res: { day: number, value: number, user: number, admin: number, bot: number, anonymous: number }[] = [];
    for (let i = 0; i < 28; i++) {
      res[i] = { day: 0, value: 0, user: 0, admin: 0, bot: 0, anonymous: 0 };
    }
    const now = new Date();
    data.forEach(item => {
      const i = differenceInDays(now, item.date);
      if (i >= 0 && i < 28) {
        switch (item.user_type) {
          case 'admin':
            res[i].admin = item.chat_messages ?? 0;
            res[i].value += res[i].admin;
            break;
          case 'bot':
            res[i].bot = item.chat_messages ?? 0;
            res[i].value += res[i].bot;
            break;
          case 'anonymous':
            res[i].anonymous = item.chat_messages ?? 0;
            res[i].value += res[i].anonymous;
            break;
          case 'user':
            res[i].user = item.chat_messages ?? 0;
            res[i].value += res[i].user;
            break;
        }
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
          <Bar dataKey="admin" className="fill-primary" stackId="a" radius={[0, 0, 0, 0]} />
          <Bar dataKey="bot" className="dark:fill-sky-200 fill-sky-600" stackId="a" radius={[0, 0, 0, 0]} />
          <Bar dataKey="user" className="dark:fill-emerald-200 fill-emerald-600" stackId="a" radius={[0, 0, 0, 0]} />
          <Bar dataKey="anonymous" className="dark:fill-amber-200 fill-amber-600" stackId="a" radius={[4, 4, 0, 0]} />
          <Legend content={() => (
            <ul className='flex gap-2 text-xs p-2'>
              <li className='flex gap-1 items-center'>
                <span className="size-3 rounded bg-primary" />
                Admin
              </li>
              <li className='flex gap-1 items-center'>
                <span className="size-3 rounded dark:bg-sky-200 bg-sky-600" />
                Bot
              </li>
              <li className='flex gap-1 items-center'>
                <span className="size-3 rounded dark:bg-emerald-200 bg-emerald-600" />
                User
              </li>
              <li className='flex gap-1 items-center'>
                <span className="size-3 rounded dark:bg-amber-200 bg-amber-600" />
                Anonymous
              </li>
            </ul>
          )} />
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
