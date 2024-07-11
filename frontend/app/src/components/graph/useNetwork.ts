import { type Entity, handleServerGraph, type Relationship, type ServerGraphData } from '@/components/graph/utils';
import { BaseNetwork } from '@/components/graph/network/Network';
import { useMemo } from 'react';

export function useNetwork (span: { output: ServerGraphData } | ServerGraphData | undefined | null) {
  return useMemo(() => {
    const network = new BaseNetwork<Entity, Relationship>({ noDirection: false });
    if (span) {
      const { entities, relationships } = 'output' in span ? handleServerGraph(span.output) : handleServerGraph(span);
      entities.forEach((entity: any) => network.addNode(entity));
      relationships.forEach(({ source_entity_id, target_entity_id, ...rest }: any) => network.addLink({
        source: source_entity_id,
        target: target_entity_id,
        ...rest,
      }));
    }
    return network;
  }, [span]);
}