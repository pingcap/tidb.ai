'use client';

import { type SettingGroups } from '@/core/schema/settings';
import { createContext, useContext } from 'react';

export const SettingContext = createContext<SettingGroups>(null as any);
export const SettingProvider = SettingContext.Provider;
export const useSettingContext = () => {
  return useContext(SettingContext);
};
export const useSettingGroup = <K extends keyof SettingGroups> (group: K) => {
  return useSettingContext()[group];
};
