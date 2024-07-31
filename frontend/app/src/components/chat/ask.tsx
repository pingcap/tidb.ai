import { MessageInput } from '@/components/chat/message-input';
import { type UseAskReturns } from '@/components/chat/use-ask';
import { SecuritySettingContext, withReCaptcha } from '@/components/security-setting-provider';
import { useContext, useRef } from 'react';

export function Ask ({ className, loading, disabled, ask, engine, setEngine }: { className?: string } & UseAskReturns) {
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
            setEngine(undefined);
          }
        });
      }}
    >
      <MessageInput className="w-full" disabled={disabled || loading} inputRef={ref} engine={engine} onEngineChange={setEngine} />
    </form>
  );
}
