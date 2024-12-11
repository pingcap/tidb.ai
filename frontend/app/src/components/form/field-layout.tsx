import type { FormControlWidgetProps } from '@/components/form/control-widget';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { ControllerRenderProps, FieldPath, type FieldPathByValue, type FieldPathValue, FieldValues } from 'react-hook-form';

export interface FormFieldLayoutProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label: ReactNode;
  required?: boolean;
  description?: ReactNode;
  // value = props.value ?? fallbackValue
  fallbackValue?: FieldPathValue<TFieldValues, TName>;
  children: ((props: ControllerRenderProps<TFieldValues, TName>) => ReactNode) | ReactElement<FormControlWidgetProps<TFieldValues, TName>>;
}

function renderWidget<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> (children: FormFieldLayoutProps<TFieldValues, TName>['children'], { value, ...props }: ControllerRenderProps<TFieldValues, TName>, fallbackValue?: FieldPathValue<TFieldValues, TName>) {
  if (typeof children === 'function') {
    return children({ value: value ?? fallbackValue as never, ...props });
  } else {
    return cloneElement(children, { value: value ?? fallbackValue as never, ...props });
  }
}

export function FormFieldBasicLayout<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> ({
  name,
  label,
  description,
  required,
  fallbackValue,
  children,
}: FormFieldLayoutProps<TFieldValues, TName>) {
  return (
    <FormField<TFieldValues, TName>
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <sup className="text-destructive" aria-hidden>*</sup>}
          </FormLabel>
          <FormControl>
            {renderWidget(children, field, fallbackValue)}
          </FormControl>
          {description && <FormDescription className="break-words">{description}</FormDescription>}
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
  label,
  description,
  children,
}: FormFieldLayoutProps<TFieldValues, TName>) {
  return (
    <FormField<TFieldValues, TName>
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormControl>
              {renderWidget(children, field)}
            </FormControl>
            <FormLabel>{label}</FormLabel>
          </div>
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
  required,
  fallbackValue,
  children,
  unimportant = false,
}: FormFieldLayoutProps<TFieldValues, TName> & { unimportant?: boolean }) {
  return (
    <FormField<TFieldValues, TName>
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className={cn(!unimportant && 'text-base')}>
              {label}
              {required && <sup className="text-destructive" aria-hidden>*</sup>}
            </FormLabel>
            {description && <FormDescription>
              {description}
            </FormDescription>}
          </div>
          <FormControl>
            {renderWidget(children, field, fallbackValue)}
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function FormPrimitiveArrayFieldBasicLayout<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathByValue<TFieldValues, any[]> = FieldPathByValue<TFieldValues, any[]>
> ({
  name,
  label,
  description,
  children,
  defaultValue,
}: FormFieldLayoutProps<TFieldValues, TName> & { defaultValue: () => FieldPathValue<TFieldValues, TName>[0] }) {
  return (
    <FormField<TFieldValues, TName>
      name={name}
      render={({ field: arrayField }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <ol className="space-y-2">
            {(arrayField.value as any[] ?? []).map((_, index) => (
              <FormField
                key={index}
                name={`${name}.${index}`}
                render={({ field }) => (
                  <li>
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl className="flex-1">
                          {renderWidget(children, field as any)}
                        </FormControl>
                        <Button
                          disabled={field.disabled}
                          size="icon"
                          variant="secondary"
                          type="button"
                          onClick={() => {
                            const newArray = [...arrayField.value];
                            newArray.splice(index, 0, defaultValue());
                            arrayField.onChange(newArray);
                          }}
                        >
                          <PlusIcon className="size-4" />
                        </Button>
                        <Button
                          disabled={field.disabled}
                          size="icon"
                          variant="ghost"
                          type="button"
                          onClick={() => {
                            const newArray = [...arrayField.value];
                            newArray.splice(index, 1);
                            arrayField.onChange(newArray);
                          }}
                        >
                          <MinusIcon className="size-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  </li>
                )}
              />
            ))}
          </ol>
          <Button
            className="w-full"
            variant="outline"
            type="button"
            onClick={() => {
              arrayField.onChange([...arrayField.value, defaultValue()]);
            }}
          >
            <PlusIcon className="w-4 mr-1" />
            New Item
          </Button>
          {description && <FormDescription className="break-words">{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormCollapsedBasicLayout<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> ({
  name,
  label,
  description,
  children,
  fallbackValue,
}: FormFieldLayoutProps<TFieldValues, TName>) {
  return (
    <FormField<TFieldValues, TName>
      name={name}
      render={({ field }) => (
        <Collapsible>
          <FormItem>
            <CollapsibleTrigger className="flex gap-2 items-center group cursor-pointer">
              <PlusIcon className="opacity-50 group-hover:opacity-100 transition-opacity size-4 hidden group-data-[state=closed]:block" />
              <MinusIcon className="opacity-50 group-hover:opacity-100 transition-opacity size-4 hidden group-data-[state=open]:block" />
              <FormLabel className="cursor-pointer">{label}</FormLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <FormControl>
                {renderWidget(children, field, fallbackValue)}
              </FormControl>
            </CollapsibleContent>
            {description && <FormDescription className="break-words">{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        </Collapsible>
      )}
    />
  );
}
