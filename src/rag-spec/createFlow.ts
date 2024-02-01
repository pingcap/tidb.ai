import { Flow } from '@/core';
import type { RagComponentRegistry } from '@/core/registry';

namespace IndexFlowConfig {
  export type BaseComponentConfig = string | {
    identifier: string
    options: unknown
  }

  export type Loader = BaseComponentConfig;
  export type Splitter = BaseComponentConfig
  export type Embeddings = BaseComponentConfig
  export type DocumentStorage = BaseComponentConfig
  export type ChatModel = BaseComponentConfig
}

interface IndexFlowConfig {
  documentStorage: IndexFlowConfig.DocumentStorage[];
  loaders: IndexFlowConfig.Loader[];
  splitters: IndexFlowConfig.Splitter[];
  embeddings: IndexFlowConfig.Embeddings[];
  chatModels: IndexFlowConfig.ChatModel[];
}

export function getFlow (registry: RagComponentRegistry, config?: IndexFlowConfig, options?: any) {
  const flow = new Flow();

  function add (component: IndexFlowConfig.BaseComponentConfig) {
    if (typeof component === 'string') {
      flow.add(registry.create(component, {}));
    } else {
      flow.add(registry.create(component.identifier, component.options));
    }
  }

  if (config) {
    config.documentStorage.forEach(add);
    config.loaders.forEach(add);
    config.splitters.forEach(add);
    config.embeddings.forEach(add);
    config.chatModels.forEach(add);
  } else {
    registry.createAll(options).forEach(comp => flow.add(comp));
  }

  flow.resolve();

  return flow;
}
