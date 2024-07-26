import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReactNode } from 'react';

const nf = new Intl.NumberFormat('en-US', {});

export function TotalCard ({ title, icon, total, children }: { title: string, icon: ReactNode, total: number, children?: ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{nf.format(total)}</div>
        <p className="text-xs text-muted-foreground mt-4">
          {children}
        </p>
      </CardContent>
    </Card>
  );
}

