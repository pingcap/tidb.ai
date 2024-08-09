import type { FormControlWidgetProps } from '@/components/form/control-widget';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

export interface FormFieldLayoutProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label: ReactNode;
  description?: ReactNode;
  children: ((props: ControllerRenderProps<TFieldValues, TName>) => ReactNode) | ReactElement<FormControlWidgetProps<TFieldValues, TName>>;
}

function renderWidget<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> (children: FormFieldLayoutProps<TFieldValues, TName>['children'], props: ControllerRenderProps<TFieldValues, TName>) {
  if (typeof children === 'function') {
    return children(props);
  } else {
    return cloneElement(children, props);
  }
}

export function FormFieldBasicLayout<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> ({
  name,
  label,
  description,
  children,
}: FormFieldLayoutProps<TFieldValues, TName>) {
  return (
    <FormField<TFieldValues, TName>
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {renderWidget(children, field)}
          </FormControl>
          {description && <FormDescription className='break-words'>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}


export function FormFieldInlineLayout<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> ({
  name,
  description,
  children,
}: Omit<FormFieldLayoutProps<TFieldValues, TName>, 'label'>) {
  return (
    <FormField<TFieldValues, TName>
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {renderWidget(children, field)}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}


export function FormFieldContainedLayout<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> ({
  name,
  label,
  description,
  children,
}: FormFieldLayoutProps<TFieldValues, TName>) {
  return (
    <FormField<TFieldValues, TName>
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">{label}</FormLabel>
            {description && <FormDescription>
              {description}
            </FormDescription>}
          </div>
          <FormControl>
            {renderWidget(children, field)}
          </FormControl>
        </FormItem>
      )}
    />
  );
}
