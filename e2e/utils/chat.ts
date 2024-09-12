import { expect, type Page, type Request, test } from '@playwright/test';

export const QUESTION = 'What is the content of sample.pdf?';

export function getChatRequestPromise (page: Page, baseURL: string) {
 return page.waitForRequest(request => request.url() === `${baseURL}/api/v1/chats` && request.method() === 'POST');
}

export async function testNewChat (page: Page, chatRequest: Request, validatePageTitle: boolean) {
  await test.step('Wait page changes', async () => {
    await page.waitForURL(/\/c\/.+/);

    if (validatePageTitle) {
      expect(await page.title()).toContain(QUESTION);
    }
    await page.getByRole('heading', { name: QUESTION }).waitFor({ state: 'visible' });
  });

  const streamText = await test.step('Wait for chat stop', async () => {
    const chatResponse = await chatRequest.response();
    expect(chatResponse.ok()).toBe(true);

    // Feedback button indicates chat ends.
    await page.locator('button', { has: page.locator('svg.lucide-message-square-plus') }).waitFor({ state: 'visible' });

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
