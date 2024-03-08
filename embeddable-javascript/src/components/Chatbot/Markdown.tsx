import * as React from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

// import { SimpleCode } from './CodeBlock';

export const MemoizedReactMarkdown: React.FC<Options> = React.memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
);

export const MDMessage = (props: { children: string }) => {
  return (
    <>
      <MemoizedReactMarkdown
        className='markdown-body'
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
          a(props) {
            return (
              <a {...props} target='_blank' rel='noopener noreferrer'>
                {props.children}
              </a>
            );
          }
        }}
      >
        {props.children}
      </MemoizedReactMarkdown>
    </>
  );
};
