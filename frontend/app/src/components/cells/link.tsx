import type { CellContext } from '@tanstack/react-table';
import Link from 'next/link';

export interface LinkCellProps<Row> {
  url: (row: Row) => string;
  text?: (row: Row) => string;
}

export function link<Row> ({ url, text }: LinkCellProps<Row>) {
  // eslint-disable-next-line react/display-name
  return (context: CellContext<Row, any>) => (
    <Link
      className="underline font-mono"
      href={url(context.row.original)}>
      {text ? text(context.row.original) : String(context.getValue())}
    </Link>
  );
}
