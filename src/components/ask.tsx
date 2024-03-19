import { MessageInput } from '@/components/message-input';
import { type UseAskReturns } from '@/components/use-ask';
import { useRef } from 'react';
import { withReCaptcha } from '@/components/security-setting-provider';
import { useContext } from 'react';
import { SecuritySettingContext } from '@/components/security-setting-provider';

export function Ask ({ className, loading, ask }: { className?: string } & UseAskReturns) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const security = useContext(SecuritySettingContext);

  return (
    <form
      className={className}
      onSubmit={e => {
        const message = ref.current?.value ?? '';
        e.preventDefault();
        withReCaptcha({
          action: 'ask',
          siteKey: security?.google_recaptcha_site_key || '',
          mode: security?.google_recaptcha,
        }, ({ token, action, siteKey }) => {
          if (message.trim()) {
            ask(message, {
              headers: {
                'X-Recaptcha-Token': token,
                'X-Recaptcha-Action': action,
              },
            });
          }
        })
      }}
    >
      <MessageInput className="w-full" disabled={loading} inputRef={ref} />
    </form>
  );
}
