'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/components/hooks';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useSWRConfig } from 'swr';
import {
  SecuritySetting,
  ISecuritySettingResult,
  SecuritySettingUpdatePayload,
} from '@/core/schema/setting';
import { ReCaptchaSelector } from '@/components/reCaptcha-selector';
import { updateSettingSecurity as updateSetting } from '@/client/operations/settings';

export default function SecurityPage() {
  const [data, setData] = React.useState<ISecuritySettingResult>({});

  const settings = useSettings<ISecuritySettingResult>({}, 'security');
  const form = useForm<z.infer<typeof SecuritySettingUpdatePayload>>({
    resolver: zodResolver(SecuritySettingUpdatePayload),
  });

  React.useEffect(() => {
    form.reset(settings);
    setData(settings);
  }, [settings]);

  const { mutate } = useSWRConfig();

  async function onSubmit(data: z.infer<typeof SecuritySettingUpdatePayload>) {
    await updateSetting(data, mutate);
  }

  return (
    <>
      <h3 className='text-lg font-semibold mt-8 mb-4'>reCAPTCHA Settings</h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={(e) => {
            setData(form.getValues());
          }}
          className='w-full space-y-6'
        >
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='google_recaptcha'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>reCAPTCHA</FormLabel>
                <ReCaptchaSelector
                  controlForm={form}
                  {...field}
                  onSelected={() => {
                    setData(form.getValues());
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='google_recaptcha_site_key'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`reCAPTCHA ${data.google_recaptcha} Site Key`}</FormLabel>
                <FormControl>
                  <Input placeholder='Site Key' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='google_recaptcha_secret_key'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{data.google_recaptcha === 'enterprise' ? `Google Cloud API KEY` : `reCAPTCHA v3 Site Secret`}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='google_recaptcha_enterprise_project_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{data.google_recaptcha === 'enterprise' ? `Google Cloud Project ID`: `reCAPTCHA Label`}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            )}
            Update preferences
          </Button>
        </form>
      </Form>
    </>
  );
}
