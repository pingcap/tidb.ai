import { expect, test } from '@playwright/test';
import { getChatRequestPromise, QUESTION, testNewChat } from '../utils/chat';

test.describe('Chat', () => {
  test('From Home Page', async ({ page, baseURL }) => {
    await test.step('Visit home page', async () => {
      await page.goto('/');
    });

    const chatRequest = await test.step('Input text and ask', async () => {
      await page.getByPlaceholder('Input your question here...').fill(QUESTION);

      // https://playwright.dev/docs/events#waiting-for-event
      const chatRequestPromise = getChatRequestPromise(page, baseURL);
      const trigger = page.locator('button', { has: page.locator('svg.lucide-arrow-up') });
      await trigger.click();

      await expect(trigger).toBeDisabled();
      return await chatRequestPromise;
    });

    await testNewChat(page, chatRequest, true, true);
  });

  test('From Keyboard Shortcut', async ({ page, baseURL }) => {
    await test.step('Visit home page', async () => {
      await page.goto('/');
    });

    const chatRequest = await test.step('Input text and ask', async () => {
      await page.keyboard.press('ControlOrMeta+k');
      await page.keyboard.insertText(QUESTION);

      // https://playwright.dev/docs/events#waiting-for-event
      const chatRequestPromise = getChatRequestPromise(page, baseURL);
      await page.keyboard.press('ControlOrMeta+Enter');
      return await chatRequestPromise;
    });

    await testNewChat(page, chatRequest, true, false);
  });
});
