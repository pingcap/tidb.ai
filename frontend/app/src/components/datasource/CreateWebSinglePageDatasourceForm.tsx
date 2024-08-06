import { type BaseCreateDatasourceParams, createDatasource, type Datasource } from '@/api/datasources';
import { BasicCreateDatasourceFormLayout } from '@/components/datasource/BasicCreateDatasourceForm';
import { FormInput } from '@/components/form/control-widget';
import { FormFieldBasicLayout } from '@/components/form/field-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z, type ZodType } from 'zod';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  build_kg_index: z.boolean(),
  url: z.string().url(),
  llm_id: z.number().nullable(),
}) satisfies ZodType<BaseCreateDatasourceParams, any, any>;

export interface CreateWebSinglePageDatasourceFormProps {
  excludesLLM?: boolean;
  transitioning?: boolean;
  onCreated?: (datasource: Datasource) => void;
}

export default function CreateWebSinglePageDatasourceForm ({ excludesLLM, transitioning, onCreated }: CreateWebSinglePageDatasourceFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      build_kg_index: false,
      url: '',
      llm_id: null,
    },
  });

  const handleSubmit = form.handleSubmit(async ({ url, ...data }) => {
    const createdDatasource = await createDatasource({
      ...data,
      data_source_type: 'web_single_page',
      config: { url },
    });
    onCreated?.(createdDatasource);
  });

  return (
    <BasicCreateDatasourceFormLayout form={form} onSubmit={handleSubmit} transitioning={transitioning} excludesLLM={excludesLLM}>
      <FormFieldBasicLayout name="url" label="Page URL">
        <FormInput placeholder="https://example.com/" />
      </FormFieldBasicLayout>
    </BasicCreateDatasourceFormLayout>
  );
}
