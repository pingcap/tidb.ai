import { Ask } from '@/components/chat/ask';
import { useAsk } from '@/components/chat/use-ask';
import { Button } from '@/components/ui/button';
import { Dialog, DialogOverlay, DialogPortal, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { CommandIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ChatNewDialog () {
  const [open, setOpen] = useState(false);
  const ask = useAsk(() => {
    setOpen(false);
  });
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey) && !(e.shiftKey)) {
        setOpen(true);
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', handle);
    return () => {
      window.removeEventListener('keydown', handle);
    };
  }, []);

  return (
    <Dialog open={ask.loading || open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mb-4 rounded-full cursor-text font-normal text-foreground/70 gap-2">
          <PlusIcon className="size-4 text-muted-foreground" />
          New Thread
          <span className="ml-auto flex-shrink-0 flex gap-1 items-center rounded-full"><CommandIcon size="1em" /> K</span>
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.DialogContent
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 bg-accent shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
            'p-4',
          )}
        >
          <Ask {...ask} />
        </DialogPrimitive.DialogContent>
      </DialogPortal>
    </Dialog>
  );
}