import { Flow } from '@/core';
import type { Index } from '@/core/repositories/index_';
import {ServiceContext} from "llamaindex";

export interface AppIndexBaseServiceOptions {
  flow: Flow;
  index: Index;
  serviceContext: ServiceContext;
}

export abstract class AppIndexBaseService {
  protected readonly flow: Flow;
  protected readonly index: Index;
  protected readonly serviceContext: ServiceContext;

  constructor (options: AppIndexBaseServiceOptions) {
    this.flow = options.flow;
    this.index = options.index;
    this.serviceContext = options.serviceContext;
  }
}
