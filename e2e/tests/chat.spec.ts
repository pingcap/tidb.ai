import { expect, type Page, type Request, test } from '@playwright/test';

const QUESTION = 'What is the content of sample.pdf?';

test.describe('Chat', () => {
  test('From Home Page', async ({ page, baseURL }) => {
    await test.step('Visit home page', async () => {
      await page.goto('/');
    });

    const chatRequest = await test.step('Input text and ask', async () => {
      await page.getByPlaceholder('Input your question here...').fill(QUESTION);

      // https://playwright.dev/docs/events#waiting-for-event
      const chatRequestPromise = page.waitForRequest(request => request.url() === `${baseURL}/api/v1/chats` && request.method() === 'POST');
      const trigger = page.locator('button', { has: page.locator('svg.lucide-arrow-right') });
      await trigger.click();

      await expect(trigger).toBeDisabled();
      return await chatRequestPromise;
    });

    await testNewChat(page, chatRequest);
  });

  test('From Keyboard Shortcut', async ({ page, baseURL }) => {
    await test.step('Visit home page', async () => {
      await page.goto('/');
    });

    const chatRequest = await test.step('Input text and ask', async () => {
      await page.keyboard.press('ControlOrMeta+k');
      await page.keyboard.insertText(QUESTION);

      // https://playwright.dev/docs/events#waiting-for-event
      const chatRequestPromise = page.waitForRequest(request => request.url() === `${baseURL}/api/v1/chats` && request.method() === 'POST');
      await page.keyboard.press('ControlOrMeta+Enter');
      return await chatRequestPromise;
    });

    await testNewChat(page, chatRequest);
  });
});

async function testNewChat (page: Page, chatRequest: Request) {
  await test.step('Wait page changes', async () => {
    await page.waitForURL(/\/c\/.+/);

    expect(await page.title()).toContain(QUESTION);
    await page.getByRole('heading', { name: QUESTION }).waitFor({ state: 'visible' });
  });

  const streamText = await test.step('Wait for chat stop', async () => {
    const chatResponse = await chatRequest.response();
    expect(chatResponse.ok()).toBe(true);

    // Feedback button indicates chat ends.
    await page.locator('button', { has: page.locator('svg.lucide-message-square-plus') }).waitFor({
      state: 'visible',
      timeout: 35000
    });

    return await chatResponse.text();
  });

  await test.step('Check response text', async () => {
    const lastLine = streamText.split('\n').filter(t => !!t.trim()).slice(-1)[0];
    expect(lastLine).toMatch(/^2:/);
    const message = JSON.parse(lastLine.slice(2))[0].assistant_message;

    expect(message.finished_at).toBeTruthy();
    expect(message.content.trim().length).toBeGreaterThan(0);
  });
}
