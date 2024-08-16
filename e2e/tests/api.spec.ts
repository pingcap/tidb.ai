import { expect, test } from '@playwright/test';
import type { APIResponse } from 'playwright-core';
import { loginViaApi } from '../utils/login';

// let key: string = '';
//
// test.beforeAll(async ({ request }) => {
//   const response = await request.post('/api/v1/api-leys', {
//     data: JSON.stringify({
//       description: 'E2E API Tests',
//     }),
//   });
//
//   const { api_key } = await response.json();
//   key = api_key;
//
//   console.log(`Created API Key, ${key}`);
// });

test.describe('API', () => {
  test('Bootstrap Status API', async ({ request }) => {
    await expectOk(request.get('/api/v1/system/bootstrap-status'));
  });

  test('Retrieve Entity or Entites', async ({ request }) => {
    async function expectGetOkStep (url: string) {
      await test.step(url, async () => {
        const response = await request.get(url);

        if (!response.ok()) {
          console.error(`${response.status()} ${response.statusText()}`, await response.text());
        }

        await expectOk(response);
      });
    }

    await loginViaApi({ request });

    //
    // =====
    // User

    await expectGetOkStep('/api/v1/chats');

    await expectGetOkStep('/api/v1/site-config');

    await expectGetOkStep('/api/v1/api-keys');

    //
    // =====
    // Admin

    await expectGetOkStep('/api/v1/admin/chat-engines');

    await expectGetOkStep('/api/v1/admin/documents');

    await expectGetOkStep('/api/v1/admin/datasources');

    await expectGetOkStep('/api/v1/admin/site-settings');

    await expectGetOkStep('/api/v1/admin/feedbacks');

    await expectGetOkStep('/api/v1/admin/llms');
    await expectGetOkStep('/api/v1/admin/llms/options');

    await expectGetOkStep('/api/v1/admin/embedding-model');
    await expectGetOkStep('/api/v1/admin/embedding-model/options');

    await expectGetOkStep('/api/v1/admin/reranker-models');
    await expectGetOkStep('/api/v1/admin/reranker-models/options');
  });
});

async function expectOk (response: APIResponse | Promise<APIResponse>) {
  expect((await response).ok()).toBe(true);
}
