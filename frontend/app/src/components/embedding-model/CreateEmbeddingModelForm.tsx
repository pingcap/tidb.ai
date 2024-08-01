'use client';

import { createEmbeddingModel, type EmbeddingModel, type EmbeddingModelOption, listEmbeddingModelOptions, testEmbeddingModel } from '@/api/embedding-model';
import { FormInput } from '@/components/form/control-widget';
import { FormFieldBasicLayout } from '@/components/form/field-layout';
import { FormRootError } from '@/components/form/root-error';
import { CodeInput } from '@/components/form/widgets/CodeInput';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getErrorMessage } from '@/lib/errors';
import { zodJsonText } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';
import { z } from 'zod';

const unsetForm = z.object({
  name: z.string().min(1, 'Must not empty'),
  provider: z.string().min(1, 'Must not empty'),
  config: zodJsonText().optional(),
  is_default: z.boolean().optional(),
});

const strCredentialForm = unsetForm.extend({
  model: z.string().min(1, 'Must not empty'),
  credentials: z.string().min(1, 'Must not empty'),
});

const dictCredentialForm = unsetForm.extend({
  model: z.string().min(1, 'Must not empty'),
  credentials: z.object({}).passthrough(),
});

export function CreateEmbeddingModelForm ({ transitioning, onCreated }: { transitioning?: boolean, onCreated?: (embeddingModel: EmbeddingModel) => void }) {
  const [provider, setProvider] = useState<EmbeddingModelOption>();

  const form = useForm<any>({
    resolver: zodResolver(
      provider
        ? provider.credentials_type === 'str'
          ? strCredentialForm
          : provider.credentials_type === 'dict'
            ? dictCredentialForm
            : unsetForm
        : unsetForm),
    defaultValues: {
      name: '',
      provider: '',
      model: '',
      credentials: '',
      is_default: true,
    },
  });

  useEffect(() => {
    if (provider) {
      form.reset({
        ...form.getValues(),
        model: provider.default_embedding_model,
        credentials: provider.credentials_type === 'dict' ? undefined : '',
      });
    } else {
      const { name, is_default } = form.getValues();
      form.reset({
        name,
        is_default,
        provider: '',
        credentials: '',
        model: '',
      });
    }
  }, [provider]);

  const handleSubmit = form.handleSubmit(async (values) => {
    const { error, success } = await testEmbeddingModel(values);
    if (!success) {
      form.setError('root', { message: error || 'Unknown error' });
      return;
    }
    try {
      const embeddingModel = await createEmbeddingModel(values);
      toast('Embedding Model successfully created.');
      onCreated?.(embeddingModel);
    } catch (error) {
      form.setError('root', { message: getErrorMessage(error) });
    }
  });

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormFieldBasicLayout name="name" label="Name">
            <FormInput />
          </FormFieldBasicLayout>
          <EmbeddingModelFields onSelectProvider={setProvider} />
          <FormRootError title="Failed to create Embedding Model" />
          <Button disabled={form.formState.disabled || !provider || form.formState.isSubmitting || transitioning}>
            {(form.formState.isSubmitting || transitioning) && <Loader2Icon className="size-4 mr-1 animate-spin repeat-infinite" />}
            Create Embedding Model
          </Button>
        </form>
      </Form>
    </>
  );
}

function useEmbeddingModelOptions () {
  const { data: options } = useSWR('api.embedding-models.list-options', listEmbeddingModelOptions);

  return options;
}

function EmbeddingModelFields ({ onSelectProvider }: { onSelectProvider: (embeddingModelOption: EmbeddingModelOption | undefined) => void }) {
  const providerOptions = useEmbeddingModelOptions();
  const provider = useWatch<{ provider: string }>({ name: 'provider' });

  const providerOption = providerOptions?.find(o => o.provider === provider);

  let fields: ReactNode;

  const form = useFormContext();

  if (!providerOption) {
    fields = <div className="border rounded-lg bg-muted p-8 text-muted-foreground font-bold text-center text-lg">Select provider...</div>;
  } else {
    fields = (
      <>
        <FormFieldBasicLayout name="model" label="Model" description={providerOption.embedding_model_description}>
          <FormInput />
        </FormFieldBasicLayout>
        <FormFieldBasicLayout name="credentials" label={providerOption.credentials_display_name} description={providerOption.credentials_description}>
          {providerOption.credentials_type === 'str'
            ? <FormInput placeholder={providerOption.default_credentials} />
            : <CodeInput language="json" placeholder={JSON.stringify(providerOption.default_credentials, undefined, 2)} />
          }
        </FormFieldBasicLayout>
        <Accordion type="multiple">
          <AccordionItem value="advanced-settings">
            <AccordionTrigger>
              Advanced Settings
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <FormFieldBasicLayout name="config" label="Config">
                <CodeInput language="json" />
              </FormFieldBasicLayout>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    );
  }

  return (
    <>
      <FormFieldBasicLayout name="provider" label="Provider">
        {field => (
          <Select
            value={field.value}
            onValueChange={value => {
              field.onChange(value);
              onSelectProvider(providerOptions?.find(o => o.provider === value));
            }}
            name={field.name}
            disabled={!providerOptions || field.disabled}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {providerOptions?.map(option => (
                <SelectItem key={option.provider} value={option.provider}>
                  {option.provider}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormFieldBasicLayout>
      {fields}
    </>
  );
}
