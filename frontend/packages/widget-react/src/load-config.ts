import { getPublicSiteSettings } from '@/api/site-settings';
import { getBootstrapStatus } from '@/api/system';
import type { ExperimentalFeatures } from '@/experimental/experimental-features-provider';
import { requestUrl } from '@/lib/request';

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
    fetch(requestUrl(`/experimental-features`)).then(res => res.json() as Promise<Partial<ExperimentalFeatures>>),
  ]);

  if (!settings.enable_post_verifications || !settings.enable_post_verifications_for_widgets) {
    delete experimentalFeatures.message_verify_service;
  }

  return { settings, bootstrapStatus, experimentalFeatures };
}
