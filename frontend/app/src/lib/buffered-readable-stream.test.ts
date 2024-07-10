import { bufferedReadableStreamTransformer } from '@/lib/buffered-readable-stream';

test('simple', async () => {
  expect(await mock(['Hello, world!\n'])).toEqual(['Hello, world!']);
  expect(await mock(['Hello,', ' world!\n'])).toEqual(['Hello, world!']);
  expect(await mock(['Hello,', ' world!\n', '\n'])).toEqual(['Hello, world!', '']);
  expect(await mock(['\n', 'Hello,', ' world!\n', '\n'])).toEqual(['', 'Hello, world!', '']);
  expect(await mock(['Hello, world!\nHello, ', 'world!\n'])).toEqual(['Hello, world!', 'Hello, world!']);
  expect(await mock(['not finished'])).toEqual([]);
});

test('stream error', async () => {
  const stream = new ReadableStream({
    async start (controller) {
      controller.error('reason');
    },
  });

  const reader = stream.pipeThrough(bufferedReadableStreamTransformer()).getReader();

  try {
    await reader.read();
    throw new Error('should failing');
  } catch (e) {
    expect(e).toEqual('reason');
  }
});

async function mock (array: string[]) {
  const stream = new ReadableStream({
    async start (controller) {
      const encoder = new TextEncoder();
      for (let string of array) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        controller.enqueue(encoder.encode(string));
      }
      controller.close();
    },
  });

  const reader = stream.pipeThrough(bufferedReadableStreamTransformer()).getReader();

  const transformedChunks: string[] = [];

  while (true) {
    const chunk = await reader.read();

    if (chunk.done) {
      break;
    }

    transformedChunks.push(chunk.value);
  }

  return transformedChunks;
}