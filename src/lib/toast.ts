import type { ReactNode } from 'react';
import { toast } from 'sonner';

export function withToast<Args extends any[], Return> (
  fn: (...args: Args) => Promise<Return>,
  options: {
    loading?: (...args: Args) => ReactNode;
    success?: (...args: [Return, ...Args]) => ReactNode;
    error?: (...args: [unknown, ...Args]) => ReactNode;
  } = {},
) {
  return async (...args: Args) => {
    const id = toast.loading(options.loading ? options.loading(...args) : 'Executing...', {
      duration: 0,
    });

    try {
      const result = await fn(...args);
      toast.success(options.success ? options.success(result, ...args) : 'Operation succeed', {
        dismissible: true,
      });

      return result;
    } catch (e) {
      toast.error(options.error ? options.error(e, ...args) : `Operation failed :${(e as any)?.message ?? String(e)}`, {
        dismissible: true,
      });
      return Promise.reject(e);
    } finally {
      toast.dismiss(id);
    }
  };
}
