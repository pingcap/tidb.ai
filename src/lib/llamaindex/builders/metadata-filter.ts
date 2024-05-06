import {MetadataFilterConfig} from "@/lib/llamaindex/config/metadata-filter";
import {
  MetadataPostFilter
} from "@/lib/llamaindex/postprocessors/postfilters/MetadataPostFilter";
import {ServiceContext} from 'llamaindex';

export function buildMetadataFilter (serviceContext: ServiceContext, { provider, options }: MetadataFilterConfig) {
    switch (provider) {
      case 'default':
        return new MetadataPostFilter({
          ...options,
          serviceContext,
        });
      default:
        throw new Error(`Unknown metadata filter provider: ${provider}`)
    }
}
