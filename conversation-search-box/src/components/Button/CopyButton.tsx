import * as React from 'react';
import copy from 'copy-to-clipboard';

import { CopyIcon, CopiedIcon } from '../Icons';

export const CopyButton = (props: { text: string; size?: number }) => {
  const { text, size = 16 } = props;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    copy(text);
    setCopied(true);
  };

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000);
    }
  }, [copied]);

  return (
    <button
      onClick={handleCopy}
      className='copy-button'
      style={{
        padding: '0.5rem',
        border: 0,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        outline: 'none',
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
      }}
    >
      {copied ? (
        <CopiedIcon
          sx={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      ) : (
        <CopyIcon
          sx={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      )}
    </button>
  );
};
