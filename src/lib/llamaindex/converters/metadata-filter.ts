import type {AppRetrieveServiceOptions} from "@/core/services/retrieving";
import {MetadataPostFilter} from "@/lib/llamaindex/postprocessors/postfilters/MetadataPostFilter";
import {ServiceContext} from 'llamaindex';

type MetadataFilterConfig = NonNullable<AppRetrieveServiceOptions['metadata_filter']>['config'];

export function getMetadataFilter (serviceContext: ServiceContext, provider: string, config: MetadataFilterConfig) {
    switch (provider) {
      case 'default':
        return new MetadataPostFilter({
          serviceContext,
          ...config
        });
      default:
        throw new Error(`Unknown post filter provider: ${provider}`)
    }
}
