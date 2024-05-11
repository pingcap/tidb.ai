import {DefaultDocumentImportService, DocumentImportService} from "@/core/services/importing";
import {executeInSafeDuration} from "@/lib/next/executeInSafeDuration";
import { defineHandler } from '@/lib/next/handler';
import {baseRegistry} from "@/rag-spec/base";
import {getFlow} from "@/rag-spec/createFlow";
import { NextResponse } from "next/server";
import {z} from "zod";

export const ImportDocumentsFromUrlsOptionsSchema = z.object({
  urls: z.string()
    .url('The format of URL is incorrect.')
    .array()
    .min(1, 'Must provide at least one URL for importing.')
});

export const POST = defineHandler({
  // auth: 'admin',
  body: ImportDocumentsFromUrlsOptionsSchema
},  async ({ body}) => {
  const { urls } = body;

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async pull(controller) {
      const service = new DefaultDocumentImportService({ flow: await getFlow(baseRegistry) });
      const taskIds = await DocumentImportService.createTasksByURLs(urls);
      console.log('Create document import tasks: ', taskIds);

      const process = await service.runTasks(10, taskIds, (process) => {
        controller.enqueue(encoder.encode(JSON.stringify(process)));
      });

      controller.enqueue(encoder.encode(JSON.stringify(process)));
      controller.close();
    },
  });
  return new NextResponse(readableStream, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
});

export const dynamic = 'force-dynamic';
