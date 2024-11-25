import { getErrorMessage } from '@/lib/errors';
import { FormEvent } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export function handleSubmitHelper<Form extends UseFormReturn<any, any, any>> (
  form: Form,
  onValid: Parameters<Form['handleSubmit']>[0],
  onInvalid?: Parameters<Form['handleSubmit']>[1],
) {
  const handleSubmit = form.handleSubmit(
    async (data) => {
      try {
        await onValid(data);
      } catch (e) {
        form.setError('root', { message: getErrorMessage(e) });
      }
    },
    onInvalid,
  );

  return (event: FormEvent<HTMLFormElement>) => {
    // Prevent submit event being propagated to parent react components.
    event.stopPropagation();
    void handleSubmit(event);
  };
}
