import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

export interface BreadcrumbItem {
  title: string;
  url?: string;
}

export interface TableHeadingProps {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export function AdminPageHeading ({ title, description, actions, breadcrumbs }: TableHeadingProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      {breadcrumbs && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <Fragment key={index}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {item.url
                    ? <BreadcrumbLink asChild><Link href={item.url}>{item.title}</Link></BreadcrumbLink>
                    : <BreadcrumbPage>{item.title}</BreadcrumbPage>}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div>
        {title && <h2 className="text-2xl flex-shrink-0 font-semibold">{title}</h2>}
        <p className="mt-2text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="mt-2 flex ml-auto gap-2">
        {actions}
      </div>
    </div>
  )
    ;
}
