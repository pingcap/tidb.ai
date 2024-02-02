import type { ReactNode } from 'react';

export interface TableHeadingProps {
  title: ReactNode;

  actions?: ReactNode;
}

export function AdminPageHeading ({ title, actions }: TableHeadingProps) {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-2xl flex-shrink-0 font-semibold">{title}</h1>
      <div className="flex ml-auto gap-2">
        {actions}
      </div>
    </div>
  );
}
