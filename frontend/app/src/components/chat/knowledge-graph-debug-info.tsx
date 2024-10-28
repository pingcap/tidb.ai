import { getChatMessageSubgraph } from '@/api/chats';
import { useAuth } from '@/components/auth/AuthProvider';
import { type ChatMessageGroup, useChatMessageStreamState } from '@/components/chat/chat-hooks';
import type { OngoingState } from '@/components/chat/chat-message-controller';
import { AppChatStreamState, type StackVMState } from '@/components/chat/chat-stream-state';
import { NetworkViewer } from '@/components/graph/components/NetworkViewer';
import { useNetwork } from '@/components/graph/useNetwork';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import useSWR from 'swr';

export function KnowledgeGraphDebugInfo ({ group }: { group: ChatMessageGroup }) {
  const auth = useAuth();
  const ongoing = useChatMessageStreamState(group.assistant);
  const canEdit = !!auth.me?.is_superuser;

  const shouldFetch = (!ongoing || ongoing.finished || couldFetchKnowledgeGraphDebugInfo(ongoing));
  const { data: span, isLoading, mutate } = useSWR(
    shouldFetch && `api.chats.get-message-subgraph?id=${group.user.id}`,
    () => getChatMessageSubgraph(group.user.id),
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );

  useEffect(() => {
    if (shouldFetch && !isLoading && !span) {
      mutate(undefined, true);
    }
  }, [span, isLoading, shouldFetch]);

  const network = useNetwork(span);

  return (
    <NetworkViewer
      className="my-2 border rounded w-full aspect-video"
      loading={!shouldFetch || isLoading}
      loadingTitle={shouldFetch ? 'Loading knowledge graph...' : 'Waiting knowledge graph request...'}
      network={network}
      Details={() => canEdit
        ? (
          <Link href={`/knowledge-graph?query=${encodeURIComponent(`message-subgraph:${group.user.id}`)}`} className="absolute top-2 right-2 text-xs underline">
            <PencilIcon className="w-3 h-3 mr-1 inline-block" />
            Edit graph
          </Link>
        ) : null}
    />
  );
}

function couldFetchKnowledgeGraphDebugInfo (state: OngoingState<AppChatStreamState | StackVMState>) {
  switch (state.state) {
    case AppChatStreamState.GENERATE_ANSWER:
    case AppChatStreamState.FINISHED:
    case AppChatStreamState.RERANKING:
    case AppChatStreamState.SOURCE_NODES:
      return true;
    default:
      return false;
  }
}
