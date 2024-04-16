import {defineHandler} from "@/lib/next/handler";
import { baseRegistry } from '@/rag-spec/base';

export const GET = defineHandler({
  auth: 'admin',
}, async () => {
  return await baseRegistry.list();
})

export const dynamic = 'force-dynamic';
