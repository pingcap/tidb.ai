'use client';

import { FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ReactNode } from 'react';

export function NumberFieldInput ({ name, defaultValue, children }: { name: string, defaultValue: string | number | undefined, children: ReactNode }) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder={defaultValue != null ? String(defaultValue) : defaultValue}
              onBlur={(event) => {
                if (defaultValue != null) {
                  if (event.currentTarget.value === '') {
                    field.onChange(defaultValue);
                  }
                }
                field.onBlur();
              }}
            />
          </FormControl>
          {children}
        </>

      )}
    />
  );
}