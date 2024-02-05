import { rag } from '@/core/interface';

export namespace Flow {
  export interface ExtensionApi {
    addLoader (loader: rag.Loader<any, any>): void;

    addSplitter (splitter: rag.Splitter<any, any, any>): void;

    addEmbeddings (embeddings: rag.Embeddings<any>): void;

    addDocumentStorage (storage: rag.DocumentStorage<any>): void;

    addImportSourceTaskProcessor (processor: rag.ImportSourceTaskProcessor<any>): void;
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
  constructor () {
  }

  private extensions: ExtensionInfo<any>[] = [];
  private documentStorages = new Map<string, rag.DocumentStorage<any>>();
  private loaders = new Map<string, rag.Loader<any, any>>();
  private splitters = new Map<string, rag.Splitter<any, any, any>>();
  private embeddings = new Map<string, rag.Embeddings<any>>();
  private chatModels = new Map<string, rag.ChatModel<any>>();
  private importSourceTaskProcessor = new Map<string, rag.ImportSourceTaskProcessor<any>>();
  private promptings = new Map<string, rag.Prompting<any>>();

  add (base: rag.Base<any>) {
    if (base instanceof rag.Loader) {
      this.addLoader(base);
    } else if (base instanceof rag.Splitter) {
      this.addSplitter(base);
    } else if (base instanceof rag.Embeddings) {
      this.addEmbeddings(base);
    } else if (base instanceof rag.ChatModel) {
      this.addChatModel(base);
    } else if (base instanceof rag.DocumentStorage) {
      this.addDocumentStorage(base);
    } else if (base instanceof rag.ImportSourceTaskProcessor) {
      this.addImportSourceTaskProcessor(base);
    } else if (base instanceof rag.Prompting) {
      this.addPrompting(base);
    } else {
      throw new Error(`what is ${base.displayName} (${base.identifier})?`);
    }
  }

  addDocumentStorage (storage: rag.DocumentStorage<any>): void {
    if (this.documentStorages.has(storage.identifier)) {
      throw new Error(`document storage identifier '${storage.identifier}' has already been registered.`);
    }
    this.documentStorages.set(storage.identifier, storage);
  }

  addLoader (loader: rag.Loader<any, any>): void {
    if (this.loaders.has(loader.identifier)) {
      throw new Error(`Loader identifier '${loader.identifier}' has already been registered.`);
    }
    this.loaders.set(loader.identifier, loader);
  }

  addSplitter (splitter: rag.Splitter<any, any, any>): void {
    if (this.splitters.has(splitter.identifier)) {
      throw new Error(`Splitter identifier '${splitter.identifier}' has already been registered.`);
    }
    this.splitters.set(splitter.identifier, splitter);
  }

  addEmbeddings (embeddings: rag.Embeddings<any>): void {
    if (this.embeddings.has(embeddings.identifier)) {
      throw new Error(`Embedding identifier '${embeddings.identifier}' has already been registered.`);
    }
    this.embeddings.set(embeddings.identifier, embeddings);
  }

  addChatModel (chatModel: rag.ChatModel<any>): void {
    if (this.chatModels.has(chatModel.identifier)) {
      throw new Error(`Chat model identifier '${chatModel.identifier}' has already been registered.`);
    }
    this.chatModels.set(chatModel.identifier, chatModel);
  }

  addImportSourceTaskProcessor (processor: rag.ImportSourceTaskProcessor<any>) {
    if (this.importSourceTaskProcessor.has(processor.identifier)) {
      throw new Error(`Import source task processor identifier '${processor.identifier}' has already been registered.`);
    }
    this.importSourceTaskProcessor.set(processor.identifier, processor);
  }

  addPrompting (prompting: rag.Prompting<any>) {
    if (this.promptings.has(prompting.identifier)) {
      throw new Error(`Prompting identifier '${prompting.identifier}' has already been registered.`);
    }
    this.promptings.set(prompting.identifier, prompting);
  }

  addExtension<Options extends any[]> (extension: Flow.IExtension<Options>, ...options: Options) {
    this.extensions.push([extension, ...options]);
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

  listLoaders () {
    return Array.from(this.loaders.values()).map(({ displayName, identifier }) => {
      return { displayName, identifier };
    });
  }

  listSplitters () {
    return Array.from(this.splitters.values()).map(({ displayName, identifier }) => {
      return { displayName, identifier };
    });
  }

  listEmbeddings () {
    return Array.from(this.embeddings.values()).map(({ displayName, identifier }) => {
      return { displayName, identifier };
    });
  }

  getStorage (identifier?: string): rag.DocumentStorage<any> {
    if (identifier) {
      const storage = this.documentStorages.get(identifier);

      if (!storage?.available()) {
        throw new Error(`No document storage ${identifier} not available.`);
      }

      return storage;
    }
    for (let storage of Array.from(this.documentStorages.values())) {
      if (storage.available()) {
        return storage;
      }
    }

    throw new Error('No available document storage.');
  }

  getLoader (mime: string, uri: string) {
    for (let loader of Array.from(this.loaders.values())) {
      if (loader.support(mime, uri)) {
        return loader;
      }
    }
    throw new Error(`No available document loader for mime type ${mime}.`);
  }

  getSplitter (content: rag.Content<any>) {
    for (let splitter of Array.from(this.splitters.values())) {
      if (splitter.support(content)) {
        return splitter;
      }
    }
    throw new Error('No available document loader.');
  }

  getEmbeddings (name: string): rag.Embeddings<any> {
    const embeddings = this.embeddings.get(name) ?? this.embeddings.get(`rag.embeddings.${name}`);
    if (!embeddings) {
      throw new Error(`Embedding ${name} not found`);
    }

    return embeddings;
  }

  getChatModel (name: string): rag.ChatModel<any> {
    const chatModel = this.chatModels.get(name) ?? this.chatModels.get(`rag.chat-model.${name}`);
    if (!chatModel) {
      throw new Error(`Chat model ${name} not found`);
    }

    return chatModel;
  }

  getImportSourceTaskProcessor (type: string, url: string): rag.ImportSourceTaskProcessor<any> {
    for (let processor of Array.from(this.importSourceTaskProcessor.values())) {
      if (processor.support(type, url)) {
        return processor;
      }
    }
    throw new Error(`No available ImportSourceTaskProcessor for task type ${type}.`);
  }

  getPrompting (identifier?: string): rag.Prompting<any> {
    let prompting: rag.Prompting<any> | undefined;
    if (!identifier) {
      prompting = Array.from(this.promptings.values())[0];
    } else {
      prompting = this.promptings.get(identifier);
    }

    if (!prompting) {
      throw new Error(`No available prompting.`);
    }

    return prompting;
  }
}
