'use client';

import type { Index } from '@/core/v1/index_';
import { createContext, type ReactNode, useContext } from 'react';

const IndexContext = createContext<Index>(null as any);

export function IndexProvider ({ index, children }: { index: Index, children: ReactNode }) {
  return <IndexContext.Provider value={index}>{children}</IndexContext.Provider>;
}

export function useIndex () {
  return useContext(IndexContext);
}
