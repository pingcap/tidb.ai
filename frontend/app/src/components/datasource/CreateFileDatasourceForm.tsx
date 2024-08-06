import { type BaseCreateDatasourceParams, createDatasource, type Datasource, uploadFiles } from '@/api/datasources';
import { BasicCreateDatasourceFormLayout } from '@/components/datasource/BasicCreateDatasourceForm';
import { FormFieldBasicLayout } from '@/components/form/field-layout';
import { FilesInput } from '@/components/form/widgets/FilesInput';
import { zodFile } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z, type ZodType } from 'zod';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  files: zodFile().array(),
  build_kg_index: z.boolean(),
  llm_id: z.number().nullable(),
}) satisfies ZodType<BaseCreateDatasourceParams, any, any>;

export interface CreateFileDatasourceFormProps {
  excludesLLM?: boolean;
  transitioning?: boolean;
  onCreated?: (datasource: Datasource) => void;
}

export default function CreateFileDatasourceForm ({ excludesLLM, transitioning, onCreated }: CreateFileDatasourceFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      files: [],
      build_kg_index: false,
      llm_id: null,
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
    <BasicCreateDatasourceFormLayout form={form} onSubmit={handleSubmit} transitioning={transitioning} excludesLLM={excludesLLM}>
      <FormFieldBasicLayout name="files" label="Files" description="Currently support Markdown (*.md) and Text (*.txt) files.">
        <FilesInput accept={['text/plain', '.md']} />
      </FormFieldBasicLayout>
    </BasicCreateDatasourceFormLayout>
  );
}
