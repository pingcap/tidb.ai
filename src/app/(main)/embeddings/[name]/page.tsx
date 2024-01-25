import database from '@/core/db';

export default async function Page ({ params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);

  const stats = await database.document.getIndexState(name);

  return (
    <div className='p-4 space-y-4'>
      <h1 className='text-2xl font-semibold'>Embedding Index <code>{name}</code></h1>
      <div className='rounded border w-max'>
        {Object.entries(stats).map(([k, v]) => (
          <dl key={k} className='flex border-b last-of-type:border-b-0 px-4 py-2'>
            <dt className='w-60'>{k}</dt>
            <dd>{v}</dd>
          </dl>
        ))}
      </div>
    </div>
  );
}