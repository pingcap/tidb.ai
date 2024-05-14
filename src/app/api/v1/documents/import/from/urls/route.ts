import {ImportDocumentsFromUrlsOptionsSchema} from "@/app/api/v1/documents/import/from/urls/schema";
import {DefaultDocumentImportService, DocumentImportService} from "@/core/services/importing";
import {defineHandler} from '@/lib/next/handler';
import {baseRegistry} from "@/rag-spec/base";
import {getFlow} from "@/rag-spec/createFlow";

export const POST = defineHandler({
  auth: 'admin',
  body: ImportDocumentsFromUrlsOptionsSchema
},  async ({ body}) => {
  const { urls } = body;

  const service = new DefaultDocumentImportService({ flow: await getFlow(baseRegistry) });
  const taskIds = await DocumentImportService.createTasksByURLs(urls);
  console.log('Create document import tasks: ', taskIds);

  return await service.runTasks(10, taskIds);
});

export const dynamic = 'force-dynamic';

export const maxDuration = 150;
