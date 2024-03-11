'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Ref } from 'react';

export interface RagComponentSelectorProps {
  options: RagComponentSelectorOptions[];
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;

  triggerRef?: Ref<any>;

  value?: string;
  onSelectValue?: (identifier?: string) => void;
}

export type RagComponentSelectorOptions = {
  displayName: string
  identifier: string
}

export function RagComponentSelector ({ name, triggerRef, placeholder, disabled, options, defaultValue, value, onSelectValue }: RagComponentSelectorProps) {
  return (
    <Select value={value} defaultValue={defaultValue} disabled={disabled} onValueChange={onSelectValue}>
      <SelectTrigger name={name} ref={triggerRef}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem value={option.identifier}>
            {option.displayName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}