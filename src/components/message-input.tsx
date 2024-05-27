'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ChatEngine } from '@/core/repositories/chat_engine';
import type { Page } from '@/lib/database';
import { fetcher } from '@/lib/fetch';
import { cn } from '@/lib/utils';
import isHotkey from 'is-hotkey';
import { ArrowRightIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { type ChangeEvent, type RefObject, useCallback, useRef, useState } from 'react';
import TextareaAutosize, { type TextareaAutosizeProps } from 'react-textarea-autosize';
import useSWR from 'swr';

export interface MessageInputProps {
  className?: string,
  disabled?: boolean,
  inputRef?: RefObject<HTMLTextAreaElement>,
  inputProps?: TextareaAutosizeProps,
  engine?: number,
  onEngineChange?: (id: number) => void,
}

export function MessageInput ({
  className,
  disabled,
  inputRef,
  inputProps,
  engine,
  onEngineChange,
}: MessageInputProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [empty, setEmpty] = useState(true);

  const onChangeRef = useRef(inputProps?.onChange);
  onChangeRef.current = inputProps?.onChange;
  const handleChange = useCallback((ev: ChangeEvent<HTMLTextAreaElement>) => {
    setEmpty(!ev.currentTarget.value.trim());
    onChangeRef.current?.(ev);
  }, []);

  const session = useSession();
  const showShowSelectChatEngine = onEngineChange && session.data?.user?.role === 'admin';
  const { data } = useSWR(showShowSelectChatEngine ? ['get', '/api/v1/chat_engines?page_size=999'] : undefined, fetcher<Page<ChatEngine>>);

  return (
    <div className={cn('bg-background flex gap-2 items-end border p-2 rounded-lg', className)}>
      <TextareaAutosize
        placeholder="Input your question here..."
        onKeyDown={e => {
          if (!e.nativeEvent.isComposing && isHotkey('mod+Enter', e) && !disabled) {
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
      {showShowSelectChatEngine && <Select value={engine ? String(engine) : ''} onValueChange={value => onEngineChange?.(parseInt(value))}>
        <SelectTrigger className="w-max border-none h-max">
          <SelectValue placeholder="Select Chat Engine" />
        </SelectTrigger>
        <SelectContent>
          {data?.data.map(item => (
            <SelectItem key={item.id} value={String(item.id)} textValue={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>}
      <Button size="icon" className="rounded-full flex-shrink-0 w-8 h-8 p-2" disabled={empty || disabled} ref={buttonRef}>
        <ArrowRightIcon className="w-full h-full" />
      </Button>
    </div>
  );
}
