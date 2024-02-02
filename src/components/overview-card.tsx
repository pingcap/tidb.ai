import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ComponentType, ReactNode, SVGAttributes } from 'react';

export interface OverviewCardProps {
  title: ReactNode;
  icon: ComponentType<SVGAttributes<SVGSVGElement>>;
  value: ReactNode;
  description?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function OverviewCard ({
  title,
  icon: Icon,
  value,
  description,
  className,
  children,
}: OverviewCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">
          {description}
        </p>}
        {children}
      </CardContent>
    </Card>
  );
}
