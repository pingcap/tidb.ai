import { Flow } from '@/core';
import type { RagExtensionsRegistry } from '@/core/registry2';

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
  export type Prompting = BaseComponentConfig;
}

interface IndexFlowConfig {
  documentStorage: IndexFlowConfig.DocumentStorage[];
  loaders: IndexFlowConfig.Loader[];
  splitters: IndexFlowConfig.Splitter[];
  embeddings: IndexFlowConfig.Embeddings[];
  chatModels: IndexFlowConfig.ChatModel[];
  promptings: IndexFlowConfig.Prompting[];
}

export async function getFlow (registry: RagExtensionsRegistry, config?: IndexFlowConfig, options?: any) {
  await registry.prepareAll();
  const flow = new Flow();

  function add (component: IndexFlowConfig.BaseComponentConfig) {
    if (typeof component === 'string') {
      flow.add(registry._create(component, {}));
    } else {
      flow.add(registry._create(component.identifier, component.options));
    }
  }

  if (config) {
    config.documentStorage.forEach(add);
    config.loaders.forEach(add);
    config.splitters.forEach(add);
    config.embeddings.forEach(add);
    config.chatModels.forEach(add);
    config.promptings.forEach(add);
  } else {
    registry._createAll(options).forEach(comp => flow.add(comp));
  }

  flow.resolve();

  return flow;
}
