import { rag } from '@/core/interface';

import { Liquid, type Template } from 'liquidjs';
import ctxTemplate from './contextualTemplate.liquid';
import earTemplate from './extract-and-refine-question.liquid';
import refinedPromptingMeta, { type RefinedPromptingOptions } from './meta';
import nonCtxTemplate from './nonContextualTemplate.liquid';
import {DateTime} from "luxon";

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
    // Extract and refine the question from the user message.
    console.log('Start refining prompt.');

    const extractAndRefinePrompt = await this.liquid.render(this.earTmpl, {
      candidateNamespaces: ctx.candidateNamespaces.map(namespace => {
        return { name: namespace.name, description: namespace.description };
      })
    });
    const start = DateTime.now();
    const response = await ctx.model.chat([
      { role: 'assistant', content: extractAndRefinePrompt },
      { role: 'user', content: query },
    ]);
    const end = DateTime.now();
    const costTime = end.diff(start, 'milliseconds').milliseconds;
    const { containsQuestion, question, recommendNamespaces = [] } = JSON.parse(response.content);

    console.log('Finished refining prompt (containsQuestion:', containsQuestion, 'recommendNamespaces:', recommendNamespaces, 'costTime:', costTime, 'ms).');

    // If the user message contains a question, refine the question and retrieve the contexts.
    if (containsQuestion && question) {
      const namespaces = namespaceSelector(ctx.specifyNamespaces, ctx.defaultNamespaces, recommendNamespaces);
      const { id, top: result } = await ctx.retriever(question, this.options.top_k ?? 5, namespaces);
      const content = await this.liquid.render(this.ctxTmpl, { contexts: result });

      return {
        queryId: id,
        context: result,
        messages: [
          {
            role: 'system',
            content: content,
          } as const
        ],
        metadata: {
          refinedQuestion: question,
          namespaces
        },
      };
    } else {
      // FIXME: Why we need non-contextual implementation?
      const content = await this.liquid.render(this.nonCtxTmpl, {});

      return {
        messages: [
          {
            role: 'system',
            content: content,
          } as const
        ],
        metadata: {},
      };
    }
  }
}

/**
 * Determine the namespaces to be used for the retrieval.
 *
 * @param specifyNamespaces The namespaces specified by the user.
 * @param recommendNamespaces The namespaces recommended by the model.
 * @param defaultNamespaces The default namespaces, which are used by default.
 */
function namespaceSelector(specifyNamespaces: string[], defaultNamespaces: string[], recommendNamespaces: string[]) {
  if (specifyNamespaces && specifyNamespaces.length > 0) {
    console.log('Using specified namespaces:', specifyNamespaces);
    return specifyNamespaces;
  } else if (recommendNamespaces && recommendNamespaces.length > 0) {
    console.log('Using recommend namespaces:', recommendNamespaces);
    return recommendNamespaces;
  } else {
    console.log('Using default namespaces:', defaultNamespaces);
    return defaultNamespaces;
  }
}

Object.assign(RefinedPrompting, refinedPromptingMeta);
