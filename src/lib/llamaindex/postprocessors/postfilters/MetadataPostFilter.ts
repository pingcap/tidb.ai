import {BaseNodePostprocessor, NodeWithScore, ServiceContext, serviceContextFromDefaults} from "llamaindex";

export interface MetadataField {
  name: string;
  type: string;
  enums?: string[];
  default: string;
  choicePrompt?: string;
}

export const defaultMetadataFilterChoicePrompt = ({
  metadataFields,
  query
}: {
  metadataFields: MetadataField[],
  query: string
}) => {
  return `Provide the definition of metadata fields and query, please generate 
the Filter object array in JSON format, the Filter object has two fields: name, value, optional (boolean).

<Metadata Fields Definition>
${JSON.stringify(metadataFields, null, 2)}

<Query>
${query}

<Filters>
  `;
}

export interface MetadataFiledFilter {
  name: string;
  value: any;
  optional: boolean;
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

  constructor(init?: MetadataPostFilterOptions) {
    Object.assign(this, init);
  }

  async postprocessNodes(nodes: NodeWithScore[], query: string): Promise<NodeWithScore[]> {
    const filters = await this.generateFilters(query);
    console.info('Apply filters:', filters);

    console.log('Nodes before filter:', nodes.length, 'nodes');
    let filteredNodes = await this.filterNodes(nodes, filters);
    console.log('Nodes after filter:', filteredNodes.length, 'nodes');

    if (filteredNodes.length === 0) {
      const requiredFilters = filters.filter(f => !f.optional);
      console.info('No nodes left after filtering, fallback to filtering with required filters.', {
        requiredFilters
      });
      filteredNodes = await this.filterNodes(nodes, requiredFilters);
      console.log('Nodes after filtering with required filters:', filteredNodes.length, 'nodes');
    }

    return filteredNodes;
  }

  async generateFilters(query: string): Promise<MetadataFiledFilter[]> {
    try {
      const llm = this.serviceContext.llm;
      const prompt = this.metadataFilterChoicePrompt({
        metadataFields: this.metadata_fields,
        query
      });
      const raw = await llm.complete({
        prompt
      });
      return JSON.parse(raw.text);
    } catch (e) {
      console.warn('Failed to generate filters, fallback to using empty filters:', e);
      return [];
    }
  }

  async filterNodes(nodes: NodeWithScore[], filters: MetadataFiledFilter[]) {
    return nodes.filter(n => {
      const metadata = n.node.metadata;

      // If the document metadata is not found, skip the filter.
      if (!metadata) {
        return true;
      }

      return filters.every(filter => {
        // If the document metadata field is not set, skip the filter.
        if (!metadata[filter.name]) {
          return true;
        }
        return metadata[filter.name] === filter.value;
      });
    });
  }

}
