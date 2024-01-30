'use client';

import { Todo } from '@/components/todo';
import { usePathname } from 'next/navigation';

export default function Home () {
  return (
    <>
      <Todo>
        TODO: {usePathname()}
      </Todo>
    </>
  );
}
