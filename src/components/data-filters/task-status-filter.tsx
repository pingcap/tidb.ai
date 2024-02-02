import { TASK_STATUS } from '@/components/cells/task-status';
import { DataTableFacetedFilter, type DataTableFacetedFilterOption } from '@/components/data-filters/facted-filter';
import { useDataTable } from '@/components/use-data-table';

export function ImportTaskStatusFilter ({ columnId = 'status' }: { columnId?: string }) {
  const table = useDataTable();
  const column = table.getColumn(columnId);

  return (
    <DataTableFacetedFilter title="Status" options={options} column={column} />
  );
}

const options: DataTableFacetedFilterOption[] = Object.values(TASK_STATUS);


