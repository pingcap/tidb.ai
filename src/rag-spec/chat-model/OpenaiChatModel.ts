import { rag } from '@/core/interface';
import { env } from '@/lib/zod-extensions';
import { type AIStreamCallbacksAndOptions, OpenAIStream } from 'ai';
import { type ClientOptions, OpenAI } from 'openai';
import { z } from 'zod';

export class OpenaiChatModel extends rag.ChatModel<OpenaiChatModel.Options> {
  static identifier = 'rag.chat-model.openai';
  static displayName = 'OpenAI Chat';
  static readonly optionsSchema = z.object({
    apiKey: env('OPENAI_API_KEY'),
    model: z.string().default('gpt-3.5-turbo'),
  });

  private readonly agent: OpenAI;

  constructor (options: OpenaiChatModel.Options) {
    super(options);
    this.agent = new OpenAI(options);
  }

  async chat (history: rag.ChatMessage[]): Promise<rag.ChatMessage> {
    return await this.agent.chat.completions
      .create({
        stream: false,
        model: this.options.model ?? 'gpt-3.5-turbo',
        messages: history.map(message => ({
          role: message.role,
          content: message.content,
        })),
        n: 1,
      })
      .then(({ choices }) => {
        const { role, content } = choices[0].message;
        return {
          role,
          content: content || '',
        };
      });
  }

  async chatStream (history: rag.ChatMessage[], callbacks: AIStreamCallbacksAndOptions) {
    const response = await this.agent.chat.completions
      .create({
        stream: true,
        model: this.options.model ?? 'gpt-3.5-turbo',
        messages: history.map(message => ({
          role: message.role,
          content: message.content,
        })),
        n: 1,
      });

    return OpenAIStream(response, callbacks);
  }
}

export namespace OpenaiChatModel {
  export interface Options extends ClientOptions {
    model?: string;
  }
}
