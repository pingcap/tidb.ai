import {getDb} from '@/core/db';
import {getIndexByNameOrThrow} from "@/core/repositories/index_";
import {fromFlowReaders} from "@/lib/llamaindex/builders/reader";
import {executeInSafeDuration} from "@/lib/next/executeInSafeDuration";
import {defineHandler} from '@/lib/next/handler';
import {baseRegistry} from '@/rag-spec/base';
import {getFlow} from '@/rag-spec/createFlow';

const readerConfig = {
  "rag.loader.html": {
    "contentExtraction": [
      {
        "selectors": [
          {
            "selector": ".doc-content",
            "type": "dom-text"
          }
        ],
        "url": "docs.pingcap.com/**"
      }
    ],
    "metadataExtraction": [
      {
        "extractors": [
          {
            "type": "html-metadata-extractor",
            "selector": ".doc-content + div span",
            "extract": "text",
            "key": "last_updated_at"
          }
        ],
        "urlPattern": "docs.pingcap.com/**"
      },
    ]
  }
};

export const POST = defineHandler({ testOnly: true }, async () => {
  const flow = await getFlow(baseRegistry);
  const index = await getIndexByNameOrThrow('default');
  const reader = fromFlowReaders(flow, readerConfig);

  await executeInSafeDuration(async () => {
    const documentWithoutMeta = await getDb()
      .selectFrom('llamaindex_document_node')
      .selectAll()
      .where((eb) => {
        return eb.and([
          eb(
            eb.fn(
              'JSON_UNQUOTE',
              [eb.fn('JSON_EXTRACT', [eb.ref('metadata'), eb.val('$.url')])],
            ),
            'like',
            eb.val('https://docs.pingcap.com/zh/tidb/v7.1/%')
          ),
          eb(
            eb.fn(
              'JSON_CONTAINS_PATH',
              [eb.ref('metadata'), eb.val('one'), eb.val('$.last_updated_at')],
            ),
            '=',
            eb.val(0)
          )
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
        for (let docWithMeta of docsWithMeta) {
          console.log(docWithMeta.metadata)

          // getDb()
          //   .updateTable('llamaindex_document_node')
          //   .where('document_id', '=', document.id)
          //   .set(({ eb }) => ({
          //     metadata: eb.fn('JSON_MERGE_PATCH', [
          //       eb.ref('metadata'),
          //       eb.val(JSON.stringify(docWithMeta.metadata)),
          //     ]),
          //   }))
          //   .execute()
          //   .then(null)
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
