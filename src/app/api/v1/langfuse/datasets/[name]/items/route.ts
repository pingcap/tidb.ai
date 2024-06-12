import { handleErrors } from '@/lib/fetch';
import { defineHandler } from '@/lib/next/handler';
import { Langfuse } from 'langfuse';
import z from 'zod';

export const POST = defineHandler({
  auth: 'admin',
  params: z.object({
    name: z.string(),
  }),
  body: z.object({
    traceId: z.string(),
  }),
}, async ({ params, body }) => {
  const trace = await fetch(`https://us.cloud.langfuse.com/api/public/traces/${body.traceId}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`)}`,
    },
    cache: 'no-cache',
  }).then(handleErrors).then(res => res.json());

  return await new Langfuse().createDatasetItem({
    datasetName: params.name,
    input: trace.input,
    metadata: trace.metadata,
    expectedOutput: trace.output,
    sourceTraceId: body.traceId,
  });
});
