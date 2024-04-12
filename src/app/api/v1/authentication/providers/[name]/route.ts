import { removeProvider, updateProvider } from '@/core/v1/auth';
import {defineHandler} from "@/lib/next/handler";
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import {z} from "zod";

const paramsSchema = z.object({
  name: z.string(),
});

export const PUT = defineHandler({
  auth: 'admin',
  params: paramsSchema,
},async ({ params, request }) => {
  const name = decodeURIComponent(params.name);

  const config = await request.json();

  if (!await updateProvider(name, config)) {
    notFound();
  }

  return new NextResponse();
});

export const DELETE = defineHandler({
  auth: 'admin',
  params: paramsSchema,
}, async ({ params }) => {
  const name = decodeURIComponent(params.name);

  if (!await removeProvider(name)) {
    notFound();
  }

  return new NextResponse();
});
