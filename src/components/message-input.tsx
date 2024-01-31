import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SendIcon } from 'lucide-react';
import type { InputHTMLAttributes, RefObject } from 'react';

export function MessageInput ({ className, disabled, inputRef, inputProps }: { className?: string, disabled?: boolean, inputRef?: RefObject<HTMLInputElement>, inputProps?: InputHTMLAttributes<HTMLInputElement> }) {
  return (
    <div className={cn('bg-background flex gap-2 items-center border-2 p-2 rounded-full focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring', className)}>
      <Input
        placeholder="Edit..."
        {...inputProps}
        ref={inputRef}
        className="border-none rounded-full ring-0 outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled={disabled || inputProps?.disabled}
      />
      <Button size="icon" className="rounded-full flex-shrink-0" disabled={disabled}>
        <SendIcon size="1em" />
      </Button>
    </div>
  );
}
