import { Select, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getErrorMessage } from '@/lib/errors';
import { cn } from '@/lib/utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import type { SwitchProps } from '@radix-ui/react-switch';
import { ChevronDown, Loader2Icon, TriangleAlertIcon, XCircleIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef, type ReactElement, type ReactNode } from 'react';
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

export type FormSelectConfig<T extends object> = {
  loading?: boolean
  error?: unknown
  options: T[]
  key: keyof T
  clearable?: boolean
  itemClassName?: string;
  renderOption: (option: T) => ReactNode;
  renderValue?: (option: T) => ReactNode;
}

export interface FormSelectProps extends FormControlWidgetProps {
  children?: ReactElement;
  placeholder?: string;
  config: FormSelectConfig<any>;
}

export const FormSelect = forwardRef<any, FormSelectProps>(({ config, placeholder, value, onChange, name, disabled, children, ...props }, ref) => {
  const isConfigReady = !config.loading && !config.error;
  const current = config.options.find(option => option[config.key] === value);

  return (
    <Select
      value={value == null ? '' : String(value)}
      onValueChange={value => {
        const item = config.options.find(option => String(option[config.key]) === value);
        if (item) {
          onChange?.(item[config.key]);
        }
      }}
      name={name}
      disabled={disabled || !isConfigReady}
    >
      <div className={cn('flex items-center gap-2', (props as any).className)}>
        <SelectPrimitive.Trigger
          ref={ref}
          disabled={disabled || !isConfigReady}
          {...props}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          )}
          asChild={!!children}
        >
          {config.loading
            ? <span></span>
            : !!config.error
              ? <span className="text-destructive">{getErrorMessage(config.error)}</span>
              : (children ? children : current ? (config.renderValue ?? config.renderOption)(current) : <span className="text-muted-foreground">{placeholder}</span>)
          }
          <span className="flex-1" />
          <SelectPrimitive.Icon asChild>
            {config.loading
              ? <Loader2Icon className="size-4 opacity-50 animate-spin repeat-infinite" />
              : config.error
                ? <TriangleAlertIcon className="size-4 text-destructive opacity-50" />
                : <ChevronDown className="h-4 w-4 opacity-50" />}
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              {(config.clearable !== false && current != null && !disabled) && <button
                className="ml-2 opacity-50 hover:opacity-100"
                type="button"
                onClick={(event) => {
                  onChange?.(null);
                }}>
                <XCircleIcon className="size-4" />
              </button>}
            </TooltipTrigger>
            <TooltipContent>
              Clear select
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <SelectContent className="max-h-[min(40vh,396px)]">
        {config.options.map(option => (
          <SelectItem value={String(option[config.key])} key={option[config.key]} className={config.itemClassName}>
            {config.renderOption(option)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

FormSelect.displayName = 'FormSelect';
