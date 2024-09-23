import type { ExperimentalFeatures } from '@/experimental/experimental-features-provider';

export function experimentalFeatures (): Partial<ExperimentalFeatures> {
  return {
    enable_message_post_verification: true,
  };
}
