import { expect, test } from '@playwright/test';
import { loginViaApi } from '../utils/login';

test.describe('Site Sittings', () => {
  test('Basic Settings', async ({ page, browser, baseURL }) => {
    const homePage = await test.step('Visit Settings Page', async () => {
      await loginViaApi(page);
      await page.goto('/site-settings');
      const homePage = await browser.newPage({
        baseURL,
      });
      await homePage.goto('/');
      return homePage;
    });

    await test.step('Title and Description', async () => {
      await page.getByLabel('Title', { exact: true }).fill('FooBar.AI');
      await submitAndWaitSavedByLabel('Title');

      await page.getByLabel('Description', { exact: true }).fill('FooBar AI Description');
      await submitAndWaitSavedByLabel('Description');

      await page.getByLabel('Homepage Title', { exact: true }).fill('Ask anything about FooBar');
      await submitAndWaitSavedByLabel('Homepage Title');

      await page.reload();

      await homePage.waitForTimeout(7000); // wait for settings cache
      await homePage.reload();
      expect(await homePage.title()).toBe('FooBar.AI');
      await expect(homePage.locator('h1')).toHaveText('Ask anything about FooBar');
      await expect(homePage.locator('h1 + p')).toHaveText('FooBar AI Description');
      await expect(homePage.locator('meta[name=description]')).toHaveAttribute('content', 'FooBar AI Description');
    });

    async function submitAndWaitSavedByLabel (label: string) {
      const button = page.getByText(label, { exact: true }).locator('..').locator('..').getByRole('button', { name: 'Save', exact: true });

      // Click the save button in the field form
      await button.click();

      // Wait the save button to be vanished. (Saved)
      await button.waitFor({ state: 'hidden' });
    }
  });
});
