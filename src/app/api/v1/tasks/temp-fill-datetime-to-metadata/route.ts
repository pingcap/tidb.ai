import {getDb} from '@/core/db';
import {executeInSafeDuration} from "@/lib/next/executeInSafeDuration";
import {defineHandler} from '@/lib/next/handler';

export const GET = defineHandler({ auth: 'cronjob' }, async () => {
  const urlPattern = 'https://docs.pingcap.com/%';

  await executeInSafeDuration(async () => {
    const documents = await getUnfilledDocuments(urlPattern);
    if (documents.length === 0) {
      return false;
    }
    console.log(`Found ${documents.length} documents.`);
    await fillLastUpdatedAtField(documents.map(d => d.document_id))
    return true;
  }, 60, 0.9);

  console.log('Done');
});

async function getUnfilledDocuments(urlPattern: string) {
  return await getDb()
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
          eb.val(urlPattern)
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
    .limit(300)
    .execute();
}

async function updateDocumentNodeMetadata(documentId: number, metadata: Record<string, any>) {
  return getDb().updateTable('llamaindex_document_node')
    .set({
      metadata: eb =>
        eb.fn('JSON_MERGE_PATCH', [
          eb.ref('metadata'), eb.val(JSON.stringify(metadata))
        ])
    })
    .where('document_id', '=', documentId)
    .execute();
}

async function fillLastUpdatedAtField(documentIds: number[]) {
  const documents = await getDb()
    .selectFrom('document')
    .select([
      'id', 'source_uri', 'content_uri'
    ])
    .where('id', 'in', documentIds)
    .where('mime', '=', 'text/html')
    .execute();

  console.log(`Found ${documents.length} documents to process.`);

  const limit = 5;
  let currentBatch = [];
  for (let document of documents) {
    currentBatch.push((async () => {
      const path = document.source_uri.replace('https://docs.pingcap.com/', '');

      // Fetch Page Data
      const pageDataUrl = `https://docs.pingcap.com/page-data/${path}/page-data.json`;
      const pageDataRes = await fetch(pageDataUrl);
      if (!pageDataRes.ok) {
        console.error(`Failed to get page data for path: ${path}`);
        return;
      }
      const pageData = await pageDataRes.json();
      const {pathConfig, filePath} = pageData.result.pageContext;
      const {branch} = pathConfig;

      // Fetch Commit Data
      const githubCommitsUrl = `https://api.github.com/repos/pingcap/docs/commits?sha=${branch}&path=${filePath}&per_page=1`;
      const commitDataRes = await fetch(githubCommitsUrl, {
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
        }
      });
      if (!commitDataRes.ok) {
        console.error(`Failed to get commit data for path: ${filePath}`);
        return;
      }
      const commitData = await commitDataRes.json();

      const authorDate = commitData[0]?.commit?.author?.date;
      console.log(`Update author date ${authorDate} for path: ${filePath}`);
      await updateDocumentNodeMetadata(document.id, {
        last_updated_at: authorDate
      });
    })());

    if (currentBatch.length >= limit) {
      await Promise.all(currentBatch);
      currentBatch = [];
    }
  }

  if (currentBatch.length > 0) {
    await Promise.all(currentBatch);
  }
}

export const dynamic = 'force-dynamic';
export const maxDuration = 120;
