import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const nf = new Intl.NumberFormat('en-US', {});

export function TotalCard ({ title, icon, total, children }: { title: string, icon: ReactNode, total?: number | null | undefined, children?: ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={cn('text-2xl font-bold', total == null && 'h-8 pt-2')}>
          {total == null ? <Skeleton className="w-12 h-4" /> : nf.format(total)}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          {children}
        </p>
      </CardContent>
    </Card>
  );
}
