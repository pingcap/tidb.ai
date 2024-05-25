export function deduplicateItems<T, K extends keyof T> (property: K) {
  const set = new Set<T[K]>();
  return (item: T) => {
    if (set.has(item[property])) {
      return false;
    }
    set.add(item[property]);
    return true;
  };
}
