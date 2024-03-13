'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/hooks';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useSWRConfig } from 'swr';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import {
  ICustomJsSettingResult,
  CustomJsSettingUpdatePayload,
  maxExampleQuestions,
} from '@/core/schema/setting';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import copy from 'copy-to-clipboard';
import { ThemeSelector } from '@/components/theme-selector';
import { updateSettingCustomJS as updateSetting } from '@/operations/settings';

SyntaxHighlighter.registerLanguage('javascript', js);

export default function ClientPage(props: any) {
  const [data, setData] = React.useState<ICustomJsSettingResult>({});

  const settings = useSettings<ICustomJsSettingResult>({}, 'custom_js');
  const form = useForm<z.infer<typeof CustomJsSettingUpdatePayload>>({
    resolver: zodResolver(CustomJsSettingUpdatePayload),
  });

  React.useEffect(() => {
    form.reset(settings);
    setData(settings);
  }, [settings]);

  const { mutate } = useSWRConfig();

  async function onSubmit(data: z.infer<typeof CustomJsSettingUpdatePayload>) {
    await updateSetting(data, mutate);
  }

  const exampleQuestionsForm = useFieldArray({
    control: form.control,
    name: 'example_questions',
    rules: { maxLength: maxExampleQuestions },
  });

  return (
    <>
      <p>
        This is a JavaScript snippet that can be added to your website to add a
        search box that allows users to ask questions and get answers from the
        AI.
      </p>
      <h3 className='text-lg font-semibold mt-8 mb-4'>Snippet</h3>

      <CustomJsCodeBlock data={data} />

      <h3 className='text-lg font-semibold mt-8 mb-4'>Configure</h3>
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
            name='button_label'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Label</FormLabel>
                <FormControl>
                  <Input placeholder='Ask AI' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='button_img_src'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Image Source (optional)</FormLabel>
                <FormControl>
                  <Input placeholder='Optional' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='widget_title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Widget Title</FormLabel>
                <FormControl>
                  <Input placeholder='Optional' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='widget_input_placeholder'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Widget Input PlaceHolder</FormLabel>
                <FormControl>
                  <Input placeholder='Optional' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='widget_color_mode'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Theme</FormLabel>
                <ThemeSelector
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

          <div className='space-y-2'>
            <FormLabel>Example Qeustions</FormLabel>
            {exampleQuestionsForm.fields.map((field, index) => {
              return (
                <div key={field.id} className='flex gap-4'>
                  <div className='w-full'>
                    <FormField
                      control={form.control}
                      disabled={form.formState.isSubmitting}
                      name={`example_questions.${index}`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder='Example question'
                                {...form.register(
                                  `example_questions.${index}.text` as const
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
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='logo_src'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Modal Header Logo (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder='Optional' {...field} />
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

function CustomJsCodeBlock(props: { data: ICustomJsSettingResult }) {
  const { data } = props;

  const strMemo = React.useMemo(() => {
    const strHead = `<script\n  async\n  src='https://tidb.ai/rag-widget.js'\n  data-id='tidb-ai-widget'\n  data-name='tidb-ai-widget'`;
    const strTail = '\n/>';
    const template = {
      ['data-btn-label']: data.button_label,
      ['data-btn-img-src']: data.button_img_src,
      // ['data-example-questions']: JSON.stringify(data.example_questions),
      ['data-logo-src']: data.logo_src,
      ['data-preferred-mode']: data.widget_color_mode,
      ['data-widget-title']: data.widget_title,
      ['data-widget-input-placeholder']: data.widget_input_placeholder,
    };
    let str = strHead;
    for (const key in template) {
      if (template[key as keyof typeof template]) {
        str += `\n  ${key}='${template[key as keyof typeof template]}'`;
      }
    }
    if (data?.example_questions?.length) {
      str += `\n  data-example-questions='${JSON.stringify(
        data.example_questions.map((q) => q.text)
      )}'`;
    }
    str += strTail;
    return str;
  }, [data]);

  return <JSCodeBlock code={strMemo} />;
}

function JSCodeBlock(props: { code: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    copy(props.code);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <div className='bg-slate-900 rounded-lg dark:bg-slate-900 relative w-full'>
      <Button
        variant='outline'
        className='absolute right-4 top-4'
        onClick={handleCopy}
      >
        {copied ? 'Copied' : 'Copy'}
      </Button>
      <SyntaxHighlighter
        language='javascript'
        style={a11yDark}
        customStyle={{
          backgroundColor: 'transparent',
          padding: '1rem',
        }}
      >
        {props.code}
      </SyntaxHighlighter>
    </div>
  );
}
