import SyntaxHighlighter from 'react-syntax-highlighter';
// import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

import { CopyButton } from '../Button/CopyButton';

export const SimpleCode = (
  props: { children: string; language?: string } & Partial<
    React.HTMLProps<HTMLElement>
  >
) => {
  const { children, language } = props;

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <SyntaxHighlighter language={language}>{children}</SyntaxHighlighter>
      <CopyButton text={children} />
    </div>
  );
};
