import { type SettingItem, updateSiteSetting } from '@/api/site-settings';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { getErrorMessage } from '@/lib/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalCase } from 'change-case-all';
import { deepEqual } from 'fast-equals';
import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cloneElement, type ReactElement, type ReactNode, useCallback, useMemo } from 'react';
import { type ControllerRenderProps, useForm, useFormState, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z, type ZodType } from 'zod';

export interface SettingsFieldProps {
  name: string;
  item: SettingItem;
  arrayItemSchema?: ZodType;
  objectSchema?: ZodType;
  onChanged?: () => void;
  disabled?: boolean;
  children?: (props: ControllerRenderProps) => ReactElement;
}

export function SettingsField ({ name, item, arrayItemSchema, objectSchema, onChanged, disabled, children }: SettingsFieldProps) {
  const router = useRouter();

  if (!item) {
    return (
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Failed to load <em>{name}</em></AlertTitle>
        <AlertDescription>Frontend and backend services may be misconfigured, please check your deployments.</AlertDescription>
      </Alert>
    );
  }

  if (item.data_type === 'list') {
    if (!arrayItemSchema) {
      throw new Error(`list item requires array item schema`);
    }
  }

  if (item.data_type === 'dict') {
    if (!objectSchema) {
      throw new Error(`dict item requires object schema`);
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const schema = useMemo(() => {
    let schema: ZodType;
    switch (item.data_type) {
      case 'str':
        schema = z.string();
        break;
      case 'bool':
        schema = z.coerce.boolean();
        break;
      case 'int':
        schema = z.coerce.number().int();
        break;
      case 'float':
        schema = z.coerce.number();
        break;
      case 'list':
        if (!arrayItemSchema) {
          throw new Error(`list item requires array item schema`);
        }
        schema = arrayItemSchema.array();
        break;
      case 'dict':
        if (!objectSchema) {
          throw new Error(`dict item requires object schema`);
        }
        schema = objectSchema;
        break;
      default:
        throw new Error(`unknown data type`);
    }
    return z.object({ value: schema });
  }, [item.data_type, arrayItemSchema, objectSchema]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm({
    resolver: zodResolver(schema),
    disabled,
    values: {
      value: item.value,
    },
    defaultValues: {
      value: item.default,
    },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Control = useCallback(({ field: { ...props } }: { field: ControllerRenderProps }) => {
    let el: ReactNode;

    if (children) {
      el = cloneElement(children(props), props);
    } else {
      switch (item.data_type) {
        case 'int':
          el = <Input type="number" step={1} placeholder={String(item.default)} {...props} />;
          break;
        case 'float':
          el = <Input type="number" {...props} placeholder={String(item.default)} />;
          break;
        case 'str':
          el = <Input {...props} placeholder={item.default} />;
          break;
        case 'bool':
          el = <Switch {...props} onChange={undefined} checked={props.value} onCheckedChange={props.onChange} />;
          break;
        case 'dict':
        case 'list':
          throw new Error(`data type ${item.data_type} requires custom children`);
      }
    }

    return (
      <FormControl>
        {el}
      </FormControl>
    );
  }, [item.data_type, children]);

  const handleSubmit = form.handleSubmit(async data => {
    try {
      await updateSiteSetting(name, data.value);
      form.reset({ value: data.value });
      router.refresh();
      onChanged?.();
      toast.success(`Changes successfully saved.`);
    } catch (e) {
      form.setError('value', { type: 'value', message: getErrorMessage(e) });
      return Promise.reject(e);
    }
  });

  return (
    <Form {...form}>
      <form
        className="space-y-2"
        onSubmit={handleSubmit}
        onReset={(e) => {
          form.setValue('value', item.default, { shouldTouch: true, shouldDirty: true });
          // void handleSubmit(e);
        }}
      >
        <FormField
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{capitalCase(item.name)}</FormLabel>
              <Control field={field} />
              <FormDescription>{item.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Operations defaultValue={item.default} />
      </form>
    </Form>
  );
}

function Operations ({ defaultValue }: { defaultValue: any }) {
  const currentValue = useWatch({
    name: 'value',
  });
  const { isDirty, isSubmitting, disabled, isSubmitted } = useFormState();
  const notDefault = !deepEqual(currentValue, defaultValue);

  return (
    <div className="flex gap-2 items-center">
      {isDirty && <Button className="gap-2 items-center" type="submit" disabled={isSubmitting || disabled}>
        {isSubmitting && <Loader2Icon className="size-4 animate-spin repeat-infinite" />}
        Save
      </Button>}
      {(isDirty || notDefault) && <Button type="reset" variant="secondary" disabled={isSubmitting || !notDefault || disabled}>Reset</Button>}
    </div>
  );
}
