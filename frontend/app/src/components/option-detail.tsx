import { ManagedCollapsible } from '@/components/managed-collapsible';
import { ManagedPanelStatic, ManagedPanelTrigger } from '@/components/managed-panel';
import { CollapsibleContent } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { PencilIcon, PencilOffIcon } from 'lucide-react';
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
      {editPanel ? (
        <dd className={cn('font-medium flex-1 ml-4')}>
          <ManagedCollapsible className="flex gap-1 items-center flex-1 justify-end">
            <ManagedPanelStatic
              on={<></>}
              off={<span className={valueClassName}>{value}</span>}
            />
            <CollapsibleContent className='py-2 w-full'>
              {editPanel}
            </CollapsibleContent>
            <ManagedPanelTrigger
              on={<PencilOffIcon className="size-4 opacity-50 hover:opacity-100 transition-opacity" />}
              off={<PencilIcon className="size-4 opacity-50 hover:opacity-100 transition-opacity" />}
            />
          </ManagedCollapsible>
        </dd>
      ) : <dd className={cn('font-medium ml-auto', valueClassName)}>{value}</dd>}
    </div>
  );
}
