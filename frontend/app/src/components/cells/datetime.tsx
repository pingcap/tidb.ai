import type { CellContext } from '@tanstack/react-table';
import { format } from 'date-fns';

export function datetime (props: CellContext<any, Date | null | undefined>) {
  const date = props.getValue();

  if (!date) {
    return '-';
  }

  if (Number.isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  return format(date, 'yyyy-MM-dd HH:mm:ss');
}
