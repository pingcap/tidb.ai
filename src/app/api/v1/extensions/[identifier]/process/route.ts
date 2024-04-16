import { rag } from '@/core/interface';
import { getErrorMessage } from '@/lib/errors';
import { handleErrors } from '@/lib/fetch';
import {defineHandler} from "@/lib/next/handler";
import { baseRegistry } from '@/rag-spec/base';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { z, type ZodObject } from 'zod';

const paramsSchema = z.object({
  identifier: z.string(),
});

export const POST = defineHandler({
  auth: 'admin',
  params: paramsSchema,
}, async ({ request, params: { identifier } }) => {
  const ctor = await baseRegistry.getComponent(identifier);
  if (!ctor) {
    notFound();
  }

  const { content, options } = z.object({
    content: z.string(),
    options: ctor.optionsSchema as ZodObject<any>,
  }).parse(await request.json());

  try {
    const component = await baseRegistry.create(identifier, options);
    if (component instanceof rag.Loader) {
      const response = await fetch(content).then(handleErrors);
      const result = await component.load(Buffer.from(await response.arrayBuffer()), content);
      return NextResponse.json(result);
    }

    return NextResponse.json({
      message: `playground api for ${identifier} not supported yet`,
    }, { status: 400 });
  } catch (e) {
    return new NextResponse(getErrorMessage(e), { status: 400 });
  }
});