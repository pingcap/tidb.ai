import type { ExtensionInfo } from '@/core/registry';
import { baseRegistry } from '@/rag-spec/base';
import { use } from 'react';

const getExtension = (i: string) => {
  if (_cached.has(i)) {
    return _cached.get(i)!;
  }
  const promise = baseRegistry.getComponent(i).then(res => res!);
  _cached.set(i, promise);
  return promise;
};

const _cached = new Map<string, Promise<ExtensionInfo>>();

export function useExtension (identifier: string) {
  return use(getExtension(identifier))!;
}
