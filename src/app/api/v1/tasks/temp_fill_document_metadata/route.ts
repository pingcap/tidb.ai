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
    const documentWithoutMeta = await getDb()
      .selectFrom('llamaindex_document_node')
      .selectAll()
      .where((eb) => {
        return eb.and([
          eb(eb.fn('JSON_UNQUOTE', [eb.ref('metadata')]), '=', eb.val('null')),
        ])
      })
      .limit(100)
      .execute();

    console.log(`Found ${documentWithoutMeta.length} documents without metadata.`)

    const documentIds = Array.from(new Set(documentWithoutMeta.map(doc => doc.document_id)));
    if (documentIds.length == 0) {
      return false;
    }

    const documents = await getDb()
      .selectFrom('document')
      .select([
        'id', 'source_uri', 'content_uri'
      ])
      .where('id', 'in', documentIds)
      .where('mime', '=', 'text/html')
      .execute();

    console.log(`Found ${documents.length} documents to process.`);

    await Promise.all(documents.map(async document => {
      return reader.loadData({
        mime: 'text/html',
        content_uri: document.content_uri,
        source_uri: document.source_uri,
      }).then((docsWithMeta) => {
        console.log(`Processing document ${document.id}.`)
        for (let docWithMeta of docsWithMeta) {
          getDb()
            .updateTable('llamaindex_document_node')
            .where('document_id', '=', document.id)
            .set(({ eb }) => ({
              metadata: eb.fn('JSON_MERGE_PATCH', [
                eb.ref('metadata'),
                eb.val(JSON.stringify(docWithMeta.metadata)),
              ]),
            }))
            .execute()
            .then(null)
        }
      }).catch((e) => {
        console.error(`Failed to process document ${document.id}.`, e);
      });
    }));

    return true;
  }, 60, 0.9);
})

export const dynamic = 'force-dynamic';
export const maxDuration = 120;
