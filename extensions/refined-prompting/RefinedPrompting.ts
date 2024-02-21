import { rag } from '@/core/interface';

import { Liquid, type Template } from 'liquidjs';
import ctxTemplate from './contextualTemplate.liquid';
import nonCtxTemplate from './nonContextualTemplate.liquid';
import earTemplate from './extract-and-refine-question.liquid';
import refinedPromptingMeta, { type RefinedPromptingOptions } from './meta';

export default class RefinedPrompting extends rag.Prompting<RefinedPromptingOptions> {
  private readonly liquid = new Liquid();
  private readonly earTmpl: Template[];
  private readonly ctxTmpl: Template[];
  private readonly nonCtxTmpl: Template[];

  constructor (options: RefinedPromptingOptions) {
    super(options);
    this.earTmpl = this.liquid.parse(options.extractAndRefineTemplate ?? earTemplate);
    this.ctxTmpl = this.liquid.parse(options.contextTemplate ?? ctxTemplate);
    this.nonCtxTmpl = this.liquid.parse(options.contextTemplate ?? nonCtxTemplate);
  }

  async refine (ctx: rag.PromptingContext, query: string) {
    const response = await ctx.model.chat([
      { role: 'assistant', content: await this.liquid.render(this.earTmpl, {}) },
      { role: 'user', content: query },
    ]);

    const { containsQuestion, question } = JSON.parse(response.content);

    if (containsQuestion && question) {
      const { id, top: result } = await ctx.retriever(question, this.options.top_k ?? 5);

      const content = await this.liquid.render(this.ctxTmpl, { contexts: result });

      return {
        queryId: id,
        context: result,
        messages: [{
          role: 'system',
          content: content,
        } as const],
      };
    } else {
      const content = await this.liquid.render(this.nonCtxTmpl, { });

      return {
        messages: [{
          role: 'system',
          content: content,
        } as const],
      };
    }
  }
}

Object.assign(RefinedPrompting, refinedPromptingMeta);
