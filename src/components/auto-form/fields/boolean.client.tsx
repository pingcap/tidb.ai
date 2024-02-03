'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField } from '@/components/ui/form';
import type { ReactNode } from 'react';

export function BooleanFieldInput ({ name, children }: { name: string, children: ReactNode }) {
  return (
    <FormField
      name={name}
      render={({ field: { value, onChange, ...field } }) => (
        <>
          <FormControl>
            <Checkbox {...field} checked={value} onCheckedChange={onChange} />
          </FormControl>
          {children}
        </>

      )}
    />
  );
}