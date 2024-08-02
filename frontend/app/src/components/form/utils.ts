import { getErrorMessage } from '@/lib/errors';
import type { UseFormReturn } from 'react-hook-form';

export function handleSubmitHelper<Form extends UseFormReturn<any, any, any>> (
  form: Form,
  onValid: Parameters<Form['handleSubmit']>[0],
  onInvalid?: Parameters<Form['handleSubmit']>[1],
) {
  return form.handleSubmit(
    async (data) => {
      try {
        await onValid(data);
      } catch (e) {
        form.setError('root', { message: getErrorMessage(e) });
      }
    },
    onInvalid,
  );
}
