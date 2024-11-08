import type { BaseCreateDatasourceParams, CreateDatasourceSpecParams } from '@/api/datasources';
import type { CreateKnowledgeBaseParams } from '@/api/knowledge-base';
import { FormInput } from '@/components/form/control-widget';
import { FormFieldBasicLayout, FormPrimitiveArrayFieldBasicLayout } from '@/components/form/field-layout';
import { FilesInput } from '@/components/form/widgets/FilesInput';
import { Button } from '@/components/ui/button';
import { FormItem, FormMessage } from '@/components/ui/form';
import { FormArrayField } from '@/components/ui/form.ext';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodFile } from '@/lib/zod';
import { PlusIcon } from 'lucide-react';
import { z } from 'zod';

export const createDatasourceSchema = z.object({
  name: z.string().trim().min(1, 'Must not blank'),
  description: z.string(),
}).and(z.discriminatedUnion('data_source_type', [
  z.object({
    data_source_type: z.literal('file'),
    files: zodFile().array().min(1),
  }),
  z.object({
    data_source_type: z.literal('web_single_page'),
    urls: z.string().url().array().min(1),
  }),
  z.object({
    data_source_type: z.literal('web_sitemap'),
    url: z.string().url(),
  }),
]));

export function FormCreateDataSources () {
  return (
    <FormArrayField<CreateKnowledgeBaseParams, 'data_sources'>
      name="data_sources"
      render={({ field: { fields, update, append, remove } }) => (
        <FormItem className="space-y-4">
          <div className="font-medium">Datasource</div>
          <div className="px-4 space-y-4">
            {(fields).map((field, index) => (
              <div key={index} className="space-y-4">
                {index > 0 && <Separator />}
                <FormFieldBasicLayout name={`data_sources.${index}.name`} label="Datasource Name">
                  <FormInput />
                </FormFieldBasicLayout>
                <FormFieldBasicLayout name={`data_sources.${index}.description`} label="Datasource Description">
                  <FormInput />
                </FormFieldBasicLayout>
                <Tabs
                  value={field.data_source_type}
                  onValueChange={(value => update(index, { ...switchDatasource(field, value as never) }))}
                >
                  <TabsList>
                    <TabsTrigger value="file">
                      File
                    </TabsTrigger>
                    <TabsTrigger value="web_single_page">
                      Web Single Page
                    </TabsTrigger>
                    <TabsTrigger value="web_sitemap">
                      Web Sitemap
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                {field.data_source_type === 'file' && (
                  <FormFieldBasicLayout name={`data_sources.${index}.files`} label="Files" description="Currently support Markdown (*.md), PDF (*.pdf), Microsoft Word (*.docx), Microsoft PowerPoint (*.pptx), Microsoft Excel (*.xlsx) and Text (*.txt) files.">
                    <FilesInput accept={['text/plain', 'application/pdf', '.md', '.docx', '.pptx', '.xlsx']} />
                  </FormFieldBasicLayout>
                )}
                {field.data_source_type === 'web_single_page' && (
                  <FormPrimitiveArrayFieldBasicLayout name={`data_sources.${index}.urls`} label="Page URL" defaultValue={() => ''}>
                    <FormInput placeholder="https://example.com/" />
                  </FormPrimitiveArrayFieldBasicLayout>
                )}
                {field.data_source_type === 'web_sitemap' && (
                  <FormFieldBasicLayout name={`data_sources.${index}.url`} label="Sitemap URL">
                    <FormInput placeholder="https://example.com/sitemap.xml" />
                  </FormFieldBasicLayout>
                )}
                <FormMessage />
                {index > 0 && <Button type="button" variant="outline" onClick={() => remove(index)}>Remove</Button>}
              </div>
            ))}
          </div>
          <FormMessage />
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: '', description: '', data_source_type: 'file', config: [] })}
          >
            <PlusIcon className="size-4 ml-1" />
            New Datasource
          </Button>
        </FormItem>
      )}
    />)
    ;
}

function switchDatasource (data: BaseCreateDatasourceParams & CreateDatasourceSpecParams, type: CreateDatasourceSpecParams['data_source_type']): BaseCreateDatasourceParams & CreateDatasourceSpecParams {
  switch (type) {
    case 'file':
      return {
        name: data.name,
        description: data.description,
        data_source_type: 'file',
        config: [],
      };
    case 'web_single_page':
      return {
        name: data.name,
        description: data.description,
        data_source_type: 'web_single_page',
        config: { urls: [] },
      };
    case 'web_sitemap':
      return {
        name: data.name,
        description: data.description,
        data_source_type: 'web_sitemap',
        config: { url: '' },
      };
  }
}
