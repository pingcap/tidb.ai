import { useMyChatContext } from '@/components/chat/context';
import type { ConversationMessageGroupProps } from '@/components/chat/use-grouped-conversation-messages';
import { type ServerGraphData } from '@/components/graph/api';
import { NetworkViewer } from '@/components/graph/components/NetworkViewer';
import { useNetwork } from '@/components/graph/useNetwork';
import { getTraceId } from '@/core/services/feedback/utils';
import { fetcher } from '@/lib/fetch';
import { PencilIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import useSWR from 'swr';

export function KnowledgeGraphDebugInfo ({ group }: { group: ConversationMessageGroupProps }) {
  const session = useSession();
  const index_id = 3; // FIXME Magic value;
  const canEdit = session.data?.user?.role === 'admin';

  const { id } = useMyChatContext();
  const shouldFetch = couldFetchKnowledgeGraphDebugInfo(group) && group.assistantAnnotation.messageId != null;
  const { data: span, isLoading } = useSWR(
    shouldFetch && ['get', `/api/v1/chats/${id}/messages/${group.assistantAnnotation.messageId}/trace/knowledge-graph-retrieval`],
    fetcher<{ input: string, output: ServerGraphData }>,
    {
      revalidateOnReconnect: false,
    },
  );

  const network = useNetwork(span);
  const traceUrl = group.assistantAnnotation.traceURL;

  return (
    <NetworkViewer
      className="my-2 border rounded w-full aspect-video"
      loading={!shouldFetch || isLoading}
      loadingTitle={shouldFetch ? 'Loading knowledge graph...' : 'Waiting knowledge graph request...'}
      network={network}
      Details={() => canEdit && traceUrl
        ? (
          <Link href={`/indexes/${index_id}/graph-editor?query=${encodeURIComponent(`trace:${getTraceId(traceUrl)}`)}`} className="absolute top-2 right-2 text-xs underline">
            <PencilIcon className="w-3 h-3 mr-1 inline-block" />
            Edit graph
          </Link>
        ) : null
      }
    />
  );
}

function couldFetchKnowledgeGraphDebugInfo (group: ConversationMessageGroupProps) {
  switch (group.assistantAnnotation.state) {
    case 'ERROR':
    case 'CONNECTING':
    case 'CREATING':
    case 'KG_RETRIEVING':
      return false;
    default:
      return true;
  }
}
