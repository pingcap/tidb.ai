import { DefaultDocumentImportService, DocumentImportService } from '@/core/services/importing';
import { defineHandler } from '@/lib/next/handler';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';

export const POST = defineHandler({
  auth: 'admin',
}, async ({ request }) => {
  const form = await request.formData();
  const file = form.get('file');
  if (!file || !(file instanceof File)) {
    throw new Error('file needed');
  }

  const service = new DefaultDocumentImportService({ flow: await getFlow(baseRegistry) });

  const flow = await getFlow(baseRegistry);
  const storage = flow.getStorage();

  const uri = await storage.put(`uploads/${file.name}`, Buffer.from(await file.arrayBuffer()), false);

  const taskIds = await DocumentImportService.createTasksByURLs([uri], 'file');
  console.log('Create document import tasks: ', taskIds);

  return await service.runTasks(10, taskIds);
});

export const dynamic = 'force-dynamic';

export const maxDuration = 150;
