import { ChatMessageController, LegacyChatMessageController } from '@/components/chat/chat-message-controller';
import { AppChatStreamState } from '@/components/chat/chat-stream-state';
import { createExampleInitialChatMessage } from '@/components/chat/testutils';
import { jest } from '@jest/globals';

describe('stream', () => {

  const onUpdate = jest.fn();
  const onStreamUpdate = jest.fn();
  const onStreamError = jest.fn();
  const onStreamFinished = jest.fn();

  test('success', () => {

    const controller = new LegacyChatMessageController(createExampleInitialChatMessage(), true);

    controller.on('update', onUpdate)
      .on('stream-update', onStreamUpdate)
      .on('stream-error', onStreamError)
      .on('stream-finished', onStreamFinished);

    // TRACE event should provide langfuse_url
    expect(controller.message.trace_url).toBe('');
    controller.applyStreamAnnotation({
      state: AppChatStreamState.TRACE,
      display: 'trace',
      context: { langfuse_url: 'fake_url' },
    });
    expect(controller.message.trace_url).toBe('fake_url');

    // SOURCE_NODES event should provide sources
    expect(controller.message.sources.length).toBe(0);
    controller.applyStreamAnnotation({
      state: AppChatStreamState.SOURCE_NODES,
      display: 'source_nodes',
      context: [{ source_uri: 'uri', id: 0, name: 'foo' }],
    });
    expect(controller.message.sources).toStrictEqual([{ source_uri: 'uri', id: 0, name: 'foo' }]);

    // test applyDelta
    expect(controller.message.content).toEqual('');
    controller.applyDelta('Hello');
    expect(controller.message.content).toEqual('Hello');
    controller.applyDelta(' world!');
    expect(controller.message.content).toEqual('Hello world!');
    expect(onStreamUpdate).toHaveBeenCalledTimes(4);

    controller.finish();
    expect(controller.ongoing).toBeUndefined();
    expect(onStreamFinished).toHaveBeenCalledTimes(1);
    expect(onStreamError).toHaveBeenCalledTimes(0);
  });

  test('error', () => {
    const controller = new LegacyChatMessageController(createExampleInitialChatMessage(), true);

    controller.on('update', onUpdate)
      .on('stream-update', onStreamUpdate)
      .on('stream-error', onStreamError)
      .on('stream-finished', onStreamFinished);

    controller.applyError('error');

    expect(controller.ongoing!.finished).toBe(true);
    expect(controller.message.error).toBe('error');

    expect(onStreamFinished).toHaveBeenCalledTimes(0);
    expect(onStreamError).toHaveBeenCalledTimes(1);
  });
});
