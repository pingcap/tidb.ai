'use client';

import {createContext} from 'react';
import { ISecuritySettingResult} from "@/core/schema/setting";

export const SecuritySettingContext = createContext<ISecuritySettingResult>({});
export const SecuritySettingProvider = SecuritySettingContext.Provider;

declare var grecaptcha: any;

export async function withReCaptcha(
  options: {
    action: string;
    siteKey: string;
    mode?: 'v3' | 'enterprise';
  },
  func: (data: { action: string; siteKey: string; token: string }) => void
) {
  const { action, siteKey } = options;
  if (options.mode === 'v3') {
    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(siteKey, { action });
      func({ action, siteKey, token });
    });
  } else if (options.mode === 'enterprise') {
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute(siteKey, { action });
      func({ action, siteKey, token });
    });
  }
}