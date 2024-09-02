import { BASE_URL } from '#lib/request/base-url';
import { buildUrlParams } from '@/lib/request/params';

export function requestUrl (pathname: string, searchParams?: object) {
  let url = BASE_URL + pathname;

  if (searchParams) {
    const usp = buildUrlParams(searchParams).toString();
    if (usp) {
      url += '?' + usp;
    }
  }

  return url;
}
