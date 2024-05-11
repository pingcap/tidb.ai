import { Input } from '@/components/ui/input';
import { useDataTable } from '@/components/use-data-table';
import placeholder from "lodash/fp/placeholder";

export interface SearchFilterProps {
  disabled?: boolean;
  placeholder?: string;
}

export function SearchFilter ({ disabled, placeholder }: SearchFilterProps) {
  const table = useDataTable();
  const value = table.getState().globalFilter;

  return (
    <Input
      className="h-8 max-w-40"
      defaultValue={value ?? ''}
      placeholder={placeholder}
      disabled={disabled}
      onKeyDown={e => {
        if (!e.nativeEvent.isComposing && e.key === 'Enter' && !disabled) {
          e.preventDefault();
          table.setGlobalFilter(e.currentTarget.value);
        }
      }}
    />
  );
}