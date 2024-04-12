import { Button, type ButtonProps } from '@/components/ui/button';
import { forwardRef, useState } from 'react';

interface ActionButtonProps extends ButtonProps {
  action?: () => Promise<void>;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>((
  {
    action,
    onClick,
    disabled,
    ...props
  },
  ref,
) => {
  const [busy, setBusy] = useState<boolean>(false);
  return (
    <Button
      {...props}
      ref={ref}
      disabled={disabled || busy}
      onClick={e => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          if (action) {
            setBusy(true);
            action().finally(() => {
              setBusy(false);
            });
          }
        }
      }}
    />
  );
});
