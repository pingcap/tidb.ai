import {buildLLM} from "@/lib/llamaindex/builders/llm";
import {MetadataFilterConfig} from "@/lib/llamaindex/config/metadata-filter";
import {
  MetadataPostFilter
} from "@/lib/llamaindex/postprocessors/postfilters/MetadataPostFilter";
import {ServiceContext} from 'llamaindex';

export function buildMetadataFilter (serviceContext: ServiceContext, config: MetadataFilterConfig) {
    switch (config.provider) {
      case 'default':
        let llm = serviceContext.llm;
        if (config.options?.llm) {
          llm = buildLLM(config.options.llm);
        }
        return new MetadataPostFilter({
          llm,
          metadata_fields: config.options?.metadata_fields,
          filters: config.options?.filters
        });
      default:
        throw new Error(`Unknown metadata filter provider: ${config.provider}`)
    }
}
