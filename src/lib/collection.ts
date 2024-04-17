export class SortedSet<Key extends string | number | symbol, Element> {
  private keySet = new Set<Key>();
  private elements: Element[] = [];

  has(key: Key) {
    return this.keySet.has(key);
  }

  add(key: Key, element: Element) {
    if (!this.keySet.has(key)) {
      this.keySet.add(key);
      this.elements.push(element);
    }
  }

  asList(): Element[] {
    return this.elements;
  }
}
