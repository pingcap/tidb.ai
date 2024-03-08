import * as React from 'react';
import { styled, css } from '@mui/system';
import copy from 'copy-to-clipboard';

import { ChatActionButton } from '../Button';
import {
  StopFilledIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  CopyIcon,
  CopiedIcon,
  RefreshIcon,
} from '../Icons';

export function ChatActionBar(props: {
  handleStop: () => void;
  className?: string;
}) {
  const { handleStop, className } = props;

  return (
    <StyledChatActionBar className={className}>
      <ChatActionButton
        onClick={handleStop}
        className={className + '-Stop'}
        sx={{
          padding: '0.5rem',
          border: 0,
        }}
      >
        <StopFilledIcon
          className={className + '-Stop-Icon'}
          sx={{
            width: '1rem',
            height: '1rem',
            marginRight: '0.25rem',
          }}
        />
        Stop Generating
      </ChatActionButton>
    </StyledChatActionBar>
  );
}

export function ChatItemActionBar(props: {
  handleReload?: () => void;
  className?: string;
  content?: string;
}) {
  const { className, handleReload, content } = props;
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  return (
    <StyledChatActionBar className={className}>
      <div className={className + '-Actions-Container' + ' Actions-Container'}>
        <div className={className + '-Left-Actions' + ' Left-Actions Actions'}>
          {handleReload && (
            <ActionButton
              onClick={handleReload}
              Icon={RefreshIcon}
              name='Regenerate'
              className={className}
            >
              Regenerate
            </ActionButton>
          )}

          <ActionButton
            onClick={() => {
              copy(content || '');
              setCopied(true);
            }}
            Icon={copied ? CopiedIcon : CopyIcon}
            name='Copy'
            className={className}
          >
            {copied ? 'Copied!' : 'Copy'}
          </ActionButton>
        </div>

        <div
          className={className + '-Right-Actions' + ' Right-Actions Actions'}
        >
          <ActionButton
            Icon={ThumbUpIcon}
            name='GoodAnswer'
            className={className}
          >
            Good Answer
          </ActionButton>
          <ActionButton
            Icon={ThumbDownIcon}
            name='BadAnswer'
            className={className}
          >
            Bad Answer
          </ActionButton>
        </div>
      </div>
    </StyledChatActionBar>
  );
}

function ActionButton(props: {
  name: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  Icon: React.ElementType;
}) {
  const { name, className, onClick, children, Icon } = props;

  return (
    <ChatActionButton
      onClick={onClick}
      className={className + `-${name}`}
      sx={{
        padding: '0.25rem 0.5rem',
        border: 0,
        fontWeight: 'normal',
        fontSize: '0.75rem',
        color: 'mutedForeground',
      }}
    >
      <Icon
        className={className + `-${name}-Icon`}
        sx={{
          width: '0.75rem',
          height: '0.75rem',
          mr: '0.25rem',
        }}
      />
      {children}
    </ChatActionButton>
  );
}

const StyledChatActionBar = styled('div')(({ theme }) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    margin: '0.5rem 0',
    // height: '1.5rem',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.muted,
    // color: theme.palette.primary,
    '& .Actions-Container': {
      width: '100%',
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'space-between',
    },
    '& .Actions': {
      display: 'flex',
      gap: '0.5rem',
      '& > div': {
        display: 'flex',
        gap: '0.5rem',
      },
    },
  })
);
