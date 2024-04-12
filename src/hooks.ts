import useSWR, {SWRConfiguration} from "swr";
import {fetcher} from "@/lib/fetch";
import {IWebsiteSettingResult} from "@/core/schema/setting";

export function useSettings<T>(config?: SWRConfiguration, group?: string) {
  const { data: settings = {}, isLoading } = useSWR(['GET',`/api/v2/settings?group=${group || 'website'}`], fetcher<T>, config);
  return settings;
}