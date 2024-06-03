import { type ServerGraphData } from '@/components/graph/api';
import { LinkDetails } from '@/components/graph/components/LinkDetails';
import { NetworkViewer, type NetworkViewerDetailsProps } from '@/components/graph/components/NetworkViewer';
import { NodeDetails } from '@/components/graph/components/NodeDetails';
import { useNetwork } from '@/components/graph/useNetwork';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearchParam } from '@/components/use-search-param';
import { getErrorMessage } from '@/lib/errors';
import { fetcher } from '@/lib/fetch';
import isHotkey from 'is-hotkey';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useSWR from 'swr';

export function GraphEditor ({}: {}) {
  const [query, setQuery] = useSearchParam('query', 'sample-question:What is TiDB?');

  const { data: span, isLoading, error } = useSWR(getFetchUrl(query), fetcher<ServerGraphData | { output: ServerGraphData }>, { revalidateOnFocus: false });

  const network = useNetwork(span);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="p-4 space-y-4">
      <SubgraphSelector query={query} onQueryChange={setQuery} />
      {(error != null) && <Alert variant="destructive">
        <AlertTitle>Failed to fetch subgraph</AlertTitle>
        <AlertDescription>{getErrorMessage(error)}</AlertDescription>
      </Alert>}
      <div className="w-full flex gap-4">
        <div className="flex-1">
          <NetworkViewer
            key={query}
            className="border rounded h-auto aspect-square"
            loading={isLoading}
            loadingTitle={'Loading knowledge graph...'}
            network={network}
            Details={(props) => (
              ref.current && createPortal(<Editor {...props} onEnterEntitySubgraph={id => {
                props.onTargetChange(undefined);
                setQuery(`entity:${id}`);
              }} />, ref.current!)
            )}
          />
        </div>
        <div className="w-96 flex-shrink-0 relative" ref={ref} />
      </div>
    </div>
  );
}

function SubgraphSelector ({ query, onQueryChange }: { query: string | null, onQueryChange: (query: string) => void }) {
  const [initialType = 'sample-question', initialInput = 'What is TiDB?'] = parseQuery(query) ?? [];

  const [type, setType] = useState<string>(initialType);
  const [input, setInput] = useState<string>(initialInput);

  return (
    <div className="flex gap-2">
      <Select value={type} onValueChange={type => {
        setType(type);
        setInput('');
      }}>
        <SelectTrigger className="w-max">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="trace">Langfuse Trace ID (UUID)</SelectItem>
          <SelectItem value="entity">Entity ID</SelectItem>
          <SelectItem value="sample-question">Sample Question</SelectItem>
        </SelectContent>
        <Input
          className="flex-1"
          value={input}
          onChange={event => setInput(event.target.value)}
          onKeyDown={event => {
            if (isHotkey('Enter', event)) {
              onQueryChange(`${type}:${input}`);
            }
          }}
        />
      </Select>
    </div>
  );
}

function Editor ({ network, target, onTargetChange, onEnterEntitySubgraph }: NetworkViewerDetailsProps & { onEnterEntitySubgraph: (entityId: number) => void }) {
  if (target) {
    if (target.type === 'link') {
      return <LinkDetails relationship={network.link(target.id)!} onClickTarget={onTargetChange} />;
    } else if (target.type === 'node') {
      return <NodeDetails entity={network.node(target.id)!} onClickTarget={onTargetChange} onEnterEntitySubgraph={onEnterEntitySubgraph} />;
    }
  }

  return <div className='flex items-center justify-center h-40 text-sm text-muted-foreground font-bold'>
    Select an entity or relationship
  </div>;
}

function getFetchUrl (query: string | null): ['get', string] | null {
  if (!query) {
    return null;
  }

  const parsedQuery = parseQuery(query);
  if (!parsedQuery) {
    return null;
  }

  switch (parsedQuery[0]) {
    case 'trace':
      return ['get', `/api/v1/traces/${parsedQuery[1]}/knowledge-graph-retrieval`];
    case 'entity':
      return ['get', `/api/v1/indexes/graph/entities/${parsedQuery[1]}/subgraph`];
    case 'sample-question':
      return ['get', `/api/v1/indexes/graph/search/?query=${encodeURIComponent(parsedQuery[1])}`];
  }

  return null;
}

function parseQuery (query: string | null) {
  if (!query) {
    return null;
  }

  const idx = query.indexOf(':');
  if (idx < 0) {
    return null;
  }

  return [query.slice(0, idx), query.slice(idx + 1)] as const;
}
