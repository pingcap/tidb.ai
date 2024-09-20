'use client';

import type { TrendResponse } from '@/api/stats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { addDays, format, isAfter } from 'date-fns';
import { ReactNode, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export function TrendsChart<T extends { date: Date }> ({
  className,
  title,
  description,
  data,
  dimensions,
  config,
}: {
  className?: string,
  title: ReactNode,
  description: ReactNode,
  data: TrendResponse<T>,
  dimensions: Exclude<string & keyof T, 'date'>[],
  config: { [P in Exclude<string & keyof T, 'date'>]: { label: string, color: string } }
}) {
  const chartData = useMemo(() => {
    const dates: any[] = [];

    for (let i = data.start_date; !isAfter(i, data.end_date); i = addDays(i, 1)) {
      dates.push(i);
    }

    const map = new Map(data.values.map(item => [String(item.date), item]));

    return dates.map(date => ({
      ...map.get(String(date)),
      date: format(date, 'yyyy-MM-dd'),
    }));
  }, [data]);

  return (
    <Card className={cn('size-full', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent style={{ height: 320 }}>
        <ChartContainer className="size-full" config={{ ...config }}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}

              content={<ChartTooltipContent indicator="dot" nameKey="date" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {dimensions.map((dimension) => (
              <Bar
                key={dimension}
                dataKey={dimension}
                fill={config[dimension].color}
                stackId="value"
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/*<CardFooter>*/}
      {/*  <div className="flex w-full items-start gap-2 text-sm">*/}
      {/*    <div className="grid gap-2">*/}
      {/*      <div className="flex items-center gap-2 font-medium leading-none">*/}
      {/*        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
      {/*      </div>*/}
      {/*      <div className="flex items-center gap-2 leading-none text-muted-foreground">*/}
      {/*        January - June 2024*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</CardFooter>*/}
    </Card>
  );
}
