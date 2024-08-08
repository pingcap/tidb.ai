'use client';

import { ManagedPanelContext } from '@/components/managed-panel';
import { Dialog } from '@/components/ui/dialog';
import { type ComponentProps, useState } from 'react';

export interface ManagedDialogProps extends Omit<ComponentProps<typeof Dialog>, 'open' | 'onOpenChange'> {
}

export function ManagedDialog (props: ManagedDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <ManagedPanelContext.Provider value={{ open, setOpen }}>
      <Dialog open={open} onOpenChange={setOpen} {...props} />
    </ManagedPanelContext.Provider>
  );
}

export { useManagedPanel as useManagedDialog } from './managed-panel';

