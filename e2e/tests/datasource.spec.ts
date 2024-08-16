import { expect, test } from '@playwright/test';
import { loginViaApi } from '../utils/login';

test.describe('Datasource', () => {
  test('Web Single Page', async ({ page }) => {
    test.slow();

    await test.step('Login and visit page', async () => {
      await loginViaApi(page);

      await page.goto('/datasources');
      await expect(page.getByRole('heading', { name: 'Datasources' })).toBeVisible();
    });

    await test.step('Add Single Page Datasource', async () => {
      await page.getByRole('button', { name: 'Create' }).click();
      await page.getByRole('tab', { name: 'Web Single Page' }).click();
      await page.waitForURL('/datasources/create/web-single-page');

      await page.getByLabel('Name').fill('https://example.com');
      await page.getByLabel('Description').fill('This is example.com');

      await page.locator('input[name="urls.0"]').fill('https://example.com');
      await page.getByRole('button', { name: 'Create Datasource' }).click();

      await page.waitForURL(/\/datasources\/\d+/);

      const id = /\/datasources\/(\d+)/.exec(page.url())[1];
      while (true) {
        const response = await page.request.get(`/api/v1/admin/datasources/${id}/overview`);
        if (response.ok()) {
          const json = await response.json();
          if (json.vector_index.completed > 0) {
            break;
          }
        } else {
          console.warn(`${response.status()} ${response.statusText()}`, await response.text());
        }
        await page.waitForTimeout(500);
      }
    });
  });

  test('Web Sitemap', () => {
    test.fixme(true, 'Find a sample site with sitemap.xml');
  });

  test('Files', () => {
    test.fixme(true, 'Already tested in bootstrap');
  });
});