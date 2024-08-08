'use client';

import { CollapsibleTrigger } from '@/components/ui/collapsible';
import type { CollapsibleTriggerProps } from '@radix-ui/react-collapsible';
import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext } from 'react';

export const ManagedPanelContext = createContext<{ open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }>({
  open: false,
  setOpen: () => {},
});

export function useManagedPanel () {
  return useContext(ManagedPanelContext);
}

export function ManagedPanelTrigger ({ on, off, ...props }: { on: ReactNode, off: ReactNode } & Omit<CollapsibleTriggerProps, 'children'>) {
  const { open } = useContext(ManagedPanelContext);

  return (
    <CollapsibleTrigger {...props}>
      {open ? on : off}
    </CollapsibleTrigger>
  );
}

export function ManagedPanelStatic ({ on, off }: { on: ReactNode, off: ReactNode }) {
  const { open } = useContext(ManagedPanelContext);

  return open ? on : off;
}
