import { expect, test } from '@playwright/test';

test.use({
  trace: !!process.env.CI ? 'off' : 'on',
});

test('Bootstrap', async ({ page }) => {
  test.slow();

  const {
    USERNAME,
    PASSWORD,
    E2E_LLM_PROVIDER,
    E2E_LLM_MODEL,
    E2E_LLM_CREDENTIALS,
    E2E_EMBEDDING_PROVIDER,
    E2E_EMBEDDING_MODEL,
    E2E_EMBEDDING_CREDENTIALS,
    E2E_RERANKER_PROVIDER,
    E2E_RERANKER_MODEL,
    E2E_RERANKER_CREDENTIALS,
  } = process.env;

  await test.step('Visit home page', async () => {
    await page.goto('/');

    // IMPORTANT: Prevent recording credentials
    await page.addStyleTag({
      content: `[name=credentials] { filter: blur(1.5rem); }`,
    });
    await expect(page).toHaveTitle('TiDB.AI');
    await expect(page.getByText('Ask anything about TiDB')).toBeVisible();
  });

  const hasWizardAlert = await page.getByText('This site is not ready to use yet.').isVisible();

  if (!hasWizardAlert) {
    return;
  }

  await test.step('Login to configure models', async () => {
    if (await page.getByRole('link', { name: 'Login', exact: true }).count() === 0) {
      console.warn('Already logged in');
      return;
    }

    const usernameInput = await page.waitForSelector('[name=username]');
    const passwordInput = await page.waitForSelector('[name=password]');
    const loginButton = page.getByRole('link', { name: 'Login', exact: true });

    // Fill in credentials
    await usernameInput.fill(USERNAME);
    await passwordInput.fill(PASSWORD);

    // Click login
    await loginButton.click();

    // Wait login
    await page.getByText(USERNAME).waitFor({ state: 'visible' });
  });

  await test.step('Open admin side menu', async () => {
    const modelTab = page.getByText('Models', { exact: true }).and(page.locator('[data-sidebar="menu-button"]'));
    if ((await modelTab.getAttribute('data-state')) !== 'open') {
      await modelTab.click();
    }
  });

  async function clickTab (text: string, url: string) {
    await test.step(`Goto ${text} page`, async () => {
      await page.getByText(text, { exact: true }).and(page.locator('[data-sidebar="menu-sub-button"]')).click();
      await page.waitForURL(url);
      await page.getByText(`New ${text.replace(/s$/, '')}`).waitFor({ state: 'visible' });
    });
  }

  // Setup reranker
  await test.step(`Create Default Reranker (${E2E_RERANKER_PROVIDER} ${E2E_RERANKER_MODEL})`, async () => {
    await clickTab('Reranker Models', '/reranker-models');

    if (await page.getByText('E2E Reranker').count() === 0) {
      await page.getByText('New Reranker Model').click();

      // Fill name
      const nameInput = await page.waitForSelector('[name=name]');
      await nameInput.fill('My Reranker');

      // Select provider
      await page.getByLabel('Provider').locator('..').locator('button').click();
      await page.getByText(E2E_RERANKER_PROVIDER, { exact: true }).click();

      // Fill model if provided
      if (E2E_RERANKER_MODEL) {
        const modelInput = await page.waitForSelector('[name=model]');
        await modelInput.fill(E2E_RERANKER_MODEL);
      }

      // Fill credentials
      if (E2E_RERANKER_CREDENTIALS) {
        const credentialsInput = await page.waitForSelector('[name=credentials]');
        await credentialsInput.fill(E2E_RERANKER_CREDENTIALS);
      }

      // Toggle default switch
      // TODO: should enable by default and and readOnly
      const toggleDefaultRerankerSwitchButton = page.getByRole('switch');
      if ((await toggleDefaultRerankerSwitchButton.evaluate(node => node.getAttribute('aria-checked'))) !== 'true') {
        await toggleDefaultRerankerSwitchButton.click();
      }

      // Click create button
      const createButton = page.getByText('Create Reranker');
      await createButton.scrollIntoViewIfNeeded();
      await createButton.click();

      // Wait for finish by check the url changes
      await page.waitForURL(/\/reranker-models\/.+/);
    }
  });

  await test.step(`Create Default LLM (${E2E_LLM_PROVIDER} ${E2E_LLM_MODEL})`, async () => {
    await clickTab('LLMs', '/llms');

    if (await page.getByText('E2E LLM').count() === 0) {
      await page.getByText('New LLM').click();

      // Fill name
      const nameInput = await page.waitForSelector('[name=name]');
      await nameInput.fill('My LLM');

      // Select provider
      await page.getByLabel('Provider').locator('..').locator('button').click();
      await page.getByText(E2E_LLM_PROVIDER, { exact: true }).click();

      // Fill model if provided
      if (E2E_LLM_MODEL) {
        const modelInput = await page.waitForSelector('[name=model]');
        await modelInput.fill(E2E_LLM_MODEL);
      }

      // Fill credentials
      const credentialsInput = await page.waitForSelector('[name=credentials]');
      await credentialsInput.fill(E2E_LLM_CREDENTIALS);

      // Toggle default switch
      // TODO: should enable by default and and readOnly
      const toggleDefaultLLMSwitchButton = page.getByRole('switch');
      if ((await toggleDefaultLLMSwitchButton.evaluate(node => node.getAttribute('aria-checked'))) !== 'true') {
        await toggleDefaultLLMSwitchButton.click();
      }

      // Click create button
      const createButton = page.getByText('Create LLM');
      await createButton.scrollIntoViewIfNeeded();
      await createButton.click();

      // Wait for finish by check the url changes
      await page.waitForURL(/\/llms\/.+/);
    }
  });

  await test.step(`Create Default Embedding model (${E2E_EMBEDDING_PROVIDER} ${E2E_EMBEDDING_MODEL || 'default'})`, async () => {
    await clickTab('Embedding Models', '/embedding-models');

    if (await page.getByText('E2E Embedding Model').count() === 0) {
      await page.getByText('New Embedding Model').click();

      // Fill name
      const nameInput = await page.waitForSelector('[name=name]');
      await nameInput.fill('My Embedding Model');

      // Select provider
      await page.getByLabel('Provider').locator('..').locator('button').click();
      await page.getByText(E2E_EMBEDDING_PROVIDER, { exact: true }).click();

      // Fill model if provided
      if (E2E_EMBEDDING_MODEL) {
        const modelInput = await page.waitForSelector('[name=model]');
        await modelInput.fill(E2E_EMBEDDING_MODEL);
      }

      // Fill credentials
      const credentialsInput = await page.waitForSelector('[name=credentials]');
      await credentialsInput.fill(E2E_EMBEDDING_CREDENTIALS);

      // Click create button
      const createButton = page.getByText('Create Embedding Model');
      await createButton.scrollIntoViewIfNeeded();
      await createButton.click();

      // Wait for finish by check the url changes
      await page.waitForURL(/\/embedding-models\/.+/);
    }
  });

  // SHOULD FAIL FROM HERE
  // Create Datasource
  test.fail();
  await test.step('Create Datasource', async () => {
    const header = page.getByText('Setup Datasource');
    if (await header.locator('.lucide-circle-alert').count() === 0) {
      // Already configured.
      console.warn('Datasource already configured.');
    } else {
      await header.click();

      const nameInput = await page.waitForSelector('[name=name]');
      await nameInput.fill('sample.pdf');

      const descriptionInput = await page.waitForSelector('textarea[name=description]');
      await descriptionInput.fill('This is sample.pdf.');

      await page.setInputFiles('[name=files]', 'sample.pdf');

      const createButton = page.getByText('Create Datasource');
      await createButton.scrollIntoViewIfNeeded();

      await createButton.click();

      await header.locator('.lucide-circle-alert').waitFor({ state: 'detached', timeout: 10000 });
    }
  });

  await test.step('Reload and check wizard dialog', async () => {
    await page.reload();
    await expect(page.getByText('Almost there...')).toHaveCount(0);
  });

  await test.step('Documents count greater than 0', async () => {
    await page.goto('/documents');
    await page.getByRole('link', { name: 'sample.pdf' }).waitFor({ state: 'visible' });
  });

  await test.step('Wait for indexing', async () => {
    while (true) {
      const response = await page.request.get('/api/v1/admin/rag/index-progress');
      if (!response.ok()) {
        console.warn(`${response.status()} ${response.statusText()}`, await response.text());
      } else {
        const json = await response.json();
        if (json.vector_index.completed > 0) {
          break;
        }
      }
      await page.waitForTimeout(500);
    }
  });
});
