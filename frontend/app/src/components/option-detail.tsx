import { ManagedDialog } from '@/components/managed-dialog';
import { DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { PencilIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export function OptionDetail ({
  valueClassName,
  title,
  value,
  editPanel,
}: {
  valueClassName?: string
  title: string
  value: ReactNode
  editPanel?: ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      <dt className="text-muted-foreground text-xs">{title}</dt>
      <dd className={cn('font-medium ml-auto', valueClassName)}>{value}</dd>
      {editPanel && (
        <ManagedDialog>
          <DialogTrigger className="block">
            <PencilIcon className="size-4 opacity-50 hover:opacity-100 transition-opacity" />
          </DialogTrigger>
          <DialogContent>
            {editPanel}
          </DialogContent>
        </ManagedDialog>
      )}
    </div>
  );
}
