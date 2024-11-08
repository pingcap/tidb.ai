import { LLMSelect } from '@/components/form/biz';
import { FormInput } from '@/components/form/control-widget';
import { FormFieldBasicLayout } from '@/components/form/field-layout';
import { handleSubmitHelper } from '@/components/form/utils';
import { createDatasourceSchema, FormCreateDataSources } from '@/components/knowledge-base/form-create-data-sources';
import { FormIndexMethods } from '@/components/knowledge-base/form-index-methods';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export interface CreateKnowledgeBaseFormProps {
}

export function CreateKnowledgeBaseForm () {
  const form = useForm<z.infer<typeof createKnowledgeBaseParamsSchema>>({
    resolver: zodResolver(createKnowledgeBaseParamsSchema),
    defaultValues: {
      name: '',
      description: '',
      index_methods: ['vector_index'],
      data_sources: [
        { name: '', description: '', data_source_type: 'file', files: [] },
      ],
    },
  });

  const handleSubmit = handleSubmitHelper(form, async (data) => {}, () => {
    console.log(form.getValues());
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormFieldBasicLayout name="name" label="Name">
          <FormInput />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="description" label="Description">
          <FormInput />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="llm_id" label="LLM" description="Which LLM to use to build the index. Will use Default LLM if not specified.">
          <LLMSelect />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="embedding_model_id" label="Embedding Model" description="TBD">
          <FormInput />
        </FormFieldBasicLayout>
        <FormCreateDataSources />
        <FormFieldBasicLayout name="index_methods" label="Index Methods">
          <FormIndexMethods />
        </FormFieldBasicLayout>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const createKnowledgeBaseParamsSchema = z.object({
  name: z.string(),
  description: z.string(),
  index_methods: z.string().array(),
  llm_id: z.number(),
  embedding_model_id: z.number(),
  data_sources: createDatasourceSchema.array(), // use external form
});
