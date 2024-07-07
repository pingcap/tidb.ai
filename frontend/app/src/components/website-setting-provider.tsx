'use client';

import type { PublicWebsiteSettings } from '@/api/site-settings';
import { createContext, useContext } from 'react';

export const SettingContext = createContext<PublicWebsiteSettings>(null as any);
export const SettingProvider = SettingContext.Provider;
export const useSettingContext = () => {
  return useContext(SettingContext);
};
