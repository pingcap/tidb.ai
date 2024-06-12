import { handleErrors } from '@/lib/fetch';
import { defineHandler } from '@/lib/next/handler';

export const GET = defineHandler({
  auth: 'admin',
}, async ({}) => {
  const response = await fetch(`https://us.cloud.langfuse.com/api/public/datasets`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`)}`,
    },
  }).then(handleErrors);

  return await response.json()
});

export const dynamic = 'force-dynamic';
