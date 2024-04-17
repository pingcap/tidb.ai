import { Flow } from '@/core';
import type { Index } from '@/core/repositories/index_';
import EventEmitter from 'events';

export interface AppFlowBaseServiceOptions {
  flow: Flow;
}

export interface AppIndexBaseServiceOptions extends AppFlowBaseServiceOptions {
  index: Index;
}

export abstract class AppFlowBaseService extends EventEmitter {
  protected readonly flow: Flow;

  constructor (options: AppFlowBaseServiceOptions) {
    super()
    this.flow = options.flow;
  }
}

export abstract class AppIndexBaseService extends AppFlowBaseService {
  protected readonly index: Index;

  constructor (options: AppIndexBaseServiceOptions) {
    super(options);
    this.index = options.index;
  }
}
