'use client';

import type { SystemCheck } from '@/api/system';
import { createContext, type ReactNode, useContext } from 'react';

const SystemCheckContext = createContext<SystemCheck>({
  has_datasource: false,
  has_default_embedding_model: false,
  has_default_llm: false,
});

export function SystemCheckProvider ({ systemCheck, children }: { systemCheck: SystemCheck, children: ReactNode }) {
  return <SystemCheckContext.Provider value={systemCheck}>{children}</SystemCheckContext.Provider>;
}

export function useSystemCheck () {
  return useContext(SystemCheckContext);
}