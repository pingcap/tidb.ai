'use client';

import {createContext} from 'react';
import {useSettings} from "@/components/hooks";
import {IWebsiteSettingResult} from "@/core/schema/setting";

export const WebsiteSettingContext = createContext<IWebsiteSettingResult>({});
export const WebsiteSettingProvider = WebsiteSettingContext.Provider;
