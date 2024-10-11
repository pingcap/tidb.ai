import { indexStatuses } from '@/api/rag';
import { authenticationHeaders, handleResponse, type Page, type PageParams, requestUrl, zodPage } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType } from 'zod';

export const mimeTypes = [
  { name: 'Text', value: 'text/plain' },
  { name: 'Markdown', value: 'text/markdown' },
  { name: 'Pdf', value: 'application/pdf' },
  { name: 'Microsoft Word (docx)', value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  { name: 'Microsoft PowerPoint (pptx)', value: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
] as const satisfies MimeType[];

const mimeValues: (typeof mimeTypes)[number]['value'] = mimeTypes.map(m => m.value) as never;

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
  data_source_id: number
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
  data_source_id: z.number(),
}) satisfies ZodType<Document, any, any>;

const zDate = z.coerce.date().or(z.literal('').transform(() => undefined)).optional();

export const listDocumentsFiltersSchema = z.object({
  name: z.string().optional(),
  source_uri: z.string().optional(),
  data_source_id: z.coerce.number().optional(),
  created_at_start: zDate,
  created_at_end: zDate,
  updated_at_start: zDate,
  updated_at_end: zDate,
  last_modified_at_start: zDate,
  last_modified_at_end: zDate,
  mime_type: z.enum(mimeValues).optional(),
  index_status: z.enum(indexStatuses).optional(),
});

export type ListDocumentsTableFilters = z.infer<typeof listDocumentsFiltersSchema>;

export async function listDocuments ({ page = 1, size = 10, ...filters }: PageParams & ListDocumentsTableFilters = {}): Promise<Page<Document>> {
  return await fetch(requestUrl('/api/v1/admin/documents', { page, size, ...filters }), {
    headers: await authenticationHeaders(),
  })
    .then(handleResponse(zodPage(documentSchema)));
}

export interface MimeType {
  name: string;
  value: string;
}

