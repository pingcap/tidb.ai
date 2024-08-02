import { type BaseCreateDatasourceParams, createDatasource, type Datasource } from '@/api/datasources';
import { FormInput, FormSwitch, FormTextarea } from '@/components/form/control-widget';
import { FormFieldBasicLayout, FormFieldContainedLayout } from '@/components/form/field-layout';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
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
        <FormFieldBasicLayout name="name" label="Name">
          <FormInput />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="description" label="Description">
          <FormTextarea />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="url" label="Sitemap URL">
          <FormInput placeholder="https://example.com/sitemap.xml" />
        </FormFieldBasicLayout>
        <Separator />
        <FormFieldContainedLayout name="build_kg_index" label="Build KnowledgeGraph Index" description="Enable to build knowledge graph index.">
          <FormSwitch />
        </FormFieldContainedLayout>
        <Button type="submit" disabled={transitioning || form.formState.isSubmitting} className="gap-2" form="create-datasource-form">
          {(transitioning || form.formState.isSubmitting) && <Loader2Icon className="size-4 animate-spin repeat-infinite" />}
          <span>Create Datasource</span>
        </Button>
      </form>
    </Form>
  );
}