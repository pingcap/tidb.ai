'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IWebsiteSettingResult } from "@/core/schema/setting";
import { useSettings } from '@/hooks';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  WebsiteSettingUpdatePayload,
  maxExampleQuestions,
  maxHomepageFooterLinks,
} from '@/core/schema/setting';
import { useContext, useEffect } from 'react';
import { ImageUploader } from '@/components/image-uploader';
import { LanguageSelector } from '@/components/language-selector';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useSWRConfig } from 'swr';
import { PlusIcon, Trash2Icon } from 'lucide-react';

function useSettingsForm() {
  const settings = useSettings<IWebsiteSettingResult>();
  const form = useForm<z.infer<typeof WebsiteSettingUpdatePayload>>({
    resolver: zodResolver(WebsiteSettingUpdatePayload),
  });

  useEffect(() => {
    form.reset(settings);
  }, [settings]);

  return form;
}
export default function SettingsPage() {
  const form = useSettingsForm();
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  async function onSubmit(data: z.infer<typeof WebsiteSettingUpdatePayload>) {
    const res = await fetch('/api/v1/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        group: 'website',
        settings: data,
      }),
    });

    if (res.ok) {
      await mutate(['GET', '/api/v1/settings?group=website']);
      toast({
        variant: 'default',
        description: 'Settings updated successfully.',
      });
    } else {
      toast({
        variant: 'destructive',
        description:
          'Failed to update settings, please check the form and try again.',
      });
    }
  }

  const exampleQuestionsForm = useFieldArray({
    control: form.control,
    name: 'homepage.example_questions',
    rules: { maxLength: maxExampleQuestions },
  });
  const homepageFooterLinksForm = useFieldArray({
    control: form.control,
    name: 'homepage.footer_links',
    rules: { maxLength: maxHomepageFooterLinks },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={(e) => {
            // console.log(e);
          }}
          className='w-full space-y-6'
        >
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='tidb.ai' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-4'>
            <div className={'w-1/2'}>
              <FormField
                control={form.control}
                disabled={form.formState.isSubmitting}
                name='logo_in_light_mode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LOGO (Light mode)</FormLabel>
                    <FormControl>
                      <ImageUploader mode='light' {...field} />
                    </FormControl>
                    <FormDescription>PNG, JPG, GIF up to 2MB</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={'w-1/2'}>
              <FormField
                control={form.control}
                disabled={form.formState.isSubmitting}
                name='logo_in_dark_mode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LOGO (Dark mode)</FormLabel>
                    <FormControl>
                      <ImageUploader mode='dark' {...field} />
                    </FormControl>
                    <FormDescription>PNG, JPG, GIF up to 2MB</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='language'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Language</FormLabel>
                <LanguageSelector controlForm={form} {...field} />
                <FormDescription>
                  This is the language that will be used in the interface.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='The description of the application.'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='homepage.title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>HomePage - Title</FormLabel>
                <FormControl>
                  <Input placeholder='Ask anything about TiDB' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='homepage.description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>HomePage - Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Including company intro, user cases, product intro and usage, FAQ, etc.'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='space-y-2'>
            <FormLabel>HomePage - Example Qeustions</FormLabel>
            {exampleQuestionsForm.fields.map((field, index) => {
              return (
                <div key={field.id} className='flex gap-4'>
                  <div className='w-full'>
                    <FormField
                      control={form.control}
                      disabled={form.formState.isSubmitting}
                      name={`homepage.example_questions.${index}`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder='Example question'
                                {...form.register(
                                  `homepage.example_questions.${index}.text` as const
                                )}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className=''>
                    <Button
                      variant='outline'
                      onClick={() => exampleQuestionsForm.remove(index)}
                    >
                      <Trash2Icon size='1rem' className='' />
                    </Button>
                  </div>
                </div>
              );
            })}
            {exampleQuestionsForm.fields.length < maxExampleQuestions && (
              <div>
                <Button
                  variant='outline'
                  onClick={() =>
                    exampleQuestionsForm.append({
                      text: '',
                    })
                  }
                >
                  <PlusIcon size='1rem' className='mr-1' />
                  Append
                </Button>
              </div>
            )}
          </div>
          <div className='space-y-2'>
            <FormLabel>HomePage - Footer Links</FormLabel>
            {homepageFooterLinksForm.fields.map((field, index) => {
              return (
                <div key={field.id} className='flex gap-4'>
                  <div className='w-full grid grid-cols-2 gap-x-4'>
                    <FormField
                      control={form.control}
                      disabled={form.formState.isSubmitting}
                      name={`homepage.footer_links.${index}.text`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder='Text'
                                className='w-full'
                                {...form.register(
                                  `homepage.footer_links.${index}.text` as const
                                )}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      disabled={form.formState.isSubmitting}
                      name={`homepage.footer_links.${index}.href`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder='Link'
                                {...form.register(
                                  `homepage.footer_links.${index}.href` as const
                                )}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className=''>
                    <Button
                      variant='outline'
                      onClick={() => homepageFooterLinksForm.remove(index)}
                    >
                      <Trash2Icon size='1rem' className='' />
                    </Button>
                  </div>
                </div>
              );
            })}
            {homepageFooterLinksForm.fields.length < maxHomepageFooterLinks && (
              <div>
                <Button
                  variant='outline'
                  onClick={() =>
                    homepageFooterLinksForm.append({
                      text: '',
                      href: '',
                    })
                  }
                >
                  <PlusIcon size='1rem' className='mr-1' />
                  Append
                </Button>
              </div>
            )}
          </div>
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='social.github'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Social - GitHub</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://github.com/pingcap/tidb.ai'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='social.twitter'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Social - X</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://twitter.com/PingCAP'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='social.discord'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Social - Discord</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://discord.gg/XzSW23Jg9p'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
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
