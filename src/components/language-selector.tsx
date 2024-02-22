import * as React from "react"
import {Check, ChevronsUpDown} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {UseFormReturn} from "react-hook-form";
import {FormControl} from "@/components/ui/form";
import {languages} from "@/core/schema/setting";

export interface LanguageSelectorProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  controlForm: UseFormReturn
}

const LanguageSelector = React.forwardRef<HTMLInputElement, LanguageSelectorProps>(
  ({ className, controlForm, ...field }, ref) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? languages.find(
                  (language) => language.value === field.value
                )?.label
                : "Select language"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  value={language.label}
                  key={language.value}
                  onSelect={() => {
                    controlForm.setValue("language", language.value)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      language.value === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

LanguageSelector.displayName = "LanguageSelector"

export {LanguageSelector}
