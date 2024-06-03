import { IndexConfigNav } from '@/app/(main)/(admin)/indexes/[id]/nav';
import { getIndex } from '@/core/repositories/index_';
import type { LayoutProps } from '@/lib/next/types';
import { notFound } from 'next/navigation';
import { IndexProvider } from './context';

export default async function Layout ({ children, params }: LayoutProps<{ id: string }>) {
  const index = await getIndex(parseInt(decodeURIComponent(params.id)));
  if (!index) {
    notFound();
  }
  return (
    <div className='my-16'>
      <IndexProvider index={index}>
        <IndexConfigNav />
        {children}
      </IndexProvider>
    </div>
  );
}
