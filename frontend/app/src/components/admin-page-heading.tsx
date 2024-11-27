import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { HelpCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

export interface BreadcrumbItem {
  title: ReactNode;
  url?: string;
  docsUrl?: string;
}

export interface TableHeadingProps {
  /**
   * @deprecated
   */
  title?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export function AdminPageHeading ({ title, breadcrumbs }: TableHeadingProps) {
  return (
    <div className="flex items-center gap-2 mb-2 pl-8">
      {breadcrumbs && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <Fragment key={index}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {item.url
                    ? <BreadcrumbLink asChild><Link href={item.url}>{item.title}</Link></BreadcrumbLink>
                    : index === breadcrumbs.length - 1
                      ? <BreadcrumbPage>{item.title}</BreadcrumbPage>
                      : <span>{item.title}</span>}
                  {item.docsUrl
                    ? <a href={item.docsUrl} target='_blank'><HelpCircleIcon className="size-4" /></a>
                    : undefined}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div>
        {title && <h2 className="text-2xl flex-shrink-0 font-semibold">{title}</h2>}
      </div>
    </div>
  )
    ;
}
