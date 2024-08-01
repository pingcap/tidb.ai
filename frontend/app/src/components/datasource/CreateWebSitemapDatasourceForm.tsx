import { type BaseCreateDatasourceParams, createDatasource, type Datasource } from '@/api/datasources';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z, type ZodType } from 'zod';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  build_kg_index: z.boolean(),
  url: z.string().url(),
}) satisfies ZodType<BaseCreateDatasourceParams, any, any>;

export interface CreateWebSitemapDatasourceFormProps {
  transitioning?: boolean;
  onCreated?: (datasource: Datasource) => void;
}

export default function CreateWebSitemapDatasourceForm ({ onCreated, transitioning }: CreateWebSitemapDatasourceFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      build_kg_index: false,
      url: '',
    },
  });

  const handleSubmit = form.handleSubmit(async ({ url, ...data }) => {
    const createdDatasource = await createDatasource({
      ...data,
      data_source_type: 'web_sitemap',
      config: { url },
    });
    onCreated?.(createdDatasource);
  });

  return (
    <Form {...form}>
      <form id="create-datasource-form" className="space-y-4" onSubmit={handleSubmit}>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com/sitemap.xml" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <div className="mt-4 space-y-4">
        <Separator />
        <FormField
          name="build_kg_index"
          render={({ field }) => (
            <FormItem className="rounded-lg border p-4 flex items-center justify-between text-sky-500 bg-sky-500/5 border-sky-500/30">
              <div className="space-y-2">
                <FormLabel>Build KnowledgeGraph Index</FormLabel>
                <FormDescription className="text-sky-500/70">
                  Enable to build knowledge graph index.
                </FormDescription>
              </div>
              <FormControl>
                <Switch {...field} onChange={undefined} checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={transitioning || form.formState.isSubmitting} className="gap-2" form="create-datasource-form">
          {(transitioning || form.formState.isSubmitting) && <Loader2Icon className="size-4 animate-spin repeat-infinite" />}
          <span>Create Datasource</span>
        </Button>
      </div>
    </Form>
  );
}