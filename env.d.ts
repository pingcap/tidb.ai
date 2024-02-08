declare module '@createrag/extension-*' {
  import type { ExtensionInfo } from '@/core/registry2';

  declare const extension: ExtensionInfo;

  export default extension;
}

declare module '*.liquid' {
  declare const template: string;

  export default template;
}

declare module '*.mdx' {
  import type { FC } from 'react';
  declare const MDXComponent: FC;

  export default MDXComponent;
}

declare module 'prismjs/components/prism-*' {
}
