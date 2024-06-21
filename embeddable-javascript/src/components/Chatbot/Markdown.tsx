// import { styled } from '@mui/system';
import * as React from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

// import { SimpleCode } from './CodeBlock';

export const MemoizedReactMarkdown: React.FC<Options> = React.memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className,
);

// const SROnlySection = styled('section')`
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   white-space: nowrap;
//   border-width: 0;
// `;

export const MDMessage = (props: { children: string }) => {
  return (
    <>
      <MemoizedReactMarkdown
        className="markdown-body"
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          // code(props) {
          //   const { children, className, ...rest } = props;
          //   const match = /language-(\w+)/.exec(className || '');
          //   return match ? (
          //     <SimpleCode
          //       {...rest}
          //       children={String(children).replace(/\n$/, '')}
          //       language={match[1] || ''}
          //     />
          //   ) : (
          //     <code {...rest} className={className}>
          //       {children}
          //     </code>
          //   );
          // },
          // section ({ ...props }) {
          //   // eslint-disable-next-line react-hooks/rules-of-hooks
          //
          //   if (!(props as any)['data-footnotes']) return <section {...props} />;
          //   return (
          //     <SROnlySection {...props}>
          //       {props.children}
          //     </SROnlySection>
          //   );
          // },
          a (props) {
            if (props.href?.startsWith('#')) {
              return <a {...props} >{props.children}</a>
            }
            return (
              <a {...props} target="_blank" rel="noopener noreferrer">
                {props.children}
              </a>
            );
          },
        }}
      >
        {props.children}
      </MemoizedReactMarkdown>
    </>
  );
};
