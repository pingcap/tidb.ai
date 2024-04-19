declare const grecaptcha: {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
  enterprise: {
    ready: (cb: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
};

export function withReCaptcha<T> (
  options: {
    action: string;
    siteKey: string;
    mode?: 'v3' | 'enterprise';
  },
  func: (data: { action: string; siteKey: string; token: string }) => Promise<T>,
) {
  const { action, siteKey } = options;
  // skip if no siteKey
  if (!siteKey) {
    return func({ action, siteKey, token: '' });
  }
  if (options.mode === 'v3') {
    return new Promise<T>(resolve => {
      grecaptcha.ready(async () => {
        const token = await grecaptcha.execute(siteKey, { action });
        resolve(func({ action, siteKey, token }));
      });
    });
  } else if (options.mode === 'enterprise') {
    return new Promise<T>(resolve => {
      grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute(siteKey, { action });
        resolve(func({ action, siteKey, token }));
      });
    });
  } else {
    return Promise.reject('Unknown grecaptcha mode');
  }
}
