import { Flow } from '@/core';
import type { RagExtensionsRegistry } from '@/core/registry';

namespace IndexFlowConfig {
  export type BaseComponentConfig = string | {
    identifier: string
    options: unknown
  }

  export type Loader = BaseComponentConfig;
  export type DocumentStorage = BaseComponentConfig
}

interface IndexFlowConfig {
  documentStorage: IndexFlowConfig.DocumentStorage[];
  loaders: IndexFlowConfig.Loader[];
}

/**
 *
 * @param registry See RagExtensionsRegistry
 * @param config deprecated
 * @param options Index config from db
 */
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
  } else {
    registry._createAll(options).forEach(comp => flow.add(comp));
  }

  flow.resolve();

  return flow;
}
