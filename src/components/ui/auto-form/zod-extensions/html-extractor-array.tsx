import AutoFormLabel from '@/components/ui/auto-form/common/label';
import { AutoFormInputComponentProps } from '@/components/ui/auto-form/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ExtractValueMethod,
  HTMLExtractor
} from '@/lib/zod-extensions/types/html-extractor-array';
import { useFieldArray, useFormContext } from 'react-hook-form';

type Fake = {
  fake: HTMLExtractor[]
}

export function HTMLExtractorArrayInput ({
  field,
  fieldConfigItem,
  fieldProps,
  isRequired,
  label,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;

  const form = useFormContext<Fake>();
  const { fields, update, append } = useFieldArray<Fake, 'fake'>({
    control: form.control,
    name: field.name,
  });

  return (
    <FormItem>
      {showLabel && <AutoFormLabel label={label} isRequired={isRequired} />}
      <ul className="space-y-2">
        {fields.map((field, index) => (
          <li key={index} className="flex items-center gap-2">
            <Select value={field.extract} onValueChange={value => update(index, { ...field, extract: value as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Extract value method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ExtractValueMethod.TEXT}>Element Text (Default)</SelectItem>
                <SelectItem value={ExtractValueMethod.MARKDOWN}>Element Markdown</SelectItem>
                <SelectItem value={ExtractValueMethod.ATTR}>Element Attribute</SelectItem>
                <SelectItem value={ExtractValueMethod.PROP}>Element Property</SelectItem>
              </SelectContent>
            </Select>
            <Input key="css" placeholder="CSS Selector" value={field.selector} onChange={e => update(index, { ...field, selector: e.currentTarget.value })} />
            <div className="flex gap-1 items-center flex-shrink-0">
              <Checkbox checked={field.all ?? false} onCheckedChange={checked => update(index, { ...field, all: !!checked })} />
              <Label>
                Match all elements
              </Label>
            </div>
          </li>
        ))}
      </ul>
      <FormField name={field.name} render={() => <FormMessage />} />

      <Button type="button" variant='secondary' onClick={() => append({ selector: '' })}>
        Add selector
      </Button>
    </FormItem>
  );
}