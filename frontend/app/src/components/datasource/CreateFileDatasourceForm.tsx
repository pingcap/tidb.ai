import { type BaseCreateDatasourceParams, createDatasource, type Datasource, uploadFiles } from '@/api/datasources';
import { FormInput, FormSwitch, FormTextarea } from '@/components/form/control-widget';
import { FormFieldBasicLayout, FormFieldContainedLayout } from '@/components/form/field-layout';
import { FilesInput } from '@/components/form/widgets/FilesInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodFile } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z, type ZodType } from 'zod';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  files: zodFile().array(),
  build_kg_index: z.boolean(),
}) satisfies ZodType<BaseCreateDatasourceParams, any, any>;

export interface CreateFileDatasourceFormProps {
  transitioning?: boolean;
  onCreated?: (datasource: Datasource) => void;
}

export default function CreateFileDatasourceForm ({ transitioning, onCreated }: CreateFileDatasourceFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      files: [],
      build_kg_index: false,
    },
  });

  const handleSubmit = form.handleSubmit(async ({ files, ...data }) => {
    const uploadedFiles = await uploadFiles(files);
    const createdDatasource = await createDatasource({
      ...data,
      data_source_type: 'file',
      config: uploadedFiles.map(file => ({
        file_name: file.name,
        file_id: file.id,
      })),
    });
    onCreated?.(createdDatasource);
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormFieldBasicLayout name="name" label="Name">
          <FormInput />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="description" label="Description">
          <FormTextarea />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="files" label="Files" description="Currently support Markdown (*.md) and Text (*.txt) files.">
          <FilesInput accept={['text/plain', '.md']} />
        </FormFieldBasicLayout>
        <Separator />
        <FormFieldContainedLayout name="build_kg_index" label="Build KnowledgeGraph Index" description="Enable to build knowledge graph index.">
          <FormSwitch />
        </FormFieldContainedLayout>
        <Button type="submit" disabled={transitioning || form.formState.isSubmitting} className="gap-2">
          {(transitioning || form.formState.isSubmitting) && <Loader2Icon className="size-4 animate-spin repeat-infinite" />}
          <span>Create Datasource</span>
        </Button>
      </form>
    </Form>
  );
}
