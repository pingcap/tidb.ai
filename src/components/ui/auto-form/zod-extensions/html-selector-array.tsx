import AutoFormLabel from '@/components/ui/auto-form/common/label';
import { AutoFormInputComponentProps } from '@/components/ui/auto-form/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { HtmlSelectorItemType } from '@/lib/zod-extensions/types/html-selector-array';
import { useFieldArray, useFormContext } from 'react-hook-form';

type Fake = {
  fake: HtmlSelectorItemType[]
}

export function HtmlSelectorArrayInput ({
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
            <Select value={field.type} onValueChange={value => update(index, { ...field, type: value as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Value type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dom-text">DOM Text</SelectItem>
                <SelectItem value="dom-content-attr">DOM Attribute <code>content</code></SelectItem>
              </SelectContent>
            </Select>
            <Input key='css' placeholder="CSS Selector" value={field.selector} onChange={e => update(index, { ...field, selector: e.currentTarget.value })} />
            <div className="flex gap-1 items-center flex-shrink-0">
              <Label>
                Multiple DOM
              </Label>
              <Checkbox checked={field.all ?? false} onCheckedChange={checked => update(index, { ...field, all: !!checked })} />
            </div>
          </li>
        ))}
      </ul>
      <Button type="button" onClick={() => append({ selector: '' })}>
        Add selector
      </Button>
    </FormItem>
  );
}