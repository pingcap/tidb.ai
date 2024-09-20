'use client';

import { getChatOriginTrend, getChatUserTrend } from '@/api/stats';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { TrendsChart } from '@/components/charts/TrendsChart';
import { startOfToday, subDays } from 'date-fns';
import { useMemo } from 'react';
import useSWR from 'swr';

const today = startOfToday();

export default function Page () {
  const start = subDays(today, 30);
  const end = today;

  const { data: chatUserTrend } = useSWR(`api.stats.trends.chat-user.${start}-${end}`, () => getChatUserTrend(start, end));
  const { data: chatOriginTrend } = useSWR(`api.stats.trends.chat-origin.${start}-${end}`, () => getChatOriginTrend(start, end));

  const originKeys = useMemo(() => {
    if (!chatOriginTrend) {
      return [];
    }
    const set = new Set<string>();
    chatOriginTrend.values.forEach(item => {
      Object.keys(item).forEach(key => set.add(key));
    });
    set.delete('date');
    return Array.from(set);
  }, [chatOriginTrend]);

  return (
    <>
      <AdminPageHeading
        breadcrumbs={[
          { title: 'Stats' },
          { title: 'Trending' },
        ]}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          {chatUserTrend && <TrendsChart
            title="Chats Users"
            description="Chats amounts of user and anonymous."
            data={chatUserTrend}
            dimensions={['user', 'anonymous']}
            config={{
              user: { label: 'User', color: 'hsl(var(--chart-1))' },
              anonymous: { label: 'Anonymous', color: 'hsl(var(--chart-2))' },
            }}
          />}
        </div>
        <div className="col-span-2">
          {chatOriginTrend && <TrendsChart
            title="Chats Origins"
            description="Chats amounts from different origins"
            data={chatOriginTrend}
            dimensions={originKeys}
            config={Object.fromEntries(originKeys.map((key, i) => ([key, {
              label: key,
              color: `hsl(var(--chart-${(i % 5) + 1}))`,
            }])))}
          />}
        </div>
      </div>
    </>
  );
}