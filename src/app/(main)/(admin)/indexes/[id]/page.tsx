'use client';

import { useIndex } from '@/app/(main)/(admin)/indexes/[id]/context';
import { Form, FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';

export default function Page () {
  const index = useIndex();
  const form = useForm();
  return (
    <>
      <article className="prose prose-sm">
        <h2>
          <code>{index.name}</code> Index Configuration
        </h2>
        <p>
          This is configuration for document index <code>{index.name}</code>(using {index.config.provider}).
        </p>
        <p>
          You need to setup all configurations in tabs above. Once your configuration is completed,
          turn on the switch below. You <b>can&#39;t</b> change configurations after index is marked `configured`.
        </p>
      </article>
      <div className="mt-8">
        <Form {...form}>
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Configured
              </FormLabel>
              <FormDescription className="text-yellow-500">
                You can&#39;t revert this operation
              </FormDescription>
            </div>
            <FormControl>
              <Switch

              />
            </FormControl>
          </FormItem>
        </Form>
      </div>
    </>
  );
}