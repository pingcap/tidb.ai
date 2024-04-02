import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { UseFormReturn } from 'react-hook-form';
import { FormControl } from '@/components/ui/form';
import { reCaptcha } from '@/core/schema/setting';

export interface ReCaptchaSelectorProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  controlForm: UseFormReturn;
  onSelected?: () => void;
  fieldName?: string;
}

const ReCaptchaSelector = React.forwardRef<HTMLInputElement, ReCaptchaSelectorProps>(
  ({ className, controlForm, onSelected, fieldName = "google_recaptcha", ...field }, ref) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant='outline'
              role='combobox'
              className={cn(
                'w-[200px] justify-between',
                !field.value && 'text-muted-foreground'
              )}
            >
              {field.value
                ? reCaptcha.find((mode) => mode.value === field.value)?.label
                : 'Select reCaptcha mode'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Search theme...' />
            <CommandEmpty>No theme found.</CommandEmpty>
            <CommandGroup>
              {reCaptcha.map((mode) => (
                <CommandItem
                  value={mode.label}
                  key={mode.value}
                  onSelect={() => {
                    controlForm.setValue(fieldName, mode.value);
                    onSelected?.();
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      mode.value === field.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {mode.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

ReCaptchaSelector.displayName = 'ReCaptchaSelector';

export { ReCaptchaSelector };
