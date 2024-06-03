'use client';

import { useIndex } from '@/app/(main)/(admin)/indexes/[id]/context';
import { SummaryStatsBar } from '@/app/(main)/(admin)/indexes/[id]/SummaryStatsBar';
import { Form, FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useOperation } from '@/components/use-operation';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Page () {
  const router = useRouter();
  const index = useIndex();
  const form = useForm();
  const { operating: enabling, operate: enable } = useOperation(enableIndex);

  const isGraph = index.config.provider === 'knowledge-graph';

  return (
    <>
      <article className="prose prose-sm prose-neutral dark:prose-invert">
        <h2>
          <code>{index.name}</code> Index Configuration
        </h2>
        <p>
          This is configuration for document index <code>{index.name}</code>(using {index.config.provider}).
        </p>
        {!isGraph && (
          <>
            <p>
              You need to setup all configurations in tabs above. Once enable your index (turn on the switch below),
              you <b>can&#39;t</b> change your index configurations.
            </p>
            <div className="mt-8">
              <Form {...form}>
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Enabled
                    </FormLabel>
                    <FormDescription className="text-yellow-500">
                      You can&#39;t revert this operation
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={!!index.configured || enabling}
                      disabled={!!index.configured || enabling}
                      onCheckedChange={checked => {
                        if (checked) {
                          enable(index.name)
                            .then(() => {
                              router.refresh();
                            });
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              </Form>
            </div>
            {index.configured && <>
              <h2>
                Index Stats
              </h2>
              <SummaryStatsBar index={index} className="my-2" />
            </>}
          </>
        )}
      </article>
    </>
  );
}

const enableIndex = withToast((name: string) =>
  fetch(`/api/v1/indexes/${name}/enable`, {
    method: 'POST',
  })
    .then(handleErrors),
);
