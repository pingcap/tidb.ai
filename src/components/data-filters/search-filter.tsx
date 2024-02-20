import { Input } from '@/components/ui/input';
import { useDataTable } from '@/components/use-data-table';

export function SearchFilter ({ disabled }: { disabled?: boolean }) {
  const table = useDataTable();

  const value = table.getState().globalFilter;

  return (
    <Input
      className="h-8 max-w-40"
      defaultValue={value ?? ''}
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