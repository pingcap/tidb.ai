import { type EmbeddingModel, listEmbeddingModels } from '@/api/embedding-models';
import { type KnowledgeBaseSummary, listKnowledgeBases } from '@/api/knowledge-base';
import { listLlms, type LLM } from '@/api/llms';
import type { ProviderOption } from '@/api/providers';
import { listRerankers, type Reranker } from '@/api/rerankers';
import { CreateEmbeddingModelForm } from '@/components/embedding-models/CreateEmbeddingModelForm';
import { FormCombobox, type FormComboboxConfig, type FormComboboxProps, FormSelect, type FormSelectConfig, type FormSelectProps } from '@/components/form/control-widget';
import { KBInfo } from '@/components/knowledge-base/KBInfo';
import { CreateLLMForm } from '@/components/llm/CreateLLMForm';
import { ManagedDialog } from '@/components/managed-dialog';
import { ManagedPanelContext } from '@/components/managed-panel';
import { CreateRerankerForm } from '@/components/reranker/CreateRerankerForm';
import { RerankerInfo } from '@/components/reranker/RerankerInfo';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { forwardRef } from 'react';
import useSWR from 'swr';

export const EmbeddingModelSelect = forwardRef<any, Omit<FormComboboxProps, 'config'> & { reverse?: boolean }>(({ reverse = true, ...props }, ref) => {
  // TODO
  const { data: embeddingModels, isLoading, mutate, error } = useSWR('api.embedding-models.list-all', () => listEmbeddingModels({ size: 100 }));

  return (
    <FormCombobox
      {...props}
      placeholder="Default Embedding Model"
      config={{
        options: embeddingModels?.items ?? [],
        optionKeywords: option => [option.name, option.provider, option.model],
        loading: isLoading,
        error,
        renderValue: option => (<span>{option.name} <span className='text-muted-foreground'>[{option.vector_dimension}]</span></span>),
        renderOption: option => (
          <div>
            <div><strong>{option.name}</strong></div>
            <div className="text-xs text-muted-foreground">
              <strong>{option.provider}</strong>:{option.model} [{option.vector_dimension}]
            </div>
          </div>
        ),
        renderCreateOption: (Wrapper, onCreated) => (
          <ManagedDialog>
            <ManagedPanelContext.Consumer>
              {({ setOpen }) => (
                <>
                  <Wrapper onSelect={() => setOpen(true)}>
                    <span className="flex gap-1 items-center text-muted-foreground">
                      <PlusIcon className="size-4" />
                      Create New Embedding Model
                    </span>
                  </Wrapper>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Create New Embedding Model
                      </DialogTitle>
                      <DialogDescription />
                    </DialogHeader>
                    <CreateEmbeddingModelForm
                      onCreated={embeddingModel => {
                        mutate();
                        onCreated(embeddingModel);
                        setOpen(false);
                      }}
                    />
                  </DialogContent>
                </>
              )}
            </ManagedPanelContext.Consumer>
          </ManagedDialog>
        ),
        key: 'id',
      } satisfies FormComboboxConfig<EmbeddingModel>}
    />
  );
});

EmbeddingModelSelect.displayName = 'EmbeddingModelSelect';

export const LLMSelect = forwardRef<any, Omit<FormComboboxProps, 'config'> & { reverse?: boolean }>(({ reverse = true, ...props }, ref) => {
  const { data: llms, isLoading, mutate, error } = useSWR('api.llms.list-all', () => listLlms({ size: 100 }));

  return (
    <FormCombobox
      {...props}
      placeholder="Default LLM"
      config={{
        options: llms?.items ?? [],
        loading: isLoading,
        error,
        renderValue: option => (<span>{option.name}</span>),
        renderOption: option => (
          <div>
            <div><strong>{option.name}</strong></div>
            <div className="text-xs text-muted-foreground">
              <strong>{option.provider}</strong>:{option.model}
            </div>
          </div>
        ),
        renderCreateOption: (Wrapper, onCreated) => (
          <ManagedDialog>
            <ManagedPanelContext.Consumer>
              {({ setOpen }) => (
                <>
                  <Wrapper onSelect={() => setOpen(true)}>
                    <span className="flex gap-1 items-center text-muted-foreground">
                      <PlusIcon className="size-4" />
                      Create New LLM
                    </span>
                  </Wrapper>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Create New LLM
                      </DialogTitle>
                      <DialogDescription />
                    </DialogHeader>
                    <CreateLLMForm
                      onCreated={llm => {
                        mutate();
                        onCreated(llm);
                        setOpen(false);
                      }}
                    />
                  </DialogContent>
                </>
              )}
            </ManagedPanelContext.Consumer>
          </ManagedDialog>
        ),
        optionKeywords: option => [option.name, option.provider, option.model],
        key: 'id',
      } satisfies FormComboboxConfig<LLM>}
    />
  );
});

LLMSelect.displayName = 'LLMSelect';

export const RerankerSelect = forwardRef<any, Omit<FormComboboxProps, 'config'> & { reverse?: boolean }>(({ reverse = true, ...props }, ref) => {
  const { data: rerankers, mutate, isLoading, error } = useSWR('api.rerankers.list-all', () => listRerankers({ size: 100 }));

  return (
    <FormCombobox
      {...props}
      placeholder="Default Reranker Model"
      config={{
        options: rerankers?.items ?? [],
        optionKeywords: option => [option.name, option.provider, option.model],
        loading: isLoading,
        error,
        renderValue: option => (<span>{option.name}</span>),
        renderOption: option => (
          <div>
            <div><strong>{option.name}</strong></div>
            <div className="text-xs text-muted-foreground">
              <strong>{option.provider}</strong>:{option.model}
            </div>
          </div>
        ),
        renderCreateOption: (Wrapper, onCreated) => (
          <ManagedDialog>
            <ManagedPanelContext.Consumer>
              {({ setOpen }) => (
                <>
                  <Wrapper onSelect={() => setOpen(true)}>
                    <span className="flex gap-1 items-center text-muted-foreground">
                      <PlusIcon className="size-4" />
                      Create New Reranker
                    </span>
                  </Wrapper>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Create New Reranker
                      </DialogTitle>
                      <DialogDescription />
                    </DialogHeader>
                    <CreateRerankerForm
                      onCreated={reranker => {
                        mutate();
                        onCreated(reranker);
                        setOpen(false);
                      }}
                    />
                  </DialogContent>
                </>
              )}
            </ManagedPanelContext.Consumer>
          </ManagedDialog>
        ),
        key: 'id',
      } satisfies FormComboboxConfig<Reranker>}
    />
  );
});

RerankerSelect.displayName = 'RerankerSelect';

export interface ProviderSelectProps<Provider extends ProviderOption = ProviderOption> extends Omit<FormSelectProps, 'config'> {
  options: ProviderOption[] | undefined;
  isLoading: boolean;
  error: unknown;
}

export const ProviderSelect = forwardRef<any, ProviderSelectProps>(({
  options, isLoading, error, ...props
}, ref) => {
  return (
    <FormSelect
      ref={ref}
      config={{
        options: options ?? [],
        loading: isLoading,
        error,
        renderOption: option => (
          <>
            <div className="text-sm font-bold max-w-screen-sm">{option.provider_display_name ?? option.provider}</div>
            {option.provider_description && <div className="text-xs text-muted-foreground break-words" style={{ maxWidth: 'calc(var(--radix-select-trigger-width) - 68px)' }}>{option.provider_description}</div>}
          </>
        ),
        itemClassName: 'space-y-1',
        renderValue: option => option.provider_display_name ?? option.provider,
        key: 'provider',
      } satisfies FormSelectConfig<ProviderOption>}
      {...props}
    />
  );
});

ProviderSelect.displayName = 'ProviderSelect';

export const KBSelect = forwardRef<any, Omit<FormSelectProps, 'config'> & { reverse?: boolean }>(({ reverse = true, ...props }, ref) => {
  const { data: kbs, isLoading, error } = useSWR('api.knowledge-bases.list-all', () => listKnowledgeBases({ size: 100 }));

  return (
    <FormSelect
      ref={ref}
      {...props}
      placeholder="Select Knowledge Base"
      config={{
        options: kbs?.items ?? [],
        loading: isLoading,
        error,
        renderValue: option => (<span><KBInfo id={option.id} /></span>),
        renderOption: option => (<span><KBInfo detailed id={option.id} /></span>),
        key: 'id',
      } satisfies FormSelectConfig<KnowledgeBaseSummary>}
    />
  );
});

KBSelect.displayName = 'KBSelect';
