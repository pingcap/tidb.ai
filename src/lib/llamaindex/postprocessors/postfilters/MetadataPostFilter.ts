import {BaseNodePostprocessor, NodeWithScore, ServiceContext, serviceContextFromDefaults} from "llamaindex";
import {DateTime} from "luxon";
import z from "zod";

export const metadataFilterSchema = z.object({
  name: z.string(),
  // TBD
  // op: z.string().optional(),
  value: z.any(),
  optional: z.boolean().optional()
});

export type MetadataFieldFilter = z.infer<typeof metadataFilterSchema>;

export const metadataFieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  enums: z.array(z.string()).optional(),
  default: z.string(),
  choicePrompt: z.string().optional(),
});

export type MetadataField = z.infer<typeof metadataFieldSchema>;

export const defaultMetadataFilterChoicePrompt = ({
  metadataFields,
  query
}: {
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
  serviceContext: ServiceContext = serviceContextFromDefaults();
  metadataFilterChoicePrompt: MetadataFilterChoicePrompt = defaultMetadataFilterChoicePrompt;

  /**
   * The definition of metadata fields.
   */
  metadata_fields: MetadataField[] = [];
  /**
   * Provide the filters to apply to the search.
   */
  filters: MetadataFieldFilter[] | null = null;

  constructor(init?: MetadataPostFilterOptions) {
    Object.assign(this, init);
  }

  async postprocessNodes(nodes: NodeWithScore[], query: string): Promise<NodeWithScore[]> {
    let filters;
    if (this.filters) {
      filters = this.filters;
      console.info('Apply provided filters:', filters);
    } else {
      const start = DateTime.now();
      filters = await this.generateFilters(query);
      const end = DateTime.now();
      console.info('Generate filters took:', end.diff(start).as('seconds'), 's');
      console.info('Apply generated filters:', filters);
    }

    console.log('Nodes before filter:', nodes.length, 'nodes');
    let filteredNodes = await this.filterNodes(nodes, filters);
    console.log('Nodes after filter:', filteredNodes.length, 'nodes');

    if (filteredNodes.length === 0) {
      console.warn('No nodes left after filtering, fallback to using all nodes.');
      return nodes;
    }

    return filteredNodes;
  }

  async generateFilters(query: string): Promise<MetadataFieldFilter[]> {
    try {
      const llm = this.serviceContext.llm;
      const prompt = this.metadataFilterChoicePrompt({
        metadataFields: this.metadata_fields,
        query
      });
      console.info('Generate filters using prompt:', prompt)
      const raw = await llm.chat({
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
