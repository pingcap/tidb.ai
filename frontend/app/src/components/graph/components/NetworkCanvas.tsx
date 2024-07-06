import { useEffect, useRef, useState } from 'react';
import type { IdType, NetworkLink, NetworkNode, ReadonlyNetwork } from '../network/Network';
import { NetworkRenderer, type NetworkRendererOptions } from '../network/NetworkRenderer';

export interface NetworkCanvasProps<Node extends NetworkNode, Link extends NetworkLink> extends NetworkRendererOptions<Node, Link> {
  network: ReadonlyNetwork<Node, Link>;
  target: { type: string, id: IdType } | undefined;
  className?: string;
}

export function NetworkCanvas<Node extends NetworkNode, Link extends NetworkLink> ({ className, network, target, ...options }: NetworkCanvasProps<Node, Link>) {
  const ref = useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = useState<NetworkRenderer<Node, Link>>();

  useEffect(() => {
    const renderer = new NetworkRenderer(network, options);
    if (ref.current) {
      renderer.mount(ref.current);
    }
    setRenderer(renderer);

    return () => {
      renderer.unmount();
    };
  }, [network]);

  useEffect(() => {
    if (!renderer) {
      return;
    }
    if (!target) {
      renderer.blurNode();
      renderer.blurLink();
      return;
    }
    switch (target.type) {
      case 'node':
        renderer.focusNode(target.id);
        return () => renderer.blurNode();
      case 'link':
        renderer.focusLink(target.id);
        return () => renderer.blurLink();
    }
  }, [target]);

  return (
    <div className={className} ref={ref} />
  );
}