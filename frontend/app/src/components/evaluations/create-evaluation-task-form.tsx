import { createEvaluationTask, type CreateEvaluationTaskParams, type EvaluationTask } from '@/api/evaluations';
import { ChatEngineSelect, EvaluationDatasetSelect } from '@/components/form/biz';
import { FormInput } from '@/components/form/control-widget';
import { FormFieldBasicLayout } from '@/components/form/field-layout';
import { FormRootError } from '@/components/form/root-error';
import { handleSubmitHelper } from '@/components/form/utils';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { z, type ZodType } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  evaluation_dataset_id: z.number().int(),
  chat_engine: z.string().optional(),
  run_size: z.coerce.number().int().min(1).optional(),
}) satisfies ZodType<CreateEvaluationTaskParams, any, any>;

export function CreateEvaluationTaskForm ({ transitioning, onCreated }: { transitioning?: boolean, onCreated?: (task: EvaluationTask) => void }) {
  const id = useId();

  const form = useForm<CreateEvaluationTaskParams>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const handleSubmit = handleSubmitHelper(form, async data => {
    const result = await createEvaluationTask(data);
    onCreated?.(result);
  });

  return (
    <Form {...form}>
      <form id={id} className="max-w-screen-sm space-y-4" onSubmit={handleSubmit}>
        <FormFieldBasicLayout name="name" label="Name" required>
          <FormInput />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="evaluation_dataset_id" label="Evaluation Dataset" required>
          <EvaluationDatasetSelect />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="chat_engine" label="Chat Engine">
          <ChatEngineSelect />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="run_size" label="Run Size">
          <FormInput type="number" min={1} step={1} />
        </FormFieldBasicLayout>
        <FormRootError />
        <Button type="submit" form={id} disabled={transitioning || form.formState.isSubmitting || form.formState.disabled}>
          Create
        </Button>
      </form>
    </Form>
  );
}