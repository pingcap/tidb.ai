import { forwardRef, type ReactNode, type TextareaHTMLAttributes } from 'react';

export interface TextareaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: ReactNode;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(({
  label, ...textareaProps
}, ref) => {
  return (
    <section>
      <h6 className="text-xs font-bold text-accent-foreground mb-1">{label}</h6>
      <textarea
        ref={ref}
        className="block w-full min-h-40 text-xs text-accent-foreground overflow-y-auto border p-1 bg-card rounded outline-primary"
        {...textareaProps}
      />
    </section>
  );
});

TextareaField.displayName = 'TextareaField';
