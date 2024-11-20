export type KeyOfType<T, Value> = keyof { [P in keyof T as T[P] extends Value ? P : never]: any }
