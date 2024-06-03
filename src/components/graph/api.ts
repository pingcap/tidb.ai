export type Entity = {
  id: number | string
  name: string
  description: string
  meta: any
  created_at: string
  updated_at: string
  entity_type: string
}

export type Relationship = {
  id: number | string
  source: number | string
  target: number | string
  meta: any
  /**
   * @deprecated
   */
  relationship_desc?: string
  description: string
  weight: number
}

interface ServerEntity extends Entity {
}

interface ServerRelationship extends Omit<Relationship, 'source' | 'target'> {
  source_entity_id: number;
  target_entity_id: number;
}

export type ServerGraphData = {
  entities: ServerEntity[];
  relationships: ServerRelationship[];
}

export type GraphData = {
  entities: Entity[]
  relationships: Relationship[]
  chunks?: unknown[]
}

export const EMPTY_GRAPH: GraphData = {
  entities: [],
  relationships: [],
};

export async function editEntity (id: any, data: any): Promise<Entity> {
  return await fetch(`/api/v1/indexes/graph/entities/${encodeURIComponent(id)}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse);
}

export async function editRelationship (id: any, data: any): Promise<Relationship> {
  return await fetch(`/api/v1/indexes/graph/relationships/${encodeURIComponent(id)}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse);
}

export async function getEntity (id: any): Promise<Entity> {
  return await fetch(`/api/v1/indexes/graph/entities/${encodeURIComponent(id)}`, {})
    .then(handleResponse);
}

export async function getRelationship (id: any): Promise<Relationship> {
  return await fetch(`/api/v1/indexes/graph/relationships/${encodeURIComponent(id)}`, {})
    .then(handleResponse)
    .then((relationship: Relationship) => {
      if (relationship.relationship_desc && !relationship.description) {
        relationship.description = relationship.relationship_desc;
      }
      delete relationship.relationship_desc;
      return relationship;
    });
}

const handleResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const handleServerGraph = <T extends {}> ({ entities, relationships, ...rest }: ServerGraphData & T): GraphData & T => {
  return {
    ...rest,
    relationships: relationships.map(({ source_entity_id, target_entity_id, ...rest }) => ({
      ...rest,
      source: source_entity_id,
      target: target_entity_id,
    })),
    entities,
  } as never;
};
