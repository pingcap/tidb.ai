import type { ReactNode } from 'react';

export default function Layout ({ children }: { children: ReactNode }) {
  return (
    <div className='p-4'>
      <article className='prose prose-sm prose-neutral dark:prose-invert overflow-x-hidden break-all'>
        {children}
      </article>
    </div>
  )
}