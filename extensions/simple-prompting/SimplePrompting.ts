import { rag } from '@/core/interface';

import { Liquid, type Template } from 'liquidjs';
import simplePromptingMeta, { type SimplePromptingOptions } from './meta';
import defaultTemplate from './template.liquid';

export default class SimplePrompting extends rag.Prompting<SimplePromptingOptions> {
  private readonly liquid = new Liquid();
  private readonly tmpl: Template[];

  constructor (options: SimplePromptingOptions) {
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
      metadata: {},
    };
  }
}

Object.assign(SimplePrompting, simplePromptingMeta);
