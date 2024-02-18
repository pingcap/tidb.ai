import AutoFormLabel from '@/components/ui/auto-form/common/label';
import AutoFormTooltip from '@/components/ui/auto-form/common/tooltip';
import { AutoFormInputComponentProps } from '@/components/ui/auto-form/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Plus, TrashIcon } from 'lucide-react';
import { Fragment, useState } from 'react';

export function SeparatorArrayInput ({
  field,
  fieldConfigItem,
  fieldProps,
  isRequired,
  label,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;

  const value: string[] = field.value;
  const onChange: (value: string[]) => void = field.onChange;

  return (
    <FormItem>
      {showLabel && <AutoFormLabel label={label} isRequired={isRequired} />}
      <div className="space-y-2">
        {value.map((item, index) => (
          <div className="flex items-center gap-2" key={index}>
            <InputDisplay
              className="flex-shrink-0 flex-1"
              key={index}
              value={item}
              onChange={str => {
                value[index] = str;
                onChange([...value]);
              }}
            />
            <Button className="shrink-0 w-max h-max p-1 rounded-full" size="icon" variant="ghost">
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() => onChange([...value, ''])}
          className="mt-4 flex items-center"
        >
          <Plus className="mr-2" size={16} />
          Add
        </Button>
      </div>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}

function InputDisplay ({ value, onChange, className, ...props }: { className?: string, value: string, onChange: (value: string) => void }) {
  const [show, setShow] = useState(false);

  const onBlur = () => {
    setShow(false);
  };
  const onFocus = () => {
    setShow(true);
  };

  const chars = (value as string).split('');
  return (
    <div className={cn('relative', className)}>
      <Input className={show ? 'opacity-100' : 'opacity-0'} {...props} value={unescape(value)} onChange={(ev) => onChange(escape(ev.currentTarget.value))} onFocus={onFocus} onBlur={onBlur} />
      <div className={cn(show ? 'invisible' : 'visible', 'absolute left-0 top-0 w-full h-full rounded-lg border pointer-events-none px-3 py-2 text-sm space-x-1')}>
        {chars.map(char => (
          char === '\n'
            ? <Badge variant="secondary" key={char}>\n</Badge>
            : char === '\t' ?
              <Badge variant="secondary" key={char}>\t</Badge>
              : char === ' '
                ? <Badge variant="secondary" key={char}>SPACE</Badge>
                : <Fragment key={char}>{char}</Fragment>
        ))}
      </div>
    </div>
  );
}

function escape (value: string) {
  return value
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t');
}

function unescape (value: string) {
  return value
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t');
}
