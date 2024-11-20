export function shallowPick<Data, Key extends keyof Data> (data: Data, path: [Key, ...(string | number | symbol)[]]) {
  const key = path[0];
  return { [key]: data[key] } as Pick<Data, Key>;
}