import {MetadataField, MetadataFieldFilter} from "@/lib/llamaindex/config/metadata-filter";
import {BaseNodePostprocessor, NodeWithScore, ServiceContext, serviceContextFromDefaults} from "llamaindex";
import {BaseLLM} from "llamaindex/llm/base";
import {DateTime} from "luxon";

export const defaultMetadataFilterChoicePrompt = ({metadataFields, query}: {
  metadataFields: MetadataField[],
  query: string
}) => {
  return `Provide the definition of metadata fields and query, please generate the metadata filters to help exclude irrelevant nodes, and output the result in json format:

For example:
<Metadata Fields Definition>
[
  {
    "name": "tidb_version",
    "type": "string",
    "enums": ["stable", "dev", "v7.5"],
    "default": "stable",
    "choicePrompt": "Which version of TiDB are you using?"
  }
]

<Query>
Does TiDB support FK constraints in the stable version?

<Result>
{
    "filters": [
        { "name": "tidb_version", "value": "stable", "optional": false }
    ]
}

-------------
Let's start:

<Metadata Fields Definition>
${JSON.stringify(metadataFields, null, 2)}

<Query>
${query}

<Result>
  `;
}

export type MetadataFilterChoicePrompt = typeof defaultMetadataFilterChoicePrompt;

export type MetadataPostFilterOptions = Partial<MetadataPostFilter>;

export class MetadataPostFilter implements BaseNodePostprocessor {
  serviceContext: ServiceContext;
  /**
   * The llm model used for filters generating.
   */
  llm: BaseLLM;
  /**
   * The prompt for metadata filter choice.
   */
  metadataFilterChoicePrompt: MetadataFilterChoicePrompt;
  /**
   * The definition of metadata fields.
   */
  metadata_fields: MetadataField[];
  /**
   * Provide the filters to apply to the search.
   */
  filters: MetadataFieldFilter[] | null;

  constructor(init?: MetadataPostFilterOptions) {
    this.serviceContext = init?.serviceContext ?? serviceContextFromDefaults();
    this.llm = init?.llm ?? this.serviceContext.llm;
    this.metadata_fields = init?.metadata_fields ?? [];
    this.filters = init?.filters ?? null;
    this.metadataFilterChoicePrompt = init?.metadataFilterChoicePrompt || defaultMetadataFilterChoicePrompt;
  }

  async postprocessNodes(nodes: NodeWithScore[], query: string): Promise<NodeWithScore[]> {
    let filters;
    if (this.filters) {
      filters = this.filters;
      console.info('[Metadata Filter] Provided filters: ', filters);
    } else {
      const start = DateTime.now();
      filters = await this.generateFilters(query);
      const duration = DateTime.now().diff(start).as('milliseconds')
      console.info(`[Metadata Filter] Generate filters (took: ${duration} ms): `, filters);
    }

    const filteredNodes = await this.filterNodes(nodes, filters);
    console.log(`[Metadata Filter] Applied provided/generated filter (before: ${nodes.length} nodes, after: ${filteredNodes.length} nodes).`);

    if (filteredNodes.length === 0) {
      console.warn('[Metadata Filter] No nodes left after filtering, fallback to using all nodes.');
      return nodes;
    }

    return filteredNodes;
  }

  async generateFilters(query: string): Promise<MetadataFieldFilter[]> {
    try {
      const prompt = this.metadataFilterChoicePrompt({
        metadataFields: this.metadata_fields,
        query
      });
      const raw = await this.llm.chat({
        messages: [
          {
            role: 'system',
            content: prompt
          }
        ],
        additionalChatOptions: {
          response_format: { "type": "json_object" },
        }
      });
      const result = JSON.parse(raw.message.content as string);
      return result.filters;
    } catch (e) {
      console.warn('Failed to generate filters, fallback to using empty filters:', e);
      return [];
    }
  }

  async filterNodes(nodes: NodeWithScore[], filters: MetadataFieldFilter[]) {
    return nodes.filter(n => {
      const metadata = n.node.metadata;

      // If the document metadata is not found, skip the filter.
      if (!metadata) {
        return true;
      }

      return filters.every(filter => {
        // If the document metadata field is not set, skip the filter.
        if (!metadata[filter.name] || !filter.value || filter.value === '') {
          return true;
        }
        return metadata[filter.name] === filter.value;
      });
    });
  }

}