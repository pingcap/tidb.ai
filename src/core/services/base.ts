import { Flow } from '@/core';
import type { Index } from '@/core/repositories/index_';

export interface AppIndexBaseServiceOptions {
  flow: Flow;
  index: Index;
}

export abstract class AppIndexBaseService {
  protected readonly flow: Flow;
  protected readonly index: Index;

  constructor (options: AppIndexBaseServiceOptions) {
    this.flow = options.flow;
    this.index = options.index;
  }
}
