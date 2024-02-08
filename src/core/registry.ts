import { rag } from '@/core/interface';
import { z } from 'zod';

export type ExtractOptions<T> = T extends rag.Base<infer O extends object> ? O : never;

export interface ComponentConstructor<Type> {
  new (options: ExtractOptions<Type>): Type;

  optionsSchema: z.ZodType<ExtractOptions<Type>>;
  identifier: string;
  displayName: string;
}
