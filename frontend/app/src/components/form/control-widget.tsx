import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import type { SwitchProps } from '@radix-ui/react-switch';
import { forwardRef } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

export interface FormControlWidgetProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Partial<ControllerRenderProps<TFieldValues, TName>> {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
}

export { Input as FormInput, type InputProps as FormInputProps } from '@/components/ui/input';

export { Textarea as FormTextarea, type TextareaProps as FormTextareaProps } from '@/components/ui/textarea';

export interface FormSwitchProps extends FormControlWidgetProps, Omit<SwitchProps, 'checked' | 'onCheckedChange' | keyof FormControlWidgetProps> {
}

export const FormSwitch = forwardRef<any, FormSwitchProps>(({ value, onChange, ...props }, forwardedRef) => {
  return (
    <Switch
      {...props}
      ref={forwardedRef}
      checked={value}
      onCheckedChange={onChange}
    />
  );
});

FormSwitch.displayName = 'FormSwitch';

export { CodeInput as FormJsonInput, type CodeInputProps as FormJsonInputProps } from './widgets/CodeInput';

