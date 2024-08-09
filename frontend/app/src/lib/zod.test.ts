import { zodFile, zodJsonDate, zodJsonText } from '@/lib/zod';

test('zodDate', async () => {
  expect(zodJsonDate().safeParse('2024-08-09T01:28:40.370Z').success).toBe(true);
  expect(zodJsonDate().safeParse('2024-08-09T01:28:40.370').success).toBe(true);
});

test('zodJsonText', async () => {
  expect(zodJsonText().safeParse('{}').success).toBe(true);
  expect(zodJsonText().safeParse('null').success).toBe(true);
  expect(zodJsonText().safeParse('undefined').success).toBe(false);
  expect(zodJsonText().safeParse('{').success).toBe(false);
});

test('zodFile', async () => {
  expect(zodFile().safeParse(new File([], '')).success).toBe(true);
  expect(zodFile().safeParse({}).success).toBe(false);
});
