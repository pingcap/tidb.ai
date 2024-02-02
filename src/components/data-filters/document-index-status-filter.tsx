import { INDEX_STATES } from '@/components/cells/index-state';
import { DataTableFacetedFilter, type DataTableFacetedFilterOption } from '@/components/data-filters/facted-filter';
import { useDataTable } from '@/components/use-data-table';

export function DocumentIndexStatusFilter ({ columnId = 'index_state' }: { columnId?: string }) {
  const table = useDataTable();
  const column = table.getColumn(columnId);

  return (
    <DataTableFacetedFilter title="Index status" options={options} column={column} />
  );
}

const options: DataTableFacetedFilterOption[] = Object.values(INDEX_STATES);


