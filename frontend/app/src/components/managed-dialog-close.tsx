import { useManagedDialog } from '@/components/managed-dialog';
import type { ReactNode } from 'react';

export function ManagedDialogClose ({ children }: { children: (close: () => void) => ReactNode }) {

  const { setOpen } = useManagedDialog();

  return children(() => {
    setOpen(false);
  });
}
