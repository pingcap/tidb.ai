export const isAsyncIterable = (x: unknown): x is AsyncIterable<unknown> =>
  x != null && typeof x === "object" && typeof (x as any)[Symbol.asyncIterator] === "function";