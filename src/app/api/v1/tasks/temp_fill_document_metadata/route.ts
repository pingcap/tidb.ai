import {getDb} from '@/core/db';
import {getIndexByNameOrThrow} from "@/core/repositories/index_";
import {fromFlowReaders} from "@/lib/llamaindex/converters/reader";
import {executeInSafeDuration} from "@/lib/next/executeInSafeDuration";
import {defineHandler} from '@/lib/next/handler';
import {baseRegistry} from '@/rag-spec/base';
import {getFlow} from '@/rag-spec/createFlow';

export const GET = defineHandler({ auth: 'cronjob' }, async () => {
  const flow = await getFlow(baseRegistry);
  const index = await getIndexByNameOrThrow('default');
  const reader = fromFlowReaders(flow, index.config.reader);

  await executeInSafeDuration(async () => {
    const documentWithoutMeta = await getDb().selectFrom('llamaindex_document_node')
      .selectAll()
      .where((eb) => {
        return eb(
          eb.ref('metadata', '->$').key('documentMetadata' as never),
          'is',
          eb.val(null),
        )
      })
      .limit(100)
      .execute();

    console.log(`Found ${documentWithoutMeta.length} documents without metadata.`)

    const documentIds = Array.from(new Set(documentWithoutMeta.map(doc => doc.document_id)));
    const documents = await getDb()
      .selectFrom('document')
      .select('id')
      .select('content_uri')
      .select('source_uri')
      .where('id', 'in', documentIds)
      .where('mime', '=', 'text/html')
      .execute();

    console.log(`Found ${documents.length} documents to process.`)

    if (documents.length == 0) {
      return false;
    }

    await Promise.all(documents.map(async document => {
      const docsWithMeta = await reader.loadData({
        mime: 'text/html',
        content_uri: document.content_uri,
        source_uri: document.source_uri,
      });

      console.log(`Processing document ${document.id}.`)

      for (let docWithMeta of docsWithMeta) {
        await getDb().updateTable('llamaindex_document_node')
          .where('document_id', '=', document.id)
          .set(({ eb }) => ({
            metadata: eb.fn('JSON_MERGE_PATCH', [
              eb.ref('metadata'),
              eb.val(JSON.stringify(docWithMeta.metadata)),
            ]),
          }))
          .execute();

        await getDb().updateTable('llamaindex_document_chunk_node_default')
          .where('document_id', '=', document.id)
          .set(({ eb }) => ({
            metadata: eb.fn('JSON_MERGE_PATCH', [
              eb.ref('metadata'),
              eb.val(JSON.stringify(docWithMeta.metadata)),
            ]),
          }))
          .execute();
      }
    }));

    return true;
  }, 60, 0.9);
})

export const dynamic = 'force-dynamic';
export const maxDuration = 120;
