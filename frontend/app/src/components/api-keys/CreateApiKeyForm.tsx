import { createApiKey, type CreateApiKey, type CreateApiKeyResponse } from '@/api/api-keys';
import { FormInput } from '@/components/form/control-widget';
import { FormFieldBasicLayout } from '@/components/form/field-layout';
import { FormSubmit } from '@/components/form/submit';
import { handleSubmitHelper } from '@/components/form/utils';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  description: z.string(),
});

export interface CreateApiKeyFormProps {
  onCreated?: (data: CreateApiKeyResponse) => void;
}

export function CreateApiKeyForm ({ onCreated }: CreateApiKeyFormProps) {
  const form = useForm<CreateApiKey>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
    },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmitHelper(form, async data => {
          const response = await createApiKey(data);
          onCreated?.(response);
        })}
      >
        <FormFieldBasicLayout name="description" label="API Key Descrtipion">
          <FormInput />
        </FormFieldBasicLayout>
        <FormSubmit submittingText="Creating API Key...">
          Create API Key
        </FormSubmit>
      </form>
    </Form>
  );
}