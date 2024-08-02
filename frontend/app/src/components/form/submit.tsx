import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

export interface FormSubmitProps extends Omit<ButtonProps, 'type'> {
  submittingIcon?: ReactNode;
  submittingText?: ReactNode;
}

export function FormSubmit ({ submittingIcon, submittingText, disabled, children, ...props }: FormSubmitProps) {
  const { formState } = useFormContext();

  const isSubmitting = formState.isSubmitting;
  const isDisabled = formState.disabled;

  return (
    <Button {...props} disabled={isSubmitting || isDisabled || disabled} type="submit">
      {isSubmitting && (submittingIcon || <Loader2Icon className="mr-2 animate-spin repeat-infinite size-4" />)}
      {isSubmitting ? (submittingText || children) : children}
    </Button>
  );
}
