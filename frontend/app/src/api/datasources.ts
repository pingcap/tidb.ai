import { BASE_URL, buildUrlParams, handleResponse, opaqueCookieHeader, type Page, type PageParams, zodPage } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType } from 'zod';

interface DatasourceBase {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  build_kg_index: boolean;
  data_source_type: 'file';
}

export type Datasource = DatasourceBase & {
  data_source_type: 'file'
  config: { file_id: number, file_name: string }[]
}

export interface BaseCreateDatasourceParams {
  name: string;
  description: string;
  build_kg_index: boolean;
}

export type CreateDatasourceParams = BaseCreateDatasourceParams & {
  data_source_type: 'file'
  config: { file_id: number, file_name: string }[]
}

export interface Upload {
  created_at?: Date;
  updated_at?: Date;
  id: number;
  name: string;
  size: number;
  path: string;
  mime_type: string;
  user_id: string;
}

const baseDatasourceSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  created_at: zodJsonDate(),
  updated_at: zodJsonDate(),
  user_id: z.string(),
  build_kg_index: z.boolean(),
});

const datasourceSchema = baseDatasourceSchema
  .and(z.discriminatedUnion('data_source_type', [
    z.object({
      data_source_type: z.literal('file'),
      config: z.array(z.object({ file_id: z.number(), file_name: z.string() })),
    })],
  )) satisfies ZodType<Datasource, any, any>;

const uploadSchema = z.object({
  id: z.number(),
  name: z.string(),
  size: z.number(),
  path: z.string(),
  mime_type: z.string(),
  user_id: z.string(),
  created_at: zodJsonDate().optional(),
  updated_at: zodJsonDate().optional(),
}) satisfies ZodType<Upload, any, any>;

export async function listDataSources ({ page = 1, size = 10 }: PageParams = {}): Promise<Page<Datasource>> {
  return fetch(`${BASE_URL}/api/v1/admin/datasources?${buildUrlParams({ page, size }).toString()}`, {
    headers: await opaqueCookieHeader(),
  }).then(handleResponse(zodPage(datasourceSchema)));
}

export async function getDatasource (id: number): Promise<Datasource> {
  return fetch(`${BASE_URL}/api/v1/admin/datasources/${id}`, {
    headers: await opaqueCookieHeader(),
  }).then(handleResponse(datasourceSchema));
}

export async function createDatasource (params: CreateDatasourceParams) {
  return fetch(`${BASE_URL}/api/v1/admin/datasources`, {
    method: 'POST',
    headers: {
      ...await opaqueCookieHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(handleResponse(datasourceSchema));
}

export async function uploadFiles (files: File[]) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  return fetch(`${BASE_URL}/api/v1/admin/uploads`, {
    method: 'POST',
    headers: {
      ...await opaqueCookieHeader(),
    },
    body: formData,
  }).then(handleResponse(uploadSchema.array()));
}
