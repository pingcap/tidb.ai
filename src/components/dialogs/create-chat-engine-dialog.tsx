import { ImportDialog } from '@/components/dialogs/import-dialog';
import { PromptTemplateEditor } from '@/components/ui/auto-form/zod-extensions/prompt-template';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createChatEngine } from '@/operations/chat_engines';

export function CreateChatEngineDialog ({
  defaultIndexId,
  defaultTextQaPrompt,
  defaultRefinePrompt,
  defaultCondenseQuestionPrompt,
}: {
  defaultIndexId: number,
  defaultTextQaPrompt: string,
  defaultRefinePrompt: string,
  defaultCondenseQuestionPrompt: string,
}) {
  return (
    <ImportDialog
      trigger={<Button className="gap-1" size="sm" variant="secondary">New</Button>}
      title="Create chat engine"
      onSubmit={createChatEngine}
      defaultValues={{
        name: '',
        engine: 'condense-question',
        engine_options: {
          reranker: { provider: 'cohere', config: {} },
          llm: { provider: 'openai', config: {} },
          prompts: {
            textQa: defaultTextQaPrompt,
            refine: defaultRefinePrompt,
            condenseQuestion: defaultCondenseQuestionPrompt,
          },
          index_id: defaultIndexId,
          retriever: {
            search_top_k: 100,
            top_k: 5,
          },
        },
      }}
    >
      <ChatEngineFields />
    </ImportDialog>
  );
}

export function ChatEngineFields () {
  return (
    <>
      <FormField
        name="name"
        render={({ field: { ...field } }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="engine"
        render={({ field: { ...field } }) => (
          <FormItem>
            <FormLabel>Engine</FormLabel>
            <FormControl>
              <Input readOnly {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="engine_options.index_id"
        render={({ field: { ...field } }) => (
          <FormItem>
            <FormLabel>Index ID</FormLabel>
            <FormControl>
              <Input readOnly {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="engine_options.retriever.search_top_k"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Search Top K</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="engine_options.retriever.top_k"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Top K</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.reranker.provider"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reranker Provider</FormLabel>
            <FormControl>
              <Input readOnly {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.llm.provider"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LLM Provider</FormLabel>
            <FormControl>
              <Input readOnly {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.prompts.textQa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Text QA Prompt</FormLabel>
            <FormControl>
              <PromptTemplateEditor {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.prompts.refine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Refine Prompt</FormLabel>
            <FormControl>
              <PromptTemplateEditor {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.prompts.condenseQuestion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Condense Question Prompt</FormLabel>
            <FormControl>
              <PromptTemplateEditor {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}