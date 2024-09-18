'use client';

import { listChatEngines } from '@/api/chat-engines';
import { useAuth } from '@/components/auth/AuthProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import isHotkey from 'is-hotkey';
import { ArrowRightIcon } from 'lucide-react';
import { type ChangeEvent, type Ref, type RefObject, useCallback, useRef, useState } from 'react';
import TextareaAutosize, { type TextareaAutosizeProps } from 'react-textarea-autosize';
import useSWR from 'swr';

export interface MessageInputProps {
  className?: string,
  disabled?: boolean,
  actionDisabled?: boolean,
  inputRef?: Ref<HTMLTextAreaElement>,
  inputProps?: TextareaAutosizeProps,
  engine?: string,
  onEngineChange?: (name: string) => void,
}

export function MessageInput ({
  className,
  disabled,
  actionDisabled,
  inputRef,
  inputProps,
  engine,
  onEngineChange,
}: MessageInputProps) {
  const auth = useAuth();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onChangeRef = useRef(inputProps?.onChange);
  onChangeRef.current = inputProps?.onChange;
  const handleChange = useCallback((ev: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeRef.current?.(ev);
  }, []);

  const showShowSelectChatEngine = !!auth.me?.is_superuser && !!onEngineChange;
  const { data, isLoading } = useSWR(showShowSelectChatEngine && 'api.chat-engines.list', () => listChatEngines());

  return (
    <div className={cn('bg-background flex gap-2 items-end border p-2 rounded-lg', className)}>
      <TextareaAutosize
        placeholder="Input your question here..."
        onKeyDown={e => {
          if (!e.nativeEvent.isComposing && isHotkey('mod+Enter', e) && !actionDisabled) {
            e.preventDefault();
            buttonRef.current?.click();
          }
        }}
        {...inputProps}
        onChange={handleChange}
        ref={inputRef}
        className="flex-1 border-none ring-0 outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none placeholder:font-light placeholder-gray-400 dark:placeholder-gray-500 max-h-72"
        disabled={disabled || inputProps?.disabled}
        minRows={4}
      />
      {showShowSelectChatEngine && <Select value={engine ?? ''} onValueChange={value => onEngineChange?.(value)}>
        <SelectTrigger className="w-max border-none h-max" disabled={isLoading}>
          <SelectValue placeholder="Select Chat Engine" />
        </SelectTrigger>
        <SelectContent>
          {data?.items.map(item => (
            <SelectItem key={item.name} value={String(item.name)} textValue={item.name}>
              <span className="flex items-center gap-2">
                {item.is_default ? <Badge variant="outline" className="text-green-500 border-green-500/50">default</Badge> : item.name} {item.engine_options.knowledge_graph.enabled && <Badge>Knowledge graph enabled</Badge>}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>}
      <Button size="icon" className="rounded-full flex-shrink-0 w-8 h-8 p-2" disabled={actionDisabled || disabled} ref={buttonRef}>
        <ArrowRightIcon className="w-full h-full" />
      </Button>
    </div>
  );
}
