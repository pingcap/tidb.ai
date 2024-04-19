import { baseRegistry } from '@/rag-spec/base';
import { NextResponse } from 'next/server';

const testHTML = `
<html lang="en">
<head>
    <title>title</title>
</head>
<body>
    <main>
        <div class="ad">ad</div>
        <h1>heading</h1>
        <p>paragraph</p>
    </main>
    <div class="ad">ad</div>
</body>    
</html>
`;

const testURL = 'https://docs.pingcap.com/tidb/stable/tidb-architecture/subpage';

export async function GET () {
  let loader = await baseRegistry.create('rag.loader.html', {
    contentExtraction: [
      {
        url: 'docs.pingcap.com/**',
        selectors: [
          {
            selector: 'main',
            all: true,
            type: 'dom-text',
          }
        ],
        excludeSelectors: [
          {
            selector: '.ad',
            all: true,
          }
        ],
      },
    ],
    metadataExtraction: [
      {
        urlPattern: 'docs.pingcap.com/**',
        extractors: [
          {
            type: 'url-metadata-extractor',
            urlMetadataPattern: '/:language(zh|jp)?/:product(tidb|tidbcloud)/:version(dev|stable|v\\d/\\d)(/.*)',
            defaultMetadata: {
              language: 'en',
              version: 'stable',
            },
          },
        ],
      },
    ],
  });

  const result = loader.load(Buffer.from(testHTML), testURL);

  return NextResponse.json(result);
}

export const dynamic = 'force-dynamic';
