import { query } from '@/core/query';
import { baseRegistry } from '@/rag-spec/base';
import { getFlow } from '@/rag-spec/createFlow';
import { StreamingTextResponse } from 'ai';
import { type NextRequest } from 'next/server';
import { z } from 'zod';

const postBodySchema = z.object({
  prompt: z.string(),
  retrieve_top_k: z.number().max(10).min(1),
  index: z.string(),
});

export async function POST (req: NextRequest) {
  const body = postBodySchema.parse(await req.json());

  const flow = getFlow(baseRegistry);

  const { id: queryId, top: data } = (await query(body.index, {
    text: body.prompt,
    top_k: body.retrieve_top_k,
  }))!;

  const contextContent = data!.map(item => `> url: ${item.source_uri}\n${item.text_content}`).join('\n\n');

  const model = flow.getChatModel('openai')!;

  const stream = await model.chatStream([
    { role: 'system', content: `注意：关于用户的问题，回答时只能以下文档的范围知识范围中选择相关的内容进行做答，当用户提出了与以下内容无关的问题时，回复无法做答即可。使用 markdown 格式回答问题。\n\n${contextContent}` },
    { role: 'user', content: body.prompt },
    { role: 'system', content: '用户的问题与上下文是否相关？不相关则不做答，相关则做答，并附上参考的上下文中相关内容的引用链接。' },
  ]);

  return new StreamingTextResponse(stream, {
    headers: {
      'X-Index-Query-Id': queryId,
    },
  });
}

export const dynamic = 'force-dynamic';
export const maxDuration = 300;
