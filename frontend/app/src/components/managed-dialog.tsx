'use client';

import { Dialog } from '@/components/ui/dialog';
import { type ComponentProps, createContext, type Dispatch, type SetStateAction, useContext, useState } from 'react';

export interface ManagedDialogProps extends Omit<ComponentProps<typeof Dialog>, 'open' | 'onOpenChange'> {

}

export function ManagedDialog (props: ManagedDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <ManagedDialogContext.Provider value={{ open, setOpen }}>
      <Dialog open={open} onOpenChange={setOpen} {...props} />
    </ManagedDialogContext.Provider>
  );
}

const ManagedDialogContext = createContext<{ open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }>({
  open: false,
  setOpen: () => {},
});

export function useManagedDialog () {
  return useContext(ManagedDialogContext);
}
