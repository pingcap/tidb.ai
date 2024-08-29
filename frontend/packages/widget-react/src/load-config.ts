import { getPublicSiteSettings } from '@/api/site-settings';
import { getBootstrapStatus } from '@/api/system';

export async function loadConfig () {
  const [settings, bootstrapStatus] = await Promise.all([
    getPublicSiteSettings().catch(error => {
      console.error('Cannot initialize tidb.ai widget', error);
      return Promise.reject(error);
    }),
    getBootstrapStatus().catch(error => {
      console.error('TiDB.ai service not bootstrapped', error);
      return Promise.reject(error);
    }),
  ]);

  return { settings, bootstrapStatus };
}
