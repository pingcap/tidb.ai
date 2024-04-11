import { IndexConfigNav } from '@/app/(main)/(admin)/indexes/[id]/nav';
import { getIndex } from '@/core/v1/index_';
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
        <div className='lg:max-w-[50vw] p-4'>
          {children}
        </div>
      </IndexProvider>
    </div>
  );
}
