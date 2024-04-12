import {toggleProvider} from "@/core/repositories/auth";
import {defineHandler} from "@/lib/next/handler";
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import z from "zod";

const paramsSchema = z.object({
  name: z.string(),
  action: z.enum(['enable', 'disable'])
});

export const POST = defineHandler({
  auth: 'admin',
  params: paramsSchema,
},async ({ params }) => {
  const name = decodeURIComponent(params.name);
  const action = decodeURIComponent(params.action);

  let affected: boolean;
  switch (action) {
    case 'enable':
      affected = await toggleProvider(name, true);
      break;
    case 'disable':
      affected = await toggleProvider(name, false);
      break;
    default:
      notFound();
  }

  if (!affected) {
    notFound();
  }

  return new NextResponse();
});