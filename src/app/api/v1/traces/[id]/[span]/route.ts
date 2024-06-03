import { handleErrors } from '@/lib/fetch';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import z from 'zod';

export const GET = defineHandler({
  auth: 'admin',
  params: z.object({
    id: z.string(),
    span: z.enum(['knowledge-graph-retrieval']),
  }),
}, async ({ params }) => {
  const trace = await fetch(`https://us.cloud.langfuse.com/api/public/traces/${params.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`)}`,
    },
    cache: 'no-cache',
  }).then(handleErrors).then(res => res.json());

  const span = trace.observations.find((observation: any) => observation.name === params.span)!;
  if (!span) {
    notFound();
  }
  return span;
});

export const dynamic = 'force-dynamic';
