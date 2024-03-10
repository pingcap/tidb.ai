'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import { type ChangeEvent, type RefObject, useCallback, useRef, useState } from 'react';
import TextareaAutosize, { type TextareaAutosizeProps } from 'react-textarea-autosize';

export function MessageInput ({ className, disabled, inputRef, inputProps }: { className?: string, disabled?: boolean, inputRef?: RefObject<HTMLTextAreaElement>, inputProps?: TextareaAutosizeProps }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [empty, setEmpty] = useState(true);

  const onChangeRef = useRef(inputProps?.onChange);
  onChangeRef.current = inputProps?.onChange;
  const handleChange = useCallback((ev: ChangeEvent<HTMLTextAreaElement>) => {
    setEmpty(!ev.currentTarget.value.trim());
    onChangeRef.current?.(ev);
  }, []);

  return (
    <div className={cn('bg-background flex gap-2 items-end border p-2 rounded-lg', className)}>
      <TextareaAutosize
        placeholder="Input your question here..."
        onKeyDown={e => {
          if (!e.nativeEvent.isComposing && e.key === 'Enter' && !disabled) {
            e.preventDefault();
            buttonRef.current?.click();
          }
        }}
        {...inputProps}
        onChange={handleChange}
        ref={inputRef}
        className="flex-1 border-none ring-0 outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none placeholder:font-light placeholder-gray-400 dark:placeholder-gray-500"
        disabled={disabled || inputProps?.disabled}
        minRows={4}
      />
      <Button size="icon" className="rounded-full flex-shrink-0 w-8 h-8 p-2" disabled={empty || disabled} ref={buttonRef}>
        <ArrowRightIcon className="w-full h-full" />
      </Button>
    </div>
  );
}
