import { toast } from 'sonner';

export function toastSuccess (message: string) {
  toast.success(message, {
    classNames: {
      toast: 'group-[.toaster]:bg-green-500 group-[.toaster]:text-white',
    },
  });
}

export function toastError (title: string, error: unknown) {
  toast.error(title, {
    description: getErrorMessage(error),
    classNames: {
      toast: 'group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground',
      title: 'font-bold',
      description: 'group-[.toaster]:text-destructive-foreground'
    },
  });
}

function getErrorMessage (error: unknown) {
  if (!error) {
    return 'Unknown error message';
  }
  if (typeof error === 'object') {
    if ('message' in error) {
      return String(error.message);
    }
  }
  return String(error);
}
