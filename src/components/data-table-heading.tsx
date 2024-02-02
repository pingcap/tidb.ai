import { useDataTable } from '@/components/use-data-table';
import type { Table } from '@tanstack/table-core';
import type { ReactNode } from 'react';

export function DataTableHeading ({ children }: { children: ReactNode | ((table: Table<any>) => ReactNode) }) {
  const table = useDataTable();

  return (
    <div className="flex items-center gap-2">
      {typeof children === 'function' ? children(table) : children}
    </div>
  );
}
