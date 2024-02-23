import useSWR, {SWRConfiguration} from "swr";
import {fetcher} from "@/lib/fetch";
import {IWebsiteSettingResult} from "@/core/schema/setting";

export function useSettings(config?: SWRConfiguration) {
  const { data: settings = {}, isLoading } = useSWR(['GET',`/api/v1/settings?group=website`], fetcher<IWebsiteSettingResult>, config);
  return settings;
}