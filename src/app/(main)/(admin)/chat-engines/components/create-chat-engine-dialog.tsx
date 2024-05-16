import {createChatEngine} from "@/client/operations/chat_engines";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import { PromptTemplateEditor } from '@/components/ui/auto-form/zod-extensions/prompt-template';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {Switch} from "@/components/ui/switch";
import {ChatEngineProvider, CreateChatEngineOptions, CreateChatEngineOptionsSchema} from "@/core/schema/chat_engines";
import {getErrorMessage} from "@/lib/errors";
import {LLMProvider, OpenAIModel} from "@/lib/llamaindex/config/llm";
import {RerankerProvider} from "@/lib/llamaindex/config/reranker";
import {zodResolver} from "@hookform/resolvers/zod";
import {AlertTriangleIcon} from "lucide-react";
import {ReactNode, useState} from "react";
import {useForm} from "react-hook-form";

export interface CreateChatEngineDialogProps {
  trigger: ReactNode;
  defaultIndexId: number;
  defaultTextQaPrompt: string;
  defaultRefinePrompt: string;
  defaultCondenseQuestionPrompt: string;
}

export function CreateChatEngineDialog ({
  trigger,
  defaultIndexId,
  defaultTextQaPrompt,
  defaultRefinePrompt,
  defaultCondenseQuestionPrompt,
}: CreateChatEngineDialogProps) {
  // Form.
  const form = useForm<CreateChatEngineOptions>({
    defaultValues: {
      name: '',
      engine: ChatEngineProvider.CONDENSE_QUESTION,
      engine_options: {
        reranker: { provider: RerankerProvider.LLM, options: { model: '-' } },
        llm: { provider: LLMProvider.OPENAI, options: { model: OpenAIModel.GPT_3_5_TURBO } },
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
    },
    resolver: zodResolver(CreateChatEngineOptionsSchema),
  });

  // UI state.
  const [open, setOpen] = useState(false);
  const fromId = "create-chat-engine-from";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  // Handlers.
  const handleSubmit = form.handleSubmit(async (value) => {
    try {
      setLoading(true);
      await createChatEngine(value);
      setOpen(false);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] min-w-[30vw] overflow-x-hidden overflow-y-auto">
        <DialogHeader>New Chat Engine</DialogHeader>
        <DialogDescription>Create a new chat engine as you need.</DialogDescription>
        <Form {...form}>
          <form id={fromId} className="space-y-4" onSubmit={handleSubmit}>
            <ChatEngineFields mode="create" />
          </form>
        </Form>
        {!!error && (
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4"/>
            <AlertTitle>
              Failed to operate
            </AlertTitle>
            <AlertDescription>
              {getErrorMessage(error)}
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <Button form={fromId} type="submit" disabled={loading}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface ChatEngineFieldsProps {
  mode: 'create' | 'update';
}

export function ChatEngineFields (props: ChatEngineFieldsProps) {
  const { mode } = props;
  return (
    <>
      <FormField
        name="name"
        render={({ field: { ...field } }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} disabled={mode === 'update'} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="engine"
        render={({ field: { ...field } }) => (
          <FormItem>
            <FormLabel>Engine</FormLabel>
            <FormControl>
              <Input {...field} disabled={mode === 'update'} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.index_id"
        render={({ field: { ...field } }) => (
          <FormItem>
            <FormLabel>Index ID</FormLabel>
            <FormControl>
              <Input type="number" {...field} disabled={mode === 'update'} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.retriever.search_top_k"
        render={({field}) => (
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
        render={({field}) => (
          <FormItem>
            <FormLabel>Top K</FormLabel>
            <FormControl>
              <Input type="number" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.reranker.provider"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reranker Provider</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.reranker.options.model"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reranker Model</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.llm.provider"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LLM Provider</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.llm.options.model"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LLM Model</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage/>
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
            <FormMessage/>
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
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.prompts.refine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Refine Answer Prompt</FormLabel>
            <FormControl>
              <PromptTemplateEditor {...field} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        name="engine_options.graph_retriever.enable"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Enable Knowledge Graph Retriever</FormLabel>
              <FormDescription>
                Using knowledge graph RAG service to retrieve related entities, relationships and related chunks.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
    </>
  );
}