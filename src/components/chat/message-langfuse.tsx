import { useMyChatContext } from '@/components/chat/context';
import type { ConversationMessageGroupProps } from '@/components/chat/use-grouped-conversation-messages';
import { useMessageLangFuse } from '@/components/chat/use-message-langfuse';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { getTraceId } from '@/core/services/feedback/utils';
import { useUser } from '@/lib/auth';
import { toastError } from '@/lib/ui-error';
import { CheckIcon, Loader2Icon, PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

export function MessageLangfuse ({ group }: { group: ConversationMessageGroupProps }) {
  const { id } = useMyChatContext();
  const user = useUser();
  const traceId = useMemo(() => {
    if (!group.assistantAnnotation.traceURL) {
      return undefined;
    }
    return getTraceId(group.assistantAnnotation.traceURL);
  }, [group.assistantAnnotation.traceURL]);

  const { datasets, isLoading, allDatasets, addToDataset } = useMessageLangFuse(id, group.assistantAnnotation.messageId, traceId, !!traceId && group.finished);
  const [adding, setAdding] = useState<string>();

  if (!group.finished || user?.role !== 'admin') {
    return <></>;
  }

  if (isLoading) {
    return (
      <div className="my-2 space-y-2">
        <div className="text-sm font-bold">Langfuse datasets</div>
        <Loader2Icon className="w-4 h-4 animate-spin repeat-infinite" />
      </div>
    );
  }

  return (
    <div className="my-2 space-y-2">
      <div className="text-sm font-bold">Langfuse datasets</div>
      <div className="table table-auto text-xs">
        <ul className="m-2 table-row-group ">
          {allDatasets?.map((dataset) => (
            <li key={dataset.id} className="table-row">
              <div className="table-cell px-2">
                {dataset.name}
              </div>
              <div className="table-cell px-2">
                {adding === dataset.name
                  ? <Loader2Icon className="size-3 animate-spin repeat-infinite" />
                  : !datasets?.includes(dataset.name)
                    ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="text-muted-foreground hover:text-primary flex items-center gap-2">
                            <PlusIcon className="w-3 h-3" /> Add to dataset
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Add chat to langfuse dataset <code>{dataset.name}</code>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Please check the dataset you are adding to. Added chat cannot be deleted (allowed to archive).
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction
                              onClick={() => {
                                setAdding(dataset.name);
                                addToDataset(dataset.name)
                                  .catch((error) => {
                                    toastError('Failed to add chat to dataset', error);
                                  })
                                  .finally(() => {
                                    setAdding(undefined);
                                  });
                              }}
                            >
                              Confirm
                            </AlertDialogAction>
                            <AlertDialogCancel>
                              Cancel
                            </AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )
                    : <span className="flex items-center gap-2"><CheckIcon className="w-3 h-3 text-green-500" /> included</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
