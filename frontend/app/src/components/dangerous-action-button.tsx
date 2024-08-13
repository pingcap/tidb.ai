import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { forwardRef, MouseEvent, type ReactNode, useState } from 'react';

export interface DangerousActionButtonProps extends ButtonProps {
  action: () => Promise<void>;
  dialogTitle?: ReactNode;
  dialogDescription?: ReactNode;
}

export const DangerousActionButton = forwardRef<HTMLButtonElement, DangerousActionButtonProps>(({ action, dialogDescription, dialogTitle, asChild, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const [acting, setActing] = useState(false);
  const [error, setError] = useState<unknown>();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActing(true);
    action()
      .then(() => {
        setOpen(false);
      })
      .catch(error => setError(error))
      .finally(() => setActing(false));
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {asChild
        ? <AlertDialogTrigger asChild ref={ref} {...props} disabled={props.disabled || acting} />
        : <Button ref={ref} {...props} disabled={props.disabled || acting} />}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle ?? 'Are you absolutely sure?'}</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogDescription ?? 'This action cannot be undone.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={acting} onClick={handleClick}>
            {acting && <Loader2Icon className="size-4 mr-1 animate-spin repeat-infinite" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

DangerousActionButton.displayName = 'DangerousActionButton';
