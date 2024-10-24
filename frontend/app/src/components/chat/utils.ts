import type { OngoingState } from '@/components/chat/chat-message-controller';

export type { ChatEngineOptions } from '@/api/chat-engines';

export function parseSource (uri?: string) {
  if (!uri) {
    return 'Unknown';
  }
  if (/^https:\/\//.test(uri)) {
    return new URL(uri).hostname;
  } else {
    return uri;
  }
}

export function isNotFinished (ongoing: OngoingState<any> | undefined) {
  return !!ongoing && !ongoing.finished;
}
