import {Liquid} from "liquidjs";
import {buildToolsText, SimplePrompt} from "llamaindex";

export class PromptParser {
  private liquid = new Liquid();

  constructor() {
    this.liquid.registerFilter('buildToolsText', buildToolsText);
  }

  getPrompt<Tmpl extends SimplePrompt> (template: string | undefined, fallback: Tmpl, partialContext?: Record<string, any>): (ctx: Parameters<Tmpl>[0]) => string {
    if (!template) return fallback;
    const tmpl = this.liquid.parse(template);
    return context => this.liquid.renderSync(tmpl, {
      ...partialContext ?? {},
      ...context
    });
  }

}

export const promptParser = new PromptParser();