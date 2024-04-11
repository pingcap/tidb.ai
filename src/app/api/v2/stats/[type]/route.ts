import { getDb } from '@/core/v1/db';
import { defineHandler } from '@/lib/next/handler';
import { notFound } from 'next/navigation';
import { z } from 'zod';

export const GET = defineHandler({
  params: z.object({
    type: z.string(),
  }),
}, async ({ params, request }) => {
  if (!(params.type in stats)) {
    notFound();
  }

  return await (stats as any)[params.type](request);
});

export const dynamic = 'force-dynamic';

const stats = {
  document_index_state: async () => {
    const { documents } = await getDb()
      .selectFrom('llamaindex_document_node')
      .select(eb => eb.fn.countAll().as('documents'))
      .executeTakeFirstOrThrow();

    const { chunks } = await getDb()
      .selectFrom('llamaindex_document_chunk_node_default')
      .select(eb => eb.fn.countAll().as('chunks'))
      .executeTakeFirstOrThrow();

    return {
      documents: Number(documents),
      chunks: Number(chunks),
    };
  },
  document_import_tasks: async () => {
    const { result } = await getDb()
      .with('cte_agg', qc => qc.selectFrom('document_import_task')
        .select(eb => ([
          eb.fn.countAll().as('amount'),
          'status',
        ]))
        .groupBy('status'))
      .selectFrom('cte_agg')
      .select(eb => eb.fn('json_objectagg', [
        eb.ref('status'),
        eb.ref('amount'),
      ]).as('result'))
      .executeTakeFirstOrThrow();
    return result;
  },
};
