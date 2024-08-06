import { LLMSelect } from '@/components/form/biz';
import { FormInput, FormSwitch, FormTextarea } from '@/components/form/control-widget';
import { FormFieldBasicLayout, FormFieldContainedLayout } from '@/components/form/field-layout';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Loader2Icon } from 'lucide-react';
import type { FormEventHandler, ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export function BasicCreateDatasourceFormLayout ({ children, onSubmit, form, transitioning, excludesLLM }: { children: ReactNode, form: UseFormReturn<any, any, any>, transitioning: boolean | undefined, onSubmit?: FormEventHandler<HTMLFormElement>, excludesLLM?: boolean }) {
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormFieldBasicLayout name="name" label="Name">
          <FormInput />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="description" label="Description">
          <FormTextarea />
        </FormFieldBasicLayout>
        {children}
        <Separator />
        {!excludesLLM && <FormFieldBasicLayout name="llm_id" label="LLM" description="Which LLM to use to build the index. Will use Default LLM if not specified.">
          <LLMSelect />
        </FormFieldBasicLayout>}
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