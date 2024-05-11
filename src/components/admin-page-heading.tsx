import type { ReactNode } from 'react';

export interface TableHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export function AdminPageHeading ({ title, description, actions }: TableHeadingProps) {
  return (
    <div className="flex items-center gap-2">
      <div>
        <h2 className="text-2xl flex-shrink-0 font-semibold">{title}</h2>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex ml-auto gap-2">
        {actions}
      </div>
    </div>
  )
    ;
}
