import type { CellContext } from '@tanstack/react-table';

export const longText = (ctx: CellContext<any, string | undefined | null>) => {
  return (
    <p className="text-xs max-w-24 break-words text-wrap">
      {ctx.getValue()}
    </p>
  );
};
