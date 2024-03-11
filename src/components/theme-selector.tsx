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
import { themes } from '@/core/schema/setting';

export interface ThemeSelectorProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  controlForm: UseFormReturn;
  onSelected?: () => void;
}

const ThemeSelector = React.forwardRef<HTMLInputElement, ThemeSelectorProps>(
  ({ className, controlForm, onSelected, ...field }, ref) => {
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
                ? themes.find((theme) => theme.value === field.value)?.label
                : 'Select Theme'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Search theme...' />
            <CommandEmpty>No theme found.</CommandEmpty>
            <CommandGroup>
              {themes.map((theme) => (
                <CommandItem
                  value={theme.label}
                  key={theme.value}
                  onSelect={() => {
                    controlForm.setValue('widget_color_mode', theme.value);
                    onSelected?.();
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      theme.value === field.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {theme.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

ThemeSelector.displayName = 'ThemeSelector';

export { ThemeSelector };
