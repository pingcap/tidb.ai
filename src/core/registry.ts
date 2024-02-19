import { rag } from '@/core/interface';

export type ExtractOptions<T> = T extends rag.Base<infer O extends object> ? O : never;

export interface ExtensionConstructor<Type> extends rag.BaseMeta<ExtractOptions<Type>> {
  new (options: ExtractOptions<Type>): Type;
}

export type ExtensionInfo = rag.BaseMeta<any> | ExtensionConstructor<any>
export type LazyExtensionInfo = () => Promise<{ default: ExtensionInfo }>

function constructComponent<C extends ExtensionConstructor<InstanceType<C>>> (ctor: C, options: any) {
  return new ctor(ctor.optionsSchema.parse(options));
}

export class RagExtensionsRegistry {
  private unresolved: LazyExtensionInfo[] = [];
  private registry: Map<string, ExtensionInfo> = new Map();

  private _register (component: ExtensionInfo) {
    this.registry.set(component.identifier, component);
  }

  async prepareAll () {
    if (this.unresolved.length === 0) {
      return;
    }
    let n = 0;
    try {
      for (let lazy of this.unresolved) {
        this._register((await lazy()).default);
        n++;
      }
    } finally {
      this.unresolved.splice(0, n);
    }
  }

  register (info: LazyExtensionInfo) {
    this.unresolved.push(info);
  }

  async create (identifier: string, options: unknown) {
    await this.prepareAll();

    return this._create(identifier, options);
  }

  _create (identifier: string, options: unknown) {
    const ctor = this.registry.get(identifier);
    if (!ctor) {
      throw new Error(`Unknown ${identifier}`);
    }

    if (typeof ctor === 'function') {
      return constructComponent(ctor, options);
    }

    throw new Error(`Cannot construct ${identifier}`);
  }

  async createAll (options: any = {}) {
    await this.prepareAll();
    return this._createAll(options);
  }

  _createAll (options: any = {}) {
    return Array.from(this.registry.keys()).map(identifier => this._create(identifier, options[identifier] ?? {}));
  }

  async list () {
    await this.prepareAll();
    return Promise.all(Array.from(this.registry.keys()).map(id => this.getDef(id)!));
  }

  async getComponent (identifier: string) {
    await this.prepareAll();
    return this.registry.get(identifier);
  }

  async getDef (identifier: string) {
    await this.prepareAll();

    const component = this.registry.get(identifier);
    if (component) {
      return {
        identifier: component.identifier,
        displayName: component.displayName,
      };
    }
  }
}
