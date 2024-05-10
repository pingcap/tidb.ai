import { createIndex } from '@/client/operations/index_';
import {BasicFormDialog} from "@/components/dialogs/basic-form-dialog";
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  duplicate_from: z.coerce.number().int().optional(),
});

export function CreateIndexDialog ({}) {
  return (
    <BasicFormDialog
      title="Create index"
      onSubmit={createIndex}
      trigger={<Button className="gap-1" size="sm" variant="secondary">New</Button>}
      schema={schema}
    >
      <FormField
        name="name"
        render={({ field: { ...field } }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="duplicate_from"
        render={({ field: { ...field } }) => (
          <FormItem>
            <FormLabel>Duplicate from index (id)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </BasicFormDialog>
  );
}
