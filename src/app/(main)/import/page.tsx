'use client';

import { Card } from '@/components/ui/card';
import type { DB } from '@/core/db/schema';

import Link from 'next/link';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import useSWR from 'swr';

export default function Page () {
  return (
    <>
      <section className="space-y-4">
        <h6 className="text-lg text-foreground/50">
          Choose your importing source
        </h6>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/import/url" prefetch={false}>
            <Card className="p-8 font-semibold">
              Import from URL List
            </Card>
          </Link>
        </div>
      </section>
      <section className="mt-4 space-y-4">
        <h6 className="text-lg text-foreground/50">
          Current tasks
        </h6>
        <div className="min-h-[400px]">
          <Stats />
        </div>
      </section>
    </>
  )
    ;
}

const fetcher = async ([url]: [string]) => {
  const res = await fetch(url);
  if (!res.ok || res.redirected) {
    const error = new Error(`${res.status} ${res.statusText}`);
    throw error;
  }

  return res.json();
};

function Stats () {
  const { data, isLoading, isValidating } = useSWR<{ status: DB['import_source_task']['status'], count: number }[]>(['/api/v1/sources/tasks/stats'], fetcher, {
    refreshInterval: 5000,
  });

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight="400px" className='text-sm'>
      <PieChart width={400} height={400}>
        <Pie
          nameKey="status"
          dataKey="count"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
          minAngle={5}
        >
          {data?.map((entry, index) => <Cell key={entry.status} fill={colors[entry.status]} />)}
        </Pie>
        <Tooltip />
        <Legend className='text-sm' />
      </PieChart>
    </ResponsiveContainer>
  );
}

const colors = {
  'pending': '#a2a2a2',
  'succeed': '#86dc86',
  'failed': '#ea9090',
  'processing': '#92c5e0',
};
