'use client';

import { createLlm, listLlmOptions, type LLM, type LlmOption, testLlm } from '@/api/llms';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
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
  config: z.object({}).passthrough().optional(),
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

export function CreateLLMForm ({ transitioning, onCreated }: { transitioning?: boolean, onCreated?: (llm: LLM) => void }) {
  const [provider, setProvider] = useState<LlmOption>();

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
      is_default: false,
    },
  });

  useEffect(() => {
    if (provider) {
      form.reset({
        ...form.getValues(),
        model: provider.default_model,
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
    const { error, success } = await testLlm(values);
    if (!success) {
      form.setError('root', { message: error || 'Unknown error' });
      return;
    }
    const llm = await createLlm(values);
    toast('LLM successfully created.');
    onCreated?.(llm);
    // startTransition(() => {
    //   router.push(`/llms/${llm.id}`);
    // });
  });

  const error = form.formState.errors.root;

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LlmFields onSelectProvider={setProvider} />
          <FormField
            name="is_default"
            render={({ field }) => (
              <FormItem className="rounded-lg border p-4 flex items-center justify-between text-sky-500 bg-sky-500/5 border-sky-500/30">
                <div className="space-y-2">
                  <FormLabel>Default LLM</FormLabel>
                  <FormDescription className="text-sky-500/70">
                    Enable will unset original default LLM.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch {...field} onChange={undefined} checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <Alert variant="destructive">
            <AlertTitle>Failed to create LLM</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>}
          <Button disabled={form.formState.disabled || !provider || form.formState.isSubmitting || transitioning}>
            {(form.formState.isSubmitting || transitioning) && <Loader2Icon className="size-4 mr-1 animate-spin repeat-infinite" />}
            Create LLM
          </Button>
        </form>
      </Form>
    </>
  );
}

function useLlmOptions () {
  const { data: options } = useSWR('api.llms.list-options', listLlmOptions);

  return options;
}

function LlmFields ({ onSelectProvider }: { onSelectProvider: (llmOption: LlmOption | undefined) => void }) {
  const providerOptions = useLlmOptions();
  const provider = useWatch<{ provider: string }>({ name: 'provider' });

  const providerOption = providerOptions?.find(o => o.provider === provider);

  let fields: ReactNode;

  const form = useFormContext();

  if (!providerOption) {
    fields = <div className="border rounded-lg bg-muted p-8 text-muted-foreground font-bold text-center text-lg">Select provider...</div>;
  } else {
    fields = (
      <>
        <FormField
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                {providerOption.model_description}
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="credentials"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{providerOption.credentials_display_name}</FormLabel>
              <FormControl>
                {providerOption.credentials_type === 'str'
                  ? <Input {...field} placeholder={providerOption.default_credentials} />
                  : <Textarea
                    {...field}
                    value={undefined}
                    onChange={event => {
                      try {
                        field.onChange(JSON.parse(event.target.value));
                        form.clearErrors('credentials');
                      } catch {
                        form.setError('credentials', {
                          message: 'Invalid JSON',
                        });
                        form.setValue('credentials', undefined, { shouldTouch: true, shouldDirty: true, shouldValidate: false });
                      }
                    }}
                    placeholder={JSON.stringify(providerOption.default_credentials, undefined, 2)}
                  />
                }
              </FormControl>
              <FormMessage />
              <FormDescription>
                {providerOption.credentials_description}
              </FormDescription>
            </FormItem>
          )}
        />
        <Accordion type="multiple">
          <AccordionItem value="advanced-settings">
            <AccordionTrigger>
              Advanced Settings
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <FormField
                name="config"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Config</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={undefined}
                        onChange={event => {
                          try {
                            field.onChange(JSON.parse(event.target.value));
                            form.clearErrors('config');
                          } catch {
                            form.setError('config', {
                              message: 'Invalid JSON',
                            });
                            form.setValue('config', undefined, { shouldTouch: true, shouldDirty: true, shouldValidate: false });
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    );
  }

  return (
    <>
      <FormField
        name="provider"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Provider</FormLabel>
            <FormControl>
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
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {fields}
    </>
  );
}
