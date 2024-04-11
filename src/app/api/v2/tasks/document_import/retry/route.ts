import { retryDocumentImportTask } from '@/core/v1/document_import_task';
import { defineHandler } from '@/lib/next/handler';
import { z } from 'zod';

export const POST = defineHandler({
  body: z.object({
    ids: z.number().array(),
  }),
}, async ({
  body,
}) => {
  let created = 0;
  let failed = 0;
  for (const id of body.ids) {
    try {
      const result = await retryDocumentImportTask(id);
      if (!result) {
        console.error(`Failed to restart task from ${id}`);
      }
      created++;
    } catch (e) {
      console.error(`Failed to create task from ${id}`, e);
      failed++;
    }
  }
  return { created, failed };
});

export const dynamic = 'force-dynamic';
