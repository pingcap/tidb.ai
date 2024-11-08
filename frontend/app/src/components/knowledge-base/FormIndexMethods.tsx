import type { FormControlWidgetProps } from '@/components/form/control-widget';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { type ReactNode, useId } from 'react';
import { type FieldPathByValue, FieldValues } from 'react-hook-form';

export function FormIndexMethods<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathByValue<TFieldValues, string[]> = FieldPathByValue<TFieldValues, string[]>
> ({ value, onChange }: FormControlWidgetProps<TFieldValues, TName>) {
  return (
    <div className="space-y-2">
      <IndexMethod
        label="Vector Index"
        description="Vector Index is enabled by default"
        disabled
        checked={value?.includes('vector_index') ?? false}
        onCheckedChange={checked => {
          const set = new Set(value);
          if (checked) {
            set.add('vector_index');
          } else {
            set.delete('vector_index');
          }
          onChange?.(Array.from(set));
        }}
      />
      <IndexMethod
        label="Graph Index"
        description="Graph Index"
        checked={value?.includes('graph_index') ?? false}
        onCheckedChange={checked => {
          const set = new Set(value);
          if (checked) {
            // graph index requires vector index.
            set.add('vector_index');
            set.add('graph_index');
          } else {
            set.delete('graph_index');
          }
          onChange?.(Array.from(set));
        }}
      />
    </div>
  );
}

function IndexMethod ({ disabled, label, description, checked, onCheckedChange }: { disabled?: boolean, label: ReactNode, description: ReactNode, checked: boolean, onCheckedChange: (value: boolean) => void }) {
  const id = useId();

  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <Label id={`${id}-label`} className="text-base" htmlFor={id}>
          {label}
        </Label>
        <p id={`${id}-description`} className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch
        id={id}
        disabled={disabled}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-description`}
      />
    </div>
  );
}