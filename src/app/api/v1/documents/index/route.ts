import {getIndexByNameOrThrow} from "@/core/repositories/index_";
import {DocumentIndexService} from "@/core/services/indexing";
import { defineHandler } from '@/lib/next/handler';
import {z} from "zod";

export const IndexDocumentsOptionsSchema = z.object({
  documentIds: z.number()
    .int()
    .array()
    .min(1, 'Must provide at least one document'),
  indexName: z.string()
});

export const POST = defineHandler({
  // auth: 'admin',
  body: IndexDocumentsOptionsSchema
},  async ({ body}) => {
  const { documentIds, indexName } = body;

  const index = await getIndexByNameOrThrow(indexName);
  const documentIdStr = documentIds.map((id) => `#${id}`).join(', ')
  console.log(`Creating index for documents ${documentIdStr} with index <${indexName}> (provider: ${index.config.provider})`);

  const service = new DocumentIndexService();
  await service.prepareProviders();

  // Create document index tasks.
  const taskIds = await DocumentIndexService.createDocumentIndexTasksByDocumentIds(documentIds, index.id);
  const taskIdStr = taskIds.map((id) => `#${id}`).join(', ')
  console.log(`Create document index tasks ${taskIdStr}.`);

  // Execute document index tasks.
  const results = await Promise.allSettled(
    taskIds.map(taskId => service.runDocumentIndexTask(taskId))
  );
  const succeed: number[] = [];
  const failed: { taskId: number, reason: string; }[] = [];

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      succeed.push(taskIds[i]);
    } else {
      failed.push({
        taskId: taskIds[i],
        reason: result.reason.message
      });
    }
  });

  return {
    succeed,
    failed
  }
});

export const dynamic = 'force-dynamic';
