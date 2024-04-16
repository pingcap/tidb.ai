export type Rewrite<O, P extends {}> = Omit<O, keyof P> & P;
