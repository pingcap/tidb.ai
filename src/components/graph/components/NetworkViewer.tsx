import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import { type FC, type ReactNode, useState } from 'react';
import { type Entity, type Relationship } from '../api';
import { NetworkCanvas } from '../components/NetworkCanvas';
import { NetworkContext } from '../components/NetworkContext';
import { BaseNetwork, type IdType } from '../network/Network';
import type { NetworkRendererOptions } from '../network/NetworkRenderer';

export interface NetworkViewerProps {
  className?: string;
  network: BaseNetwork<Entity, Relationship>;
  loading: boolean;
  loadingTitle: ReactNode;
  Details: FC<NetworkViewerDetailsProps>;
}

export interface NetworkViewerDetailsProps {
  network: BaseNetwork<Entity, Relationship>,
  target: { type: string, id: IdType } | undefined,
  onTargetChange: ((target: { type: string, id: IdType } | undefined) => void)
}

export function NetworkViewer ({ network, loading, loadingTitle, className, Details }: NetworkViewerProps) {
  const [target, setTarget] = useState<{ type: string, id: IdType }>();

  const networkOptions: NetworkRendererOptions<Entity, Relationship> = {
    showId: true,
    getNodeLabel: node => node.name,
    getNodeDetails: node => node.description,
    getNodeRadius: node => Math.pow(Math.log(1 + (network.nodeNeighborhoods(node.id)?.size ?? 0)) / Math.log(2), 2) * 2 + 5,
    getNodeColor: node => {
      if (node.entity_type === 'synopsis') {
        return `hsl(var(--brand1-foreground))`;
      } else {
        return `hsl(var(--primary))`;
      }
    },
    getNodeStrokeColor: node => {
      if (node.entity_type === 'synopsis') {
        return `hsl(var(--brand1))`;
      } else {
        return `hsl(var(--primary))`;
      }
    },
    getNodeLabelColor: node => {
      if (node.entity_type === 'synopsis') {
        return `hsl(var(--brand1))`;
      } else {
        return `hsl(var(--primary))`;
      }
    },
    getNodeLabelStrokeColor: node => {
      if (node.entity_type === 'synopsis') {
        return `hsl(var(--brand1-foreground))`;
      } else {
        return `hsl(var(--primary-foreground))`;
      }
    },
    getNodeMeta: node => node.meta,
    getLinkLabel: link => {
      const source = network.node(link.source)!;
      const target = network.node(link.target)!;
      return link.description
        .replace(source.name + ' -> ', '')
        .replace(' -> ' + target.name, '');
    },
    getLinkDetails: link => link.description,
    getLinkMeta: link => link.meta,
    getLinkLabelColor: () => {
      return `hsl(var(--primary) / 50%)`;
    },
    getLinkLabelStrokeColor: () => {
      return `hsl(var(--primary-foreground) / 50%)`;
    },

    onClickNode: (node) => {
      setTarget({ type: 'node', id: node.id });
    },
    onClickLink: (link) => {
      setTarget({ type: 'link', id: link.id });
    },
    onClickCanvas: () => {
      setTarget(undefined);
    },
  };

  return (
    <NetworkContext.Provider value={network}>
      <div className={cn('relative', className)}>
        <NetworkCanvas
          className={cn('w-full h-full overflow-hidden')}
          network={network}
          target={target}
          {...networkOptions}
        />
        <Details
          network={network}
          target={target}
          onTargetChange={setTarget}
        />
        <Loader loading={loading}>
          {loadingTitle}
        </Loader>
      </div>
    </NetworkContext.Provider>
  );
}
