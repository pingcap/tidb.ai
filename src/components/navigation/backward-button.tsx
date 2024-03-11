'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function BackwardButton ({ className, disabled, variant = 'ghost', ...props }: Omit<ButtonProps, 'children'>) {
  const [transitioning, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      {...props}
      className={cn('gap-2', className, transitioning && 'cursor-wait')}
      variant={variant}
      disabled={disabled || transitioning}
      onClick={(event) => {
        startTransition(() => {
          props.onClick?.(event);
          if (!event.defaultPrevented) {
            router.back();
          }
        });
      }}
    >
      <ChevronLeft className="w-4 h-4" />
      Back
    </Button>
  );
}