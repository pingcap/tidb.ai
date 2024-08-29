import type { ExperimentalFeatures } from '@/experimental/experimental-features-provider';

export function experimentalFeatures (): Partial<ExperimentalFeatures> {
  return {
    message_verify_service: process.env.EXPERIMENTAL_MESSAGE_VERIFY_SERVICE,
  };
}
