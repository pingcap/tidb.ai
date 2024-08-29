import { getPublicSiteSettings } from '@/api/site-settings';
import { getBootstrapStatus } from '@/api/system';
import type { ExperimentalFeatures } from '@/experimental/experimental-features-provider';
import { BASE_URL } from '@/lib/request';

export async function loadConfig () {
  const [settings, bootstrapStatus, experimentalFeatures] = await Promise.all([
    getPublicSiteSettings().catch(error => {
      console.error('Cannot initialize tidb.ai widget', error);
      return Promise.reject(error);
    }),
    getBootstrapStatus().catch(error => {
      console.error('TiDB.ai service not bootstrapped', error);
      return Promise.reject(error);
    }),
    fetch(`${BASE_URL}/experimental-features`).then(res => res.json() as Promise<Partial<ExperimentalFeatures>>),
  ]);

  return { settings, bootstrapStatus, experimentalFeatures };
}
