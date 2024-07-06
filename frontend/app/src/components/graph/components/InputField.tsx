import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  label, ...inputProps
}, ref) => {
  return (
    <section>
      <h6 className="text-xs font-bold text-accent-foreground mb-1">
        {label}
      </h6>
      <input
        ref={ref}
        className="block w-full text-xs text-accent-foreground border p-1 bg-card rounded outline-primary"
        {...inputProps}
      />
    </section>
  );
});

InputField.displayName = 'InputField';

