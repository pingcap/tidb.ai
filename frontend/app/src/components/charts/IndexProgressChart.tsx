'use client';

import type { IndexProgress } from '@/api/rag';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import * as React from 'react';
import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';

const chartConfig = {
  total: {
    label: 'Total',
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-1))',
  },
  pending: {
    label: 'Pending',
    color: 'hsl(var(--chart-2))',
  },
  running: {
    label: 'Running',
    color: 'hsl(var(--chart-3))',
  },
  failed: {
    label: 'Failed',
    color: 'hsl(var(--chart-4))',
  },
  not_started: {
    label: 'Not Started',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function IndexProgressChart ({ title, description, data }: { title: string, description?: string, data: IndexProgress }) {
  const total = React.useMemo(() => {
    return Object.values(data).reduce((a, b) => a + b, 0);
  }, [data]);

  const chartData = useMemo(() => {

    return [
      { count: data.completed, state: 'Completed', fill: 'hsl(var(--chart-5))' },
      { count: data.failed, state: 'Failed', fill: 'hsl(var(--chart-4))' },
      { count: data.pending, state: 'Pending', fill: 'hsl(var(--chart-3))' },
      { count: data.running, state: 'Running', fill: 'hsl(var(--chart-2))' },
      { count: data.not_started, state: 'Not started', fill: 'hsl(var(--chart-1))' },
    ];
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="state"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total chunks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
