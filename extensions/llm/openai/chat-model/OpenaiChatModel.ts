import { rag } from '@/core/interface';
import { getOptionalEnv } from '@/lib/env';
import { type AIStreamCallbacksAndOptions, OpenAIStream } from 'ai';
import { OpenAI } from 'openai';
import openaiChatModelMeta, { type OpenaiChatModelOptions } from './meta';

export default class OpenaiChatModel extends rag.ChatModel<OpenaiChatModelOptions> {
  private readonly agent: OpenAI;

  constructor (options: OpenaiChatModelOptions) {
    super(options);
    this.agent = new OpenAI({
      apiKey: options.apiKey ?? getOptionalEnv('OPENAI_API_KEY'),
    });
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

Object.assign(OpenaiChatModel, openaiChatModelMeta);
