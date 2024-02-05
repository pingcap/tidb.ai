import { rag } from '@/core/interface';

import { Liquid, type Template } from 'liquidjs';
import { z } from 'zod';


export class DirectPrompting extends rag.Prompting<DirectPrompting.Options> {
  public static readonly identifier = 'rag.prompting.direct';
  public static readonly displayName = 'Direct prompting';

  private readonly liquid = new Liquid();
  private readonly tmpl: Template[];

  constructor (options: DirectPrompting.Options) {
    super(options);
    this.tmpl = this.liquid.parse(options.template ?? defaultTemplate);
  }

  async refine (ctx: rag.PromptingContext, query: string) {
    const { id, top: result } = await ctx.retriever(query, this.options.top_k ?? 5);

    const content = await this.liquid.render(this.tmpl, { contexts: result });

    return {
      queryId: id,
      context: result,
      messages: [{
        role: 'system',
        content: content,
      } as const],
    };
  }
}

export namespace DirectPrompting {
  export const optionsSchema = z.object({
    template: z.string().optional().default(() => defaultTemplate),
    top_k: z.number().optional().default(() => 5),
  });

  export type Options = {
    template?: string
    top_k?: number
  }
}

const defaultTemplate = `Use the following pieces of context to answer the user question. This context retrieved from a knowledge base and you should use only the facts from the context to answer.
Your answer must be based on the context. If the context not contain the answer, just say that 'I don't know', don't try to make up an answer, use the context.

<contexts>
{%- for context in contexts %}
  <context source_uri="{{context.source_uri}}" name="{{context.source_name}}">
    <name>{{context.source_name}}</name>
    <source_uri>{{context.source_uri}}</source_uri>
    <content>{{context.text_content}}</content>
  </context>
{%- endfor %}
</contexts>

Your answer must be based on the context, don't use your own knowledge. 

Use markdown to answer. Write down uri reference you used for answer the question.
`;
