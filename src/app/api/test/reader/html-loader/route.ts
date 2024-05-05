import {defineHandler} from "@/lib/next/handler";
import {baseRegistry} from '@/rag-spec/base';
import {getFlow} from "@/rag-spec/createFlow";
import {NextResponse} from 'next/server';
import {z} from "zod";

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

const testConfig = {
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
};

const bodySchema = z.object({
  url: z.string().optional(),
  html: z.string().optional(),
  config: z.record(z.string(), z.any()).optional()
});

export const POST = defineHandler({
  testOnly: true,
  body: bodySchema
}, async ({ body }) => {
  let {
    url,
    html= testHTML,
    config = testConfig
  } = body;
  const flow = await getFlow(baseRegistry);

  let htmlBuffer: Buffer;
  if (url) {
    const htmlProcessor = flow.getImportSourceTaskProcessor('html', url);
    const htmlResult = await htmlProcessor.process({ url });
    if (!htmlResult.content) {
      throw new Error('Failed to load html');
    }
    htmlBuffer = htmlResult.content.buffer
  } else {
    // Fallback to use the default html.
    url = testURL;
    htmlBuffer = Buffer.from(html);
  }

  const loader = flow.getLoader('html', url).withOptions(config)
  const result = loader.load(htmlBuffer, url);

  return NextResponse.json(result);
});

export const dynamic = 'force-dynamic';
