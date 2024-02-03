'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import { PlusIcon, Trash2Icon, TrashIcon } from 'lucide-react';
import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

export function ArrayFieldInput ({ name, element, children }: { name: string, element: ReactElement, children: ReactNode }) {
  const form = useFormContext();

  return (
    <FormField
      name={name}
      render={({ field: { value, onChange } }) => (
        <>
          <ol className="space-y-4">
            {(value as any[])?.map((_, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="space-y-2 flex-1">
                  {cloneElement(element, { name: name + '.' + index })}
                </div>
                <Button type="button" variant="ghost" size="icon" className="w-max h-max rounded-full p-2" onClick={() => {
                  value = [...form.getValues(name)];
                  value.splice(index, 1);
                  onChange(value);
                }}>
                  <Trash2Icon className="w-5 h-5" />
                </Button>
              </li>
            ))}
          </ol>
          <Button type="button" className="gap-1" variant="ghost" onClick={() => onChange([...form.getValues(name) ?? [], undefined])}>
            <PlusIcon className="w-4 h-4" /> Add
          </Button>
          {children}
        </>
      )}
    />
  );
}