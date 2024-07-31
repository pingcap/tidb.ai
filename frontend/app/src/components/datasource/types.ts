const types = ['file', 'web-sitemap', 'web-single-page'] as const;
export type DatasourceType = typeof types[0];

export function isDatasourceType (value: string): value is DatasourceType {
  return types.includes(value as any);
}