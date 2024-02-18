import { rag } from '@/core/interface';
import { z } from 'zod';

export type ExtractOptions<T> = T extends rag.Base<infer O> ? O : never;

export interface ComponentConstructor<Type> {
  new (options: ExtractOptions<Type>): Type;

  optionsSchema: z.ZodType<ExtractOptions<Type>>;
  identifier: string;
  displayName: string;
}

function constructComponent<C extends ComponentConstructor<InstanceType<C>>> (ctor: C, options: any) {
  return new ctor(ctor.optionsSchema.parse(options));
}

export class RagComponentRegistry {
  private registry: Map<string, ComponentConstructor<any>> = new Map();

  register<C extends ComponentConstructor<InstanceType<C>>> (component: C) {
    this.registry.set(component.identifier, component);
  }

  create (identifier: string, options: unknown) {
    const ctor = this.registry.get(identifier);
    if (!ctor) {
      throw new Error(`Unknown ${identifier}`);
    }

    return constructComponent(ctor, options);
  }

  createAll (options: any = {}) {
    return Array.from(this.registry.keys()).map(identifier => this.create(identifier, options[identifier] ?? {}));
  }

  list () {
    return Array.from(this.registry.keys()).map(id => this.getDef(id)!);
  }

  getComponent (identifier: string) {
    return this.registry.get(identifier);
  }

  getDef (identifier: string) {
    const component = this.registry.get(identifier);
    if (component) {
      return {
        identifier: component.identifier,
        displayName: component.displayName,
      };
    }
  }
}

