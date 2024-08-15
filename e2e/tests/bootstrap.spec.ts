import { expect, test } from '@playwright/test';

test('Bootstrap', async ({ page }) => {
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
    await page.goto('http://127.0.0.1:3000');
    await expect(page).toHaveTitle('TiDB.AI');
  });

  const hasWizardDialog = await test.step('Wizard Dialog', async () => {
    if ((await page.getByText('Almost there...').count()) === 0) {
      console.warn('Already bootstrapped.');
      return false;
    }

    return true;
  });

  if (!hasWizardDialog) {
    return;
  }

  await test.step('Login', async () => {
    if (await page.getByRole('button', { name: 'Login', exact: true }).count() === 0) {
      console.warn('Already logged in');
      return;
    }

    const usernameInput = await page.waitForSelector('[name=username]');
    const passwordInput = await page.waitForSelector('[name=password]');
    const loginButton = page.getByRole('button', { name: 'Login', exact: true });

    // Fill in credentials
    await usernameInput.fill(USERNAME);
    await passwordInput.fill(PASSWORD);
    await page.screenshot({ path: 'screenshots/0-bootstrap/0-Login.png' });

    // Click login
    await loginButton.click();
    await page.screenshot({ path: 'screenshots/0-bootstrap/1-Click-Login.png' });

    // Wait login
    await page.getByText('Your app is not fully configured yet. Please complete the setup process.').waitFor();
    await page.screenshot({ path: 'screenshots/0-bootstrap/2-Login-Success.png' });
  });

  await test.step(`Create Default LLM (${E2E_LLM_PROVIDER} ${E2E_LLM_MODEL})`, async () => {
    const header = page.getByText('Setup default LLM');
    if (await header.locator('.lucide-circle-alert').count() === 0) {
      // Already configured.
      console.warn('Default LLM already configured.');
    } else {
      await header.click();
      await page.screenshot({ path: 'screenshots/0-bootstrap/3-Setup-Default-LLM.png' });

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
      await credentialsInput.fill(E2E_LLM_CREDENTIALS.slice(0, 4) + '*'.repeat(E2E_LLM_CREDENTIALS.length - 4));
      await page.screenshot({ path: 'screenshots/0-bootstrap/5-Setup-Default-LLM-Filled.png' });
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

      // Wait for finish by check the alert icon in header disappear
      try {
        await header.locator('.lucide-circle-alert').waitFor({ state: 'detached', timeout: 10000 });
      } catch (e) {
        throw new Error(await page.getByText('Failed to').locator('..').textContent({ timeout: 1000 }));
      }
      await page.screenshot({ path: 'screenshots/0-bootstrap/6-Setup-Default-LLM-Succeed.png' });
    }
  });

  await test.step(`Create Default Embedding model (${E2E_EMBEDDING_PROVIDER} ${E2E_EMBEDDING_MODEL || 'default'})`, async () => {
    const header = page.getByText('Setup default Embedding Model');
    if (await header.locator('.lucide-circle-alert').count() === 0) {
      // Already configured.
      console.warn('Default Embedding Model already configured.');
    } else {
      await header.click();
      await page.screenshot({ path: 'screenshots/0-bootstrap/7-Setup-Default-Embedding-Model.png' });

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
      await credentialsInput.fill(E2E_EMBEDDING_CREDENTIALS.slice(0, 4) + '*'.repeat(E2E_EMBEDDING_CREDENTIALS.length - 4));
      await page.screenshot({ path: 'screenshots/0-bootstrap/8-Setup-Default-Embedding-Model-Filled.png' });
      await credentialsInput.fill(E2E_EMBEDDING_CREDENTIALS);

      // Click create button
      const createButton = page.getByText('Create Embedding Model');
      await createButton.scrollIntoViewIfNeeded();
      await createButton.click();

      // Wait for finish by check the alert icon in header disappear
      try {
        await header.locator('.lucide-circle-alert').waitFor({ state: 'detached', timeout: 10000 });
      } catch (e) {
        throw new Error(await page.getByText('Failed to').locator('..').textContent({ timeout: 1000 }));
      }
      await page.screenshot({ path: 'screenshots/0-bootstrap/9-Setup-Default-Embedding-Model-Succeed.png' });
    }
  });

  // Create Datasource
  await test.step('Create Datasource', async () => {
    const header = page.getByText('Setup Datasource');
    if (await header.locator('.lucide-circle-alert').count() === 0) {
      // Already configured.
      console.warn('Datasource already configured.');
    } else {
      await header.click();
      await page.screenshot({ path: 'screenshots/0-bootstrap/10-Setup-Datasource.png' });

      const nameInput = await page.waitForSelector('[name=name]');
      await nameInput.fill('example.pdf');

      const descriptionInput = await page.waitForSelector('textarea[name=description]');
      await descriptionInput.fill('This is example.pdf.');

      await page.setInputFiles('[name=files]', 'sample.pdf');

      const createButton = page.getByText('Create Datasource');
      await createButton.scrollIntoViewIfNeeded();

      await createButton.click();

      await header.locator('.lucide-circle-alert').waitFor({ state: 'detached', timeout: 10000 });
      await page.screenshot({ path: 'screenshots/0-bootstrap/11-Setup-Datasource-Succeed.png' });
    }
  });

  // TODO Setup reranker

  await test.step('Reload and check wizard dialog', async () => {
    await page.reload();
    await page.screenshot({ path: 'screenshots/0-bootstrap/99-Bootstrap-Finished.png' });
    await expect(page.getByText('Almost there...')).toHaveCount(0);
  });
});
