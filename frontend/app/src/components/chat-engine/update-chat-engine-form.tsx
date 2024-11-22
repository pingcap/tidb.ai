'use client';

import { type ChatEngine, type ChatEngineKnowledgeGraphOptions, type ChatEngineLLMOptions, type ChatEngineOptions, updateChatEngine } from '@/api/chat-engines';
import { KBSelect, LLMSelect, RerankerSelect } from '@/components/form/biz';
import { FormInput, FormSwitch, FormTextarea } from '@/components/form/control-widget';
import { FormCollapsedBasicLayout, FormFieldBasicLayout, FormFieldContainedLayout } from '@/components/form/field-layout';
import { Grid2, Grid3 } from '@/components/grid/Grid';
import { fieldAccessor, GeneralSettingsField, type GeneralSettingsFieldAccessor, GeneralSettingsForm, shallowPick } from '@/components/settings-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import type { KeyOfType } from '@/lib/typing-utils';
import { capitalCase } from 'change-case-all';
import { format } from 'date-fns';
import { FlaskConicalIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type ReactNode, useTransition } from 'react';
import { z } from 'zod';

export function UpdateChatEngineForm ({ chatEngine, defaultChatEngineOptions }: { chatEngine: ChatEngine, defaultChatEngineOptions: ChatEngineOptions }) {
  const [transitioning, startTransition] = useTransition();
  const router = useRouter();

  return (
    <GeneralSettingsForm
      data={chatEngine}
      readonly={false}
      loading={transitioning}
      onUpdate={async (data, path) => {
        if (updatableFields.includes(path[0] as any)) {
          const partial = shallowPick(data, path as [(typeof updatableFields)[number], ...any[]]);
          await updateChatEngine(chatEngine.id, partial);
          startTransition(() => {
            router.refresh();
          });
        } else {
          throw new Error(`${path.map(p => String(p)).join('.')} is not updatable currently.`);
        }
      }}
    >
      <div className="space-y-8 max-w-screen-md">
        <Section noSeparator title="Basic">
          <GeneralSettingsField readonly accessor={idAccessor} schema={neverSchema}>
            <FormFieldBasicLayout name="value" label="ID">
              <FormInput />
            </FormFieldBasicLayout>
          </GeneralSettingsField>
          <Grid2>
            <GeneralSettingsField accessor={nameAccessor} schema={nameSchema}>
              <FormFieldBasicLayout name="value" label="Name">
                <FormInput />
              </FormFieldBasicLayout>
            </GeneralSettingsField>
            <GeneralSettingsField accessor={kbAccessor} schema={kbSchema}>
              <FormFieldBasicLayout required name="value" label="Knowledge Base">
                <KBSelect />
              </FormFieldBasicLayout>
            </GeneralSettingsField>
          </Grid2>
          <GeneralSettingsField accessor={isDefaultAccessor} schema={isDefaultSchema}>
            <FormFieldContainedLayout unimportant name="value" label="Is Default" fallbackValue={chatEngine.is_default} description="/// Description TBD">
              <FormSwitch />
            </FormFieldContainedLayout>
          </GeneralSettingsField>
          <GeneralSettingsField accessor={clarifyAccessor} schema={clarifyAccessorSchema}>
            <FormFieldContainedLayout unimportant name="value" label="Clarify Question" fallbackValue={defaultChatEngineOptions.clarify_question} description="/// Description TBD">
              <FormSwitch />
            </FormFieldContainedLayout>
          </GeneralSettingsField>
          <Grid2>
            <GeneralSettingsField readonly accessor={createdAccessor} schema={neverSchema}>
              <FormFieldBasicLayout name="value" label="Created At">
                <FormInput />
              </FormFieldBasicLayout>
            </GeneralSettingsField>
            <GeneralSettingsField readonly accessor={updatedAccessor} schema={neverSchema}>
              <FormFieldBasicLayout name="value" label="Updated At">
                <FormInput />
              </FormFieldBasicLayout>
            </GeneralSettingsField>
          </Grid2>
        </Section>
        <Section title="Models">
          <Grid3>
            <GeneralSettingsField accessor={llmIdAccessor} schema={idSchema}>
              <FormFieldBasicLayout name="value" label="LLM">
                <LLMSelect />
              </FormFieldBasicLayout>
            </GeneralSettingsField>
            <GeneralSettingsField accessor={fastLlmIdAccessor} schema={idSchema}>
              <FormFieldBasicLayout name="value" label="Fast LLM">
                <LLMSelect />
              </FormFieldBasicLayout>
            </GeneralSettingsField>
            <GeneralSettingsField accessor={rerankerIdAccessor} schema={idSchema}>
              <FormFieldBasicLayout name="value" label="Reranker">
                <RerankerSelect />
              </FormFieldBasicLayout>
            </GeneralSettingsField>
          </Grid3>
        </Section>
        <Section title="Knowledge Graph">
          <GeneralSettingsField accessor={kgEnabledAccessor} schema={kgEnabledSchema}>
            <FormFieldContainedLayout name="value" label="Enable Knowledge Graph" fallbackValue={defaultChatEngineOptions.knowledge_graph?.enabled} description="/// Description TBD">
              <FormSwitch />
            </FormFieldContainedLayout>
          </GeneralSettingsField>
          <GeneralSettingsField accessor={kgDepthAccessor} schema={kgDepthSchema}>
            <FormFieldBasicLayout name="value" label="Depth" fallbackValue={defaultChatEngineOptions.knowledge_graph?.depth}>
              <FormInput />
            </FormFieldBasicLayout>
          </GeneralSettingsField>
          <Grid3>
            <GeneralSettingsField accessor={kgIncludeMetaAccessor} schema={kgIncludeMetaSchema}>
              <FormFieldContainedLayout unimportant name="value" label="Include Meta" fallbackValue={defaultChatEngineOptions.knowledge_graph?.include_meta} description="/// Description TBD">
                <FormSwitch />
              </FormFieldContainedLayout>
            </GeneralSettingsField>
            <GeneralSettingsField accessor={kgWithDegreeAccessor} schema={kgWithDegreeSchema}>
              <FormFieldContainedLayout unimportant name="value" label="With Degree" fallbackValue={defaultChatEngineOptions.knowledge_graph?.with_degree} description="/// Description TBD">
                <FormSwitch />
              </FormFieldContainedLayout>
            </GeneralSettingsField>
            <GeneralSettingsField accessor={kgUsingIntentSearchAccessor} schema={kgUsingIntentSearchSchema}>
              <FormFieldContainedLayout unimportant name="value" label="Using intent search" fallbackValue={defaultChatEngineOptions.knowledge_graph?.using_intent_search} description="/// Description TBD">
                <FormSwitch />
              </FormFieldContainedLayout>
            </GeneralSettingsField>
          </Grid3>
        </Section>
        <Section title="UI">
          <GeneralSettingsField accessor={hideSourcesAccessor} schema={hideSourcesSchema}>
            <FormFieldContainedLayout unimportant name="value" label="Hide Sources" fallbackValue={defaultChatEngineOptions.hide_sources} description="/// Description TBD">
              <FormSwitch />
            </FormFieldContainedLayout>
          </GeneralSettingsField>
        </Section>
        <Section title="LLM Prompts">
          {llmPromptFields.map(type => (
            <GeneralSettingsField key={type} accessor={llmAccessor[type]} schema={llmSchema}>
              <FormCollapsedBasicLayout name="value" label={capitalCase(type)} description="/// TBD" fallbackValue={defaultChatEngineOptions.llm?.[type]}>
                <FormTextarea />
              </FormCollapsedBasicLayout>
            </GeneralSettingsField>
          ))}
        </Section>
        <Section title="Advanced">
          <Alert variant="warning">
            <FlaskConicalIcon />
            <AlertTitle>Experimental features</AlertTitle>
            <AlertDescription>Do not edit unless you know what are you doing.</AlertDescription>
          </Alert>

          <Grid2>
            <GeneralSettingsField accessor={postVerificationUrlAccessor} schema={postVerificationUrlSchema}>
              <FormFieldBasicLayout name="value" label="Post Verifycation Service URL" fallbackValue={defaultChatEngineOptions.post_verification_url ?? ''}>
                <FormInput />
              </FormFieldBasicLayout>
            </GeneralSettingsField>
            <GeneralSettingsField accessor={postVerificationTokenAccessor} schema={postVerificationTokenSchema}>
              <FormFieldBasicLayout name="value" label="Post Verifycation Service Token" fallbackValue={defaultChatEngineOptions.post_verification_token ?? ''}>
                <FormInput />
              </FormFieldBasicLayout>
            </GeneralSettingsField>
          </Grid2>
          <GeneralSettingsField accessor={externalEngineAccessor} schema={externalEngineSchema}>
            <FormFieldBasicLayout name="value" label="External Chat Engine API URL (StackVM)" fallbackValue={defaultChatEngineOptions.external_engine_config?.stream_chat_api_url ?? ''}>
              <FormInput />
            </FormFieldBasicLayout>
          </GeneralSettingsField>
        </Section>
      </div>
    </GeneralSettingsForm>
  );
}

const updatableFields = ['name', 'llm_id', 'fast_llm_id', 'reranker_id', 'engine_options', 'is_default'] as const;

function optionAccessor<K extends keyof ChatEngineOptions> (key: K): GeneralSettingsFieldAccessor<ChatEngine, ChatEngineOptions[K]> {
  return {
    path: ['engine_options', key],
    get (engine) {
      return engine.engine_options[key];
    },
    set (engine, value) {
      return {
        ...engine,
        engine_options: {
          ...engine.engine_options,
          [key]: value,
        },
      };
    },
  };
}

function kgOptionAccessor<K extends keyof ChatEngineKnowledgeGraphOptions> (key: K): GeneralSettingsFieldAccessor<ChatEngine, ChatEngineKnowledgeGraphOptions[K]> {
  return {
    path: ['engine_options', 'knowledge_graph', key],
    get (engine) {
      return engine.engine_options.knowledge_graph?.[key];
    },
    set (engine, value) {
      return {
        ...engine,
        engine_options: {
          ...engine.engine_options,
          knowledge_graph: {
            ...engine.engine_options.knowledge_graph,
            [key]: value,
          },
        },
      };
    },
  };
}

function llmOptionAccessor<K extends keyof ChatEngineLLMOptions> (key: K): GeneralSettingsFieldAccessor<ChatEngine, ChatEngineLLMOptions[K]> {
  return {
    path: ['engine_options', 'llm', key],
    get (engine) {
      return engine.engine_options.llm?.[key];
    },
    set (engine, value) {
      return {
        ...engine,
        engine_options: {
          ...engine.engine_options,
          llm: {
            ...engine.engine_options.llm,
            [key]: value,
          },
        },
      };
    },
  };
}

const getDatetimeAccessor = (key: KeyOfType<ChatEngine, Date>): GeneralSettingsFieldAccessor<ChatEngine, string> => {
  return {
    path: [key],
    get (data) {
      return format(data[key], 'yyyy-MM-dd HH:mm:ss');
    },
    set () {
      throw new Error(`update ${key} is not supported`);
    },
  };
};

const idAccessor = fieldAccessor<ChatEngine, 'id'>('id');

const createdAccessor = getDatetimeAccessor('created_at');
const updatedAccessor = getDatetimeAccessor('updated_at');
const neverSchema = z.never();

const nameAccessor = fieldAccessor<ChatEngine, 'name'>('name');
const nameSchema = z.string().min(1);

const clarifyAccessor = optionAccessor('clarify_question');
const clarifyAccessorSchema = z.boolean().nullable().optional();

const isDefaultAccessor = fieldAccessor<ChatEngine, 'is_default'>('is_default');
const isDefaultSchema = z.boolean();

const getIdAccessor = (id: KeyOfType<ChatEngine, number | null>) => fieldAccessor<ChatEngine, KeyOfType<ChatEngine, number | null>>(id);
const idSchema = z.number().nullable();
const llmIdAccessor = getIdAccessor('llm_id');
const fastLlmIdAccessor = getIdAccessor('fast_llm_id');
const rerankerIdAccessor = getIdAccessor('reranker_id');

const kbAccessor: GeneralSettingsFieldAccessor<ChatEngine, number | null> = {
  path: ['engine_options'],
  get (data) {
    return data.engine_options.knowledge_base?.linked_knowledge_base?.id ?? null;
  },
  set (data, id) {
    return {
      ...data,
      engine_options: {
        ...data.engine_options,
        knowledge_base: {
          linked_knowledge_base: { id },
        },
      },
    };
  },
};
const kbSchema = z.number();

const kgEnabledAccessor = kgOptionAccessor('enabled');
const kgEnabledSchema = z.boolean().nullable();

const kgWithDegreeAccessor = kgOptionAccessor('with_degree');
const kgWithDegreeSchema = z.boolean().nullable();

const kgIncludeMetaAccessor = kgOptionAccessor('include_meta');
const kgIncludeMetaSchema = z.boolean().nullable();

const kgUsingIntentSearchAccessor = kgOptionAccessor('using_intent_search');
const kgUsingIntentSearchSchema = z.boolean().nullable();

const kgDepthAccessor = kgOptionAccessor('depth');
const kgDepthSchema = z.number().nullable();

const hideSourcesAccessor = optionAccessor('hide_sources');
const hideSourcesSchema = z.boolean().nullable();

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

const llmAccessor: { [P in (typeof llmPromptFields[number])]: GeneralSettingsFieldAccessor<ChatEngine, string | null> } = Object.fromEntries(llmPromptFields.map(name => [name, llmOptionAccessor(name)])) as never;
const llmSchema = z.string().nullable();

const postVerificationUrlAccessor = optionAccessor('post_verification_url');
const postVerificationUrlSchema = z.string().nullable();

const postVerificationTokenAccessor = optionAccessor('post_verification_token');
const postVerificationTokenSchema = z.string().nullable();

const externalEngineAccessor: GeneralSettingsFieldAccessor<ChatEngine, string | null> = {
  path: ['engine_options'],
  get (engine) {
    return engine.engine_options.external_engine_config?.stream_chat_api_url ?? null;
  },
  set (engine, value) {
    return {
      ...engine,
      engine_options: {
        ...engine.engine_options,
        external_engine_config: {
          stream_chat_api_url: value,
        },
      },
    };
  },
};
const externalEngineSchema = z.string().nullable();

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
};

