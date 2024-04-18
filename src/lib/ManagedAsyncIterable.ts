export class ManagedAsyncIterable<T> implements AsyncIterable<T> {
  private done = false;
  private readonly queue: Promise<IteratorResult<T>>[] = [];
  private _resolve: (_value: IteratorResult<T>) => void = () => {};
  private _reject: (reason: unknown) => void = () => {};

  constructor (private start?: (iterable: ManagedAsyncIterable<T>) => void) {
    this._prepareNext();
  }

  private _prepareNext () {
    this.queue.push(new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    }));
  }

  private async _awaitNext () {
    return await this.queue[this.queue.length - 1];
  }

  next (value: T) {
    if (this.done) {
      throw new Error('ManagedAsyncIterator is already done.');
    }

    this._resolve({
      value,
      done: false,
    });

    this._prepareNext();
  }

  finish () {
    if (!this.done) {
      this._resolve({
        done: true,
        value: undefined,
      });
    }
  }

  fail (reason: unknown) {
    this._reject(reason);
    this.done = true;
  }

  [Symbol.asyncIterator] (): AsyncIterator<T> {
    this.start?.(this);
    return {
      next: async () => {
        return this._awaitNext();
      },
    };
  }
}