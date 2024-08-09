export {
  BASE_URL,
  zodPage,
  handleErrors,
  handleResponse,
  buildUrlParams,
  normalizeServerErrors,
  handleNullableResponse,
  isServerError,
} from '../../../../../app/src/lib/request';

export async function opaqueCookieHeader() {
  return {
    'Authorization': `Bearer ${process.env.TIDBAI_API_KEY}`,
  }
}
