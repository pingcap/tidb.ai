'use client';

import {createContext} from 'react';
import {useSettings} from "@/hooks";
import {IWebsiteSettingResult} from "@/core/schema/setting";

export const WebsiteSettingContext = createContext<IWebsiteSettingResult>({});

export default function WebsiteSettingProvider({ children }: any) {
  const settings = useSettings();

  return (
      <WebsiteSettingContext.Provider value={settings}>
          {children}
      </WebsiteSettingContext.Provider>
  );
}