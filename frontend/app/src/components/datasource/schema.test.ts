import { createDatasourceBaseSchema } from '@/components/datasource/schema';

test('datasource name should not be empty', () => {
  expect(createDatasourceBaseSchema.safeParse({
    name: '',
    description: '',
    build_kg_index: false,
    llm_id: null,
  }).success).toBe(false);

  expect(createDatasourceBaseSchema.safeParse({
    name: ' \t\n',
    description: '',
    build_kg_index: false,
    llm_id: null,
  }).success).toBe(false);

  expect(createDatasourceBaseSchema.safeParse({
    name: 'a',
    description: '',
    build_kg_index: false,
    llm_id: null,
  }).success).toBe(true);
});
