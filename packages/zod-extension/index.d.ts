export { default } from 'zod';
export * from 'zod';

declare module 'zod' {
  interface ZodTypeDef {
    label?: string;
    placeholder?: string;
  }

  interface ZodType {
    label (label: string | undefined): this;

    placeholder (string: string | undefined): this;
  }
}
