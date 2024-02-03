'use client';

import { FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ReactNode } from 'react';

export function StringFieldInput ({ name, children }: { name: string, children: ReactNode }) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <>
          <FormControl>
            <Input {...field} />
          </FormControl>
          {children}
        </>
      )}
    />
  );
}
