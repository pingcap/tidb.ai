import { MessageInput } from '@/components/message-input';
import { SecuritySettingContext, withReCaptcha } from '@/components/security-setting-provider';
import { type UseAskReturns } from '@/components/use-ask';
import { useContext, useRef } from 'react';

export function Ask ({ className, loading, ask, engine, setEngine }: { className?: string } & UseAskReturns) {
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
              engine,
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
      <MessageInput className="w-full" disabled={loading} inputRef={ref} engine={engine} onEngineChange={setEngine} />
    </form>
  );
}
