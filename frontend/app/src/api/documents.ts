import { BASE_URL, buildUrlParams, handleResponse, opaqueCookieHeader, type Page, type PageParams, zodPage } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType } from 'zod';

export interface Document {
  id: number,
  name: string,
  created_at: Date;
  updated_at: Date
  last_modified_at: Date,
  hash: string
  content: string
  meta: object,
  mime_type: string,
  source_uri: string,
  index_status: string,
  index_result?: unknown
}

const documentSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: zodJsonDate(),
  updated_at: zodJsonDate(),
  last_modified_at: zodJsonDate(),
  hash: z.string(),
  content: z.string(),
  meta: z.object({}).passthrough(),
  mime_type: z.string(),
  source_uri: z.string(),
  index_status: z.string(),
  index_result: z.unknown(),
}) satisfies ZodType<Document, any, any>;

export async function listDocuments ({ page = 1, size = 10, query }: PageParams & { query?: string } = {}): Promise<Page<Document>> {
  return await fetch(BASE_URL + '/api/v1/admin/documents' + '?' + buildUrlParams({ page, size, query }), {
    headers: await opaqueCookieHeader(),
  })
    .then(handleResponse(zodPage(documentSchema)));
}
