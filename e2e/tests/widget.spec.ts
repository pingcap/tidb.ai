import { expect, test } from '@playwright/test';

test.only('JS Widget', async ({ page }) => {
  await page.goto('/');
  expect(await page.waitForFunction(() => (window as any).tidbai)).toMatchObject({ open: false, dark: false });
});
