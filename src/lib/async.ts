import {ManagedAsyncIterable} from "@/lib/ManagedAsyncIterable";

export const isAsyncIterable = (x: unknown): x is AsyncIterable<unknown> =>
  x != null && typeof x === "object" && typeof (x as any)[Symbol.asyncIterator] === "function";

export function withAsyncIterable<T, R> (run: (next: (result: IteratorResult<T, undefined>) => void, fail: (error: unknown) => void) => R) {
  const managed = new ManagedAsyncIterable<T>();

  let returns: R;
  returns = run(
    (result) => {
      if (result.done) {
        managed.finish();
      } else {
        managed.next(result.value);
      }
    },
    (reason) => {
      managed.fail(reason);
    });

  Object.defineProperty(returns, Symbol.asyncIterator, {
    value: () => managed[Symbol.asyncIterator](),
    writable: false,
    configurable: false,
    enumerable: false,
  });

  Object.defineProperty(returns, '__force_terminate__', {
    value: () => {
      managed.finish();
    },
    writable: false,
    configurable: false,
    enumerable: false,
  })

  return returns as R & AsyncIterable<T> & { __force_terminate__: () => void };
}

/**
 * Create a single AsyncIterable from several AsyncIterables with the same type.
 * @param iterables
 */
export function poll<T> (...iterables: AsyncIterable<T>[]): AsyncIterable<T> {
  return new ManagedAsyncIterable<T>((managed) => {
    let finished = 0;
    for (let iterable of iterables) {
      const iterator = iterable[Symbol.asyncIterator]();
      const iterate = () => {
        iterator.next()
          .then(
            result => {
              if (result.done) {
                finished += 1;
                if (finished === iterables.length) {
                  managed.finish();
                }
              } else {
                managed.next(result.value);
                iterate();
              }
            },
            error => {
              managed.fail(error);
            });
      };
      iterate();
    }
  });
}

export async function* mapAsyncIterable<T, R> (iterable: Promise<AsyncIterable<T>> | AsyncIterable<T>, map: (value: T) => R | Promise<R>, onFinished: () => void = () => {}): AsyncIterable<R> {
  for await (const value of await iterable) {
    yield map(value);
  }

  onFinished();
}