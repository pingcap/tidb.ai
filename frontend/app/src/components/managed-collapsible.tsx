'use client';

import { ManagedPanelContext } from '@/components/managed-panel';
import { Collapsible } from '@/components/ui/collapsible';
import { type ComponentProps, useState } from 'react';

export interface ManagedDialogProps extends Omit<ComponentProps<typeof Collapsible>, 'open' | 'onOpenChange'> {
}

export function ManagedCollapsible (props: ManagedDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <ManagedPanelContext.Provider value={{ open, setOpen }}>
      <Collapsible open={open} onOpenChange={setOpen} {...props} />
    </ManagedPanelContext.Provider>
  );
}

export { useManagedPanel as useManagedCollapsible } from './managed-panel';

