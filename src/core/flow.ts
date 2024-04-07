import { rag } from '@/core/interface';

export namespace Flow {
  export interface ExtensionApi {
  }

  export interface IExtension<Options extends any[]> {
    name: string;
    version: string;

    prepare? (...options: Options): void;

    load (api: ExtensionApi, ...options: Options): void;
  }
}

type ExtensionInfo<Options extends any[]> = [Flow.IExtension<Options>, ...Options]

export class Flow implements Flow.ExtensionApi {
  private maps = {
    [rag.ExtensionType.DocumentStorage]: new Map(),
    [rag.ExtensionType.ChatModel]: new Map(),
    [rag.ExtensionType.ContentChunkMetadataExtractor]: new Map(),
    [rag.ExtensionType.ContentMetadataExtractor]: new Map(),
    [rag.ExtensionType.Loader]: new Map(),
    [rag.ExtensionType.ImportSourceTaskProcessor]: new Map(),
    [rag.ExtensionType.Embeddings]: new Map(),
    [rag.ExtensionType.Reranker]: new Map(),
  } satisfies { [Tp in keyof rag.ExtensionTypesMap]: Map<string, InstanceType<rag.ExtensionTypesMap[Tp]>> };

  constructor () {
  }

  private extensions: ExtensionInfo<any>[] = [];

  add (base: rag.Base<any>) {
    const map = this.maps[base.type];
    if (map.has(base.identifier)) {
      throw new Error(`${base.type} '${base.identifier}' has already been registered.`);
    }

    map.set(base.identifier, base);
  }

  list<T extends rag.ExtensionType> (type: T): InstanceType<rag.ExtensionTypesMap[T]>[] {
    return Array.from(this.maps[type].values());
  }

  listMeta (type: rag.ExtensionType) {
    return this.list(type).map(item => ({ identifier: item.identifier, displayName: item.displayName }));
  }

  get<T extends rag.ExtensionType> (type: T, identifier?: string) {
    const extensions = this.maps[type];
    let extension: InstanceType<rag.ExtensionTypesMap[T]> | undefined;
    if (!identifier) {
      extension = Array.from(extensions.values())[0];
    } else {
      extension = extensions.get(identifier) ?? extensions.get(`${type}.${identifier}`);
    }

    return extension;
  }

  getRequired<T extends rag.ExtensionType> (type: T, identifier?: string) {
    const extension = this.get(type, identifier);
    if (!extension) {
      throw new Error(`No available reranker.`);
    }

    return extension;
  }

  findFirst<T extends rag.ExtensionType> (type: T, filter: (v: InstanceType<rag.ExtensionTypesMap[T]>) => boolean) {
    return this.list(type).filter(filter)[0];
  }

  resolve () {
    const loadedExtensions: ExtensionInfo<any>[] = [];
    while (this.extensions.length > 0) {
      const currentExtensions = [...this.extensions];
      this.extensions = [];
      for (let info of currentExtensions) {
        const [ext, ...options] = info;
        ext.prepare?.(...options);
        loadedExtensions.push(info);
      }
    }
    for (let [ext, ...options] of loadedExtensions) {
      ext.load(this, options);
      console.info(`[app] loading extension ${ext.name} ${ext.version}`);
    }
  }

  getStorage (identifier?: string): rag.DocumentStorage<any> {
    if (identifier) {
      const storage = this.getRequired(rag.ExtensionType.DocumentStorage, identifier);

      if (!storage?.available()) {
        throw new Error(`Document storage ${identifier} not available.`);
      }

      return storage;
    }
    const storage = this.findFirst(rag.ExtensionType.DocumentStorage, storage => storage.available());

    if (!storage) {
      throw new Error('No available document storage.');
    }
    return storage;
  }

  getLoader (mime: string, uri: string) {
    const loader = this.findFirst(rag.ExtensionType.Loader, loader => loader.support(mime, uri));
    if (loader) {
      return loader;
    }
    throw new Error(`No available document loader for mime type ${mime}.`);
  }

  getImportSourceTaskProcessor (type: string, url: string): rag.ImportSourceTaskProcessor<any> {
    const processor = this.findFirst(rag.ExtensionType.ImportSourceTaskProcessor, processor => processor.support(type, url));
    if (processor) {
      return processor;
    }
    throw new Error(`No available ImportSourceTaskProcessor for task type ${type}.`);
  }

  getReranker (identifier?: string): rag.Reranker<any> {
    return this.getRequired(rag.ExtensionType.Reranker, identifier);
  }
}
