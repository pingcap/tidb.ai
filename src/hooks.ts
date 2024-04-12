import useSWR, {SWRConfiguration} from "swr";
import {fetcher} from "@/lib/fetch";

export function useSettings<T>(config?: SWRConfiguration, group?: string) {
  const { data: settings = {}, isLoading } = useSWR(['GET',`/api/v1/settings?group=${group || 'website'}`], fetcher<T>, config);
  return settings;
}