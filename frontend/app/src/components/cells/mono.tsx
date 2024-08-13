import type { CellContext } from '@tanstack/react-table';

export const mono = (cell: CellContext<any, any>) => <span className="font-mono">{String(cell.getValue())}</span>;
