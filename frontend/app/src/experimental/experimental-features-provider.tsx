'use client';

import { createContext, type ReactNode, useContext } from 'react';

export interface ExperimentalFeatures {
  enable_message_post_verification: boolean;
}

const ExperimentalFeaturesContext = createContext<Partial<ExperimentalFeatures>>({});

export function ExperimentalFeaturesProvider ({ features, children }: { features: Partial<ExperimentalFeatures>, children: ReactNode }) {
  return (
    <ExperimentalFeaturesContext.Provider value={features}>
      {children}
    </ExperimentalFeaturesContext.Provider>
  );
}

export function useExperimentalFeatures () {
  return useContext(ExperimentalFeaturesContext);
}
