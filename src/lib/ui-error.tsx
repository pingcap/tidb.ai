import { InfoIcon } from 'lucide-react';
import { toast } from 'sonner';

export function toastSuccess (message: string) {
  toast.success(message, {
    classNames: {
      toast: 'group-[.toaster]:bg-green-500 group-[.toaster]:text-white',
    }
  });
}

export function toastError (title: string, error: unknown) {
  toast.error((
    <>
      <InfoIcon />
      <div>
        <h6 className="font-bold">
          {title}
        </h6>
        <p className="text-xs">{getErrorMessage(error)}</p>
      </div>
    </>
  ), {
    classNames: {
      toast: 'group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground',
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
