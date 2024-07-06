import EventEmitter from 'eventemitter3';

export type IdType = string | number;

export interface NetworkNode {
  id: IdType;
}

export interface NetworkLink {
  id: IdType;
  source: IdType;
  target: IdType;
}

export interface BaseNetworkOptions {
  noDirection: boolean;
}

export interface ReadonlyNetwork<Node extends NetworkNode, Link extends NetworkLink> extends EventEmitter<NetworkEvents>{
  node (id: IdType): Node | undefined;

  link (id: IdType): Link | undefined;

  nodes (): Node[];

  links (): Link[];

  nodeNeighborhoods (id: IdType): Set<IdType> | null;
}

export interface Network<Node extends NetworkNode, Link extends NetworkLink> extends ReadonlyNetwork<any, any> {
  addNode (node: Node): void;

  removeNode (nodeId: IdType): void;

  addLink (link: Link): void;

  removeLink (linkId: IdType): void;
}

export interface NetworkEvents {
  'update:node': [id: IdType];
  'update:link': [id: IdType];
}

export abstract class BaseNetworkView<Node extends NetworkNode, Link extends NetworkLink> extends EventEmitter<NetworkEvents> implements ReadonlyNetwork<Node, Link> {
  abstract link (id: IdType): Link | undefined

  abstract links (): Link[]

  abstract node (id: IdType): Node | undefined

  abstract nodes (): Node[]

  abstract nodeNeighborhoods (id: IdType): Set<IdType> | null;

  nodesIn (ids: Iterable<IdType>) {
    return new NodesWhitelistView(this, new Set(ids));
  }

  nodesNotIn (ids: Iterable<IdType>) {
    return new NodesBlacklistView(this, new Set(ids));
  }

  nodesWithAttrMatch<K extends keyof Node> (field: K, test: (value: Node[K], node: Node) => boolean) {
    return new NodeAttributeFilterView(this, field, test);
  }

  merge<NewNode extends NetworkNode, NewLink extends NetworkLink> (nodeIdentifier: (node: Node) => IdType, mergeNodes: (nodes: Node[], identifier: IdType) => NewNode, mergeLinks: (links: Link[], identifier: string) => NewLink) {
    const sourceNodes = this.nodes();
    const sourceLinks = this.links();

    const nodeIdentifiersMap = new Map<IdType, IdType>();
    const nodesMap = new Map<IdType, Node[]>();
    const linksMap = new Map<string, Link[]>;

    for (let node of sourceNodes) {
      const identifier = nodeIdentifier(node);
      let nodes = nodesMap.get(identifier);
      if (!nodes) {
        nodes = [];
        nodesMap.set(identifier, nodes);
      }
      nodes.push(node);
      nodeIdentifiersMap.set(node.id, identifier);
    }

    for (let link of sourceLinks) {
      link = { ...link };
      link.source = nodeIdentifiersMap.get(link.source)!;
      link.target = nodeIdentifiersMap.get(link.target)!;
      const identifier = `${link.source}:${link.target}`;
      let links = linksMap.get(identifier);
      if (!links) {
        links = [];
        linksMap.set(identifier, links);
      }
      links.push(link);
    }

    const network = new BaseNetwork<NewNode, NewLink>({ noDirection: false });
    nodesMap.forEach((nodes, identifier) => {
      network.addNode(mergeNodes(nodes, identifier));
    });
    linksMap.forEach((links, identifier) => {
      network.addLink(mergeLinks(links, identifier));
    });

    return network;
  }
}

export class BaseNetwork<Node extends NetworkNode, Link extends NetworkLink> extends BaseNetworkView<Node, Link> implements Network<Node, Link> {
  private _nodes: Node[] = [];
  private _links: Link[] = [];

  private _nodesMap: Map<IdType, Node> = new Map();
  private _linksMap: Map<IdType, Link> = new Map();

  private _sourceRelMap: Map<IdType, Set<IdType>> = new Map();
  private _targetRelMap: Map<IdType, Set<IdType>> = new Map();

  readonly noDirection: boolean;

  constructor ({
    noDirection = true,
  }: Partial<BaseNetworkOptions> = {}) {
    super();
    this.noDirection = noDirection;
    if (noDirection) {
      this._sourceRelMap = this._targetRelMap;
    }
  }

  node (nodeId: IdType) {
    return this._nodesMap.get(nodeId);
  }

  addNode (node: Node): void {
    this._nodes.push(node);
    this._nodesMap.set(node.id, node);
  }

  removeNode (nodeId: IdType) {
    if (!this._nodesMap.has(nodeId)) {
      return;
    }

    // remove links
    const sourceLink = this._sourceRelMap.get(nodeId);
    if (sourceLink) {
      sourceLink.forEach(id => {
        this.removeLink(id);
      });
    }
    if (!this.noDirection) {
      const targetLink = this._targetRelMap.get(nodeId);
      if (targetLink) {
        targetLink.forEach(id => {
          this.removeLink(id);
        });
      }
    }

    this._nodesMap.delete(nodeId);
    const idx = this._nodes.findIndex(node => node.id === node.id);
    if (idx >= 0) {
      this._nodes.splice(idx, 1);
    }
  }

  link (nodeId: IdType) {
    return this._linksMap.get(nodeId);
  }

  addLink (link: Link): void {
    this._links.push(link);
    this._linksMap.set(link.id, link);

    let set = this._sourceRelMap.get(link.source);
    if (!set) {
      set = new Set();
    }
    this._sourceRelMap.set(link.source, set);
    set.add(link.target);

    if (!this.noDirection) {
      let set = this._targetRelMap.get(link.target);
      if (!set) {
        set = new Set();
      }
      this._targetRelMap.set(link.target, set);
      set.add(link.source);
    }
  }

  removeLink (linkId: IdType): void {
    const link = this._linksMap.get(linkId);
    if (!link) {
      return;
    }

    this._linksMap.delete(linkId);
    const idx = this._links.findIndex(link => link.id === link.id);
    if (idx >= 0) {
      this._links.splice(idx, 1);
    }
  }

  nodes () {
    return this._nodes;
  }

  links () {
    return this._links;
  }

  nodeNeighborhoods (id: IdType): Set<IdType> | null {
    if (!this._nodesMap.has(id)) {
      return null;
    }
    const set = new Set<IdType>();
    this._sourceRelMap.get(id)?.forEach(id => set.add(id));
    this._targetRelMap.get(id)?.forEach(id => set.add(id));
    return set;
  }

  replaceNodeAttrs (id: IdType, partial: Omit<Node, 'id'>) {
    if ('id' in partial) {
      throw new Error('cannot replace node id');
    }
    const node = this.node(id);
    if (node) {
      Object.assign(node, partial);
      this.emit('update:node', id);
    } else {
      throw new Error(`node ${id} not found in network`);
    }
  }

  replaceLinkAttrs (id: IdType, partial: Omit<Link, 'id' | 'source' | 'target'>) {
    if ('id' in partial) {
      throw new Error('cannot replace link id');
    }
    if ('source' in partial || 'target' in partial) {
      throw new Error('cannot replace link source or target');
    }
    const link = this.link(id);
    if (link) {
      Object.assign(link, partial);
      this.emit('update:link', id);
    } else {
      throw new Error(`link ${id} not found in network`);
    }
  }
}

export abstract class NodeFilterNetworkView<Node extends NetworkNode, Link extends NetworkLink> extends BaseNetworkView <Node, Link> {
  protected constructor (private _source: ReadonlyNetwork<Node, Link>) {
    super();
  }

  abstract includesNode (node: Node): boolean;

  nodes () {
    const rawNodes = this._source.nodes().filter(node => this.includesNode(node));
    const rawIds = new Set(rawNodes.map(node => node.id));
    const related: Node[] = [];

    rawNodes.reduce((set, node) => {
      this._source.nodeNeighborhoods(node.id)?.forEach(id => {
        if (!rawIds.has(id)) {
          if (!set.has(id)) {
            set.add(id);
            related.push(this._source.node(id)!);
          }
        }
      });
      return set;
    }, new Set<IdType>);

    return [...rawNodes, ...related];
  }

  links () {
    const rawNodes = this._source.nodes().filter(node => this.includesNode(node));
    const rawIds = new Set(rawNodes.map(node => node.id));

    rawNodes.forEach(node => {
      this._source.nodeNeighborhoods(node.id)?.forEach(id => {
        rawIds.add(id);
      });
    });

    return this._source.links().filter(link => {
      return rawIds.has(link.source) && rawIds.has(link.target);
    });
  }

  node (idType: IdType) {
    return this._source.node(idType);
  }

  link (idType: IdType) {
    return this._source.link(idType);
  }

  nodeNeighborhoods (id: IdType): Set<IdType> | null {
    return this._source.nodeNeighborhoods(id);
  }
}

class NodesWhitelistView<Node extends NetworkNode, Link extends NetworkLink> extends NodeFilterNetworkView<Node, Link> {
  constructor (view: ReadonlyNetwork<Node, Link>, private readonly _nodeSet: Set<IdType>) {
    super(view);
  }

  includesNode (node: Node): boolean {
    return this._nodeSet.has(node.id);
  }
}

class NodesBlacklistView<Node extends NetworkNode, Link extends NetworkLink> extends NodeFilterNetworkView<Node, Link> {
  constructor (view: ReadonlyNetwork<Node, Link>, private readonly _nodeSet: Set<IdType>) {
    super(view);
  }

  includesNode (node: Node): boolean {
    return !this._nodeSet.has(node.id);
  }
}

class NodeAttributeFilterView<Node extends NetworkNode, Link extends NetworkLink, K extends keyof Node> extends NodeFilterNetworkView<Node, Link> {
  constructor (view: ReadonlyNetwork<Node, Link>, private _attr: K, private _test: (value: Node[K], node: Node) => boolean) {super(view);}

  includesNode (node: Node): boolean {
    return this._test(node[this._attr], node);
  }
}
