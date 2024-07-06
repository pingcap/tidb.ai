import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LockKeyholeIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface ErrorCardProps {
  title: ReactNode;
  message?: ReactNode;
  children?: ReactNode;
}

export function ErrorCard ({
  title, message, children,
}: ErrorCardProps) {
  return (
    <Card className="shadow-2xl mx-8 max-w-full w-[480px]">
      <CardHeader>
        <CardTitle>
          <LockKeyholeIcon className="mr-2 inline-block size-6 align-bottom text-muted-foreground" />
          {title}
        </CardTitle>
        <CardDescription>
          {message}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {children}
      </CardFooter>
    </Card>
  );
}