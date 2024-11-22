'use client';

import { type ChatEngineOptions, createChatEngine } from '@/api/chat-engines';
import { KBSelect, LLMSelect, RerankerSelect } from '@/components/form/biz';
import { FormInput, FormSwitch, FormTextarea } from '@/components/form/control-widget';
import { FormCollapsedBasicLayout, FormFieldBasicLayout, FormFieldContainedLayout } from '@/components/form/field-layout';
import { FormRootError } from '@/components/form/root-error';
import { handleSubmitHelper } from '@/components/form/utils';
import { Grid2, Grid3 } from '@/components/grid/Grid';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalCase } from 'change-case-all';
import { FlaskConicalIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type ReactNode, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  llm_id: z.number().optional(),
  fast_llm_id: z.number().optional(),
  reranker_id: z.number().optional(),
  engine_options: z.object({
    knowledge_base: z.object({
      linked_knowledge_base: z.object({
        id: z.number(),
      }),
    }),
    knowledge_graph: z.object({}).passthrough(),
    llm: z.object({}).passthrough(),
  }).passthrough(),
});

export function CreateChatEngineForm ({ defaultChatEngineOptions }: { defaultChatEngineOptions: ChatEngineOptions }) {
  const [transitioning, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    disabled: transitioning,
    defaultValues: {
      name: '',
      engine_options: {},
    },
  });

  const handleSubmit = handleSubmitHelper(form, async data => {
    // TODO: refactor types
    const ce = await createChatEngine(data as never);
    startTransition(() => {
      router.push(`/chat-engines/${ce.id}`);
    });
  }, errors => {
    toast.error('Validation failed', {
      description: 'Please check your chat engine configurations.',
      classNames: {
        toast: 'group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground',
        description: 'group-[.toast]:text-destructive-foreground/70',
      },
    });
  });

  return (
    <Form {...form}>
      <form className="space-y-8 max-w-screen-md" onSubmit={handleSubmit}>
        <Section title="Basic" noSeparator>
          <Grid2>
            <FormFieldBasicLayout required name="name" label="Name">
              <FormInput />
            </FormFieldBasicLayout>
            <FormFieldBasicLayout required name="engine_options.knowledge_base.linked_knowledge_base.id" label="Knowledge Base">
              <KBSelect />
            </FormFieldBasicLayout>
          </Grid2>
          <FormFieldContainedLayout unimportant name="engine_options.clarify_question" label="Clarify Question" description="/// Description TBD">
            <FormSwitch />
          </FormFieldContainedLayout>
        </Section>
        <Section title="Models">
          <Grid3>
            <FormFieldBasicLayout name="llm_id" label="LLM">
              <LLMSelect />
            </FormFieldBasicLayout>
            <FormFieldBasicLayout name="fast_llm_id" label="Fast LLM">
              <LLMSelect />
            </FormFieldBasicLayout>
            <FormFieldBasicLayout name="reranker_id" label="Reranker">
              <RerankerSelect />
            </FormFieldBasicLayout>
          </Grid3>
        </Section>
        <Section title="Knowledge Graph">
          <FormFieldContainedLayout name="engine_options.knowledge_graph.enabled" label="Enable Knowledge Graph" fallbackValue={defaultChatEngineOptions.knowledge_graph?.enabled} description="/// Description TBD">
            <FormSwitch />
          </FormFieldContainedLayout>
          <FormFieldBasicLayout name="engine_options.knowledge_graph.depth" label="Depth" fallbackValue={defaultChatEngineOptions.knowledge_graph?.depth}>
            <FormInput />
          </FormFieldBasicLayout>
          <Grid3>
            <FormFieldContainedLayout unimportant name="engine_options.knowledge_graph.include_meta" label="Include Meta" fallbackValue={defaultChatEngineOptions.knowledge_graph?.include_meta} description="/// Description TBD">
              <FormSwitch />
            </FormFieldContainedLayout>
            <FormFieldContainedLayout unimportant name="engine_options.knowledge_graph.with_degree" label="With Degree" fallbackValue={defaultChatEngineOptions.knowledge_graph?.with_degree} description="/// Description TBD">
              <FormSwitch />
            </FormFieldContainedLayout>
            <FormFieldContainedLayout unimportant name="engine_options.knowledge_graph.using_intent_search" label="Using intent search" fallbackValue={defaultChatEngineOptions.knowledge_graph?.using_intent_search} description="/// Description TBD">
              <FormSwitch />
            </FormFieldContainedLayout>
          </Grid3>
        </Section>
        <Section title="UI">
          <FormFieldContainedLayout unimportant name="engine_options.hide_sources" label="Hide Sources" description="/// Description TBD">
            <FormSwitch />
          </FormFieldContainedLayout>
        </Section>
        <Section title="Prompts">
          {llmPromptFields.map(field => (
            <FormCollapsedBasicLayout key={field} name={`engine_options.llm.${field}`} label={capitalCase(field)} fallbackValue={defaultChatEngineOptions.llm?.[field]} description={llmPromptDescriptions[field]}>
              <FormTextarea />
            </FormCollapsedBasicLayout>
          ))}
        </Section>
        <Section title="Experimental Features">
          <Alert variant="warning">
            <FlaskConicalIcon />
            <AlertTitle>Experimental features</AlertTitle>
            <AlertDescription>Do not edit unless you know what are you doing.</AlertDescription>
          </Alert>
          <Grid2>
            <FormFieldBasicLayout name="engine_options.post_verification_url" label="Post Verifycation Service URL" fallbackValue={defaultChatEngineOptions.post_verification_url ?? ''}>
              <FormInput />
            </FormFieldBasicLayout>
            <FormFieldBasicLayout name="engine_options.post_verification_token" label="Post Verifycation Service Token" fallbackValue={defaultChatEngineOptions.post_verification_token ?? ''}>
              <FormInput />
            </FormFieldBasicLayout>
          </Grid2>
          <FormFieldBasicLayout name="engine_options.external_engine_config.stream_chat_api_url" label="External Chat Engine API URL (StackVM)" fallbackValue={defaultChatEngineOptions.external_engine_config?.stream_chat_api_url ?? ''}>
            <FormInput />
          </FormFieldBasicLayout>
        </Section>
        <FormRootError />
        <Button type="submit" disabled={form.formState.isSubmitting || form.formState.disabled}>Create</Button>
      </form>
    </Form>
  );
}

function Section ({ noSeparator, title, children }: { noSeparator?: boolean, title: ReactNode, children: ReactNode }) {
  return (
    <>
      {!noSeparator && <Separator />}
      <section className="space-y-6">
        <h3 className="text-lg text-muted-foreground">{title}</h3>
        {children}
      </section>
    </>
  );
}

const llmPromptFields = [
  'condense_question_prompt',
  'condense_answer_prompt',
  'text_qa_prompt',
  'refine_prompt',
  'intent_graph_knowledge',
  'normal_graph_knowledge',
  'clarifying_question_prompt',
  'generate_goal_prompt',
  'further_questions_prompt',
] as const;

const llmPromptDescriptions: { [P in typeof llmPromptFields[number]]: string } = {
  'condense_question_prompt': '/// Description TBD',
  'condense_answer_prompt': '/// Description TBD',
  'text_qa_prompt': '/// Description TBD',
  'refine_prompt': '/// Description TBD',
  'intent_graph_knowledge': '/// Description TBD',
  'normal_graph_knowledge': '/// Description TBD',
  'clarifying_question_prompt': '/// Description TBD',
  'generate_goal_prompt': '/// Description TBD',
  'further_questions_prompt': '/// Description TBD',
};
