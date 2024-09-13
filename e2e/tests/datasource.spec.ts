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

      await page.getByLabel('Name').fill('example site');
      await page.getByLabel('Description').fill('This is example.com');

      await page.locator('input[name="urls.0"]').locator('..').locator('button', { has: page.locator('svg.lucide-plus') }).click();
      await page.locator('input[name="urls.0"]').fill('https://example.com');
      await page.locator('input[name="urls.1"]').fill('https://www.iana.org/help/example-domains');

      await page.getByRole('button', { name: 'Create Datasource' }).click();

      await page.waitForURL(/\/datasources\/\d+/);

      const id = /\/datasources\/(\d+)/.exec(page.url())[1];
      while (true) {
        const response = await page.request.get(`/api/v1/admin/datasources/${id}/overview`);
        if (response.ok()) {
          const json = await response.json();
          if (json.vector_index.completed === 2) {
            break;
          }
        } else {
          console.warn(`${response.status()} ${response.statusText()}`, await response.text());
        }
        await page.waitForTimeout(500);
      }
    });

    await test.step('Check Documents Page', async () => {
      await page.goto('/documents');
      await expect(page.getByRole('link', { name: 'https://example.com' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'https://www.iana.org/help/example-domains' })).toBeVisible();
    });
  });

  test('Web Sitemap', async ({ page }) => {
    test.slow();

    await test.step('Login and visit page', async () => {
      await loginViaApi(page);

      await page.goto('/datasources');
      await expect(page.getByRole('heading', { name: 'Datasources' })).toBeVisible();
    });

    await test.step('Add Sitemap Datasource', async () => {
      await page.getByRole('button', { name: 'Create' }).click();
      await page.getByRole('tab', { name: 'Web Sitemap' }).click();
      await page.waitForURL('/datasources/create/web-sitemap');

      await page.getByLabel('Name').fill('example site from sitemap');
      await page.getByLabel('Description').fill('This is example sitemap');

      await page.locator('input[name="url"]').fill('http://static-web-server/example-sitemap.xml');

      await page.getByRole('button', { name: 'Create Datasource' }).click();

      await page.waitForURL(/\/datasources\/\d+/);

      const id = /\/datasources\/(\d+)/.exec(page.url())[1];
      while (true) {
        const response = await page.request.get(`/api/v1/admin/datasources/${id}/overview`);
        if (response.ok()) {
          const json = await response.json();
          if (json.vector_index.completed === 2) {
            break;
          }
        } else {
          console.warn(`${response.status()} ${response.statusText()}`, await response.text());
        }
        await page.waitForTimeout(500);
      }
    });

    await test.step('Check Documents Page', async () => {
      await page.goto('/documents');
      await expect(page.getByRole('link', { name: 'http://static-web-server/example-doc-1.html' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'http://static-web-server/example-doc-2.html' })).toBeVisible();
    });
  });

  test('Files', () => {
    test.fixme(true, 'Already tested in bootstrap');
  });
});