import { Flow } from '@/core';
import type { Index } from '@/core/repositories/index_';
import EventEmitter from 'events';
import {Langfuse} from "langfuse";

export interface AppFlowBaseServiceOptions {
  flow: Flow;
}

export interface AppIndexBaseServiceOptions extends AppFlowBaseServiceOptions {
  index: Index;
  langfuse?: Langfuse;
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
  protected readonly langfuse?: Langfuse;

  constructor (options: AppIndexBaseServiceOptions) {
    super(options);
    this.index = options.index;
    this.langfuse = options.langfuse;
  }
}
