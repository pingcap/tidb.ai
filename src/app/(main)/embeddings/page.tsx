import { Button } from '@/components/ui/button';
import { db } from '@/core/db/db';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Page () {
  const indexes = await db.selectFrom('index')
    .select('name')
    .execute();

  return (
    <>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Embeddings</h1>
        <ul>
          {indexes.map(index => (
            <li key={index.name}>
              <Button asChild variant="secondary">
                <Link href={`/embeddings/${encodeURIComponent(index.name)}`}>
                  {index.name}
                  <ArrowRightIcon className='ml-2' size='1em' />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>

  );
}
