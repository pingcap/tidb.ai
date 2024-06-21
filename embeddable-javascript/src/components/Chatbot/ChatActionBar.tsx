import { css, styled } from '@mui/system';
import { SxProps } from '@mui/system/styleFunctionSx';
import copy from 'copy-to-clipboard';
import * as React from 'react';
import { useMemo } from 'react';

import { ChatActionButton } from '../Button';
import { CopiedIcon, CopyIcon, RefreshIcon, StopFilledIcon, ThumbDownIcon, ThumbUpIcon } from '../Icons';
import { getChatMessageAnnotations, type MyChatMessageAnnotation } from './ChatItem.tsx';
import { useMessageFeedback } from './use-message-feedback.ts';

export function ChatActionBar (props: {
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

export function ChatItemActionBar (props: {
  sessionId?: string | null;
  annotations?: MyChatMessageAnnotation[];
  handleReload?: () => void;
  className?: string;
  content?: string;
}) {
  const { className, handleReload, content, sessionId, annotations } = props;
  const [copied, setCopied] = React.useState(false);

  const annotation = useMemo(() => {
    return getChatMessageAnnotations(annotations);
  }, []);

  const {
    feedbackData,
    feedback,
  } = useMessageFeedback(Number(sessionId), annotation.messageId, annotation.state === 'FINISHED');

  const like = () => {
    feedback('like', {}, 'From tidb.ai ChatBot');
  }

  const dislike = () => {
    feedback('dislike', {}, 'From tidb.ai ChatBot');
  }

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
              name="Regenerate"
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
            name="Copy"
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
            name="GoodAnswer"
            className={className}
            disabled={!!feedbackData}
            sx={feedbackData?.action === 'like' ? ({
              backgroundColor: 'rgb(34 197 94 / 0.05)',
              color: 'rgb(34 197 94)'
            }) : !!feedbackData ? {opacity: 0.5, cursor: 'not-allowed'} : undefined}
            onClick={like}
          >
            Good Answer
          </ActionButton>
          <ActionButton
            Icon={ThumbDownIcon}
            name="BadAnswer"
            className={className}
            disabled={!!feedbackData}
            sx={feedbackData?.action === 'dislike' ? ({
              backgroundColor: 'rgb(239 68 68 / 0.05)',
              color: 'rgb(239 68 68)',
            }) : !!feedbackData ? {opacity: 0.5, cursor: 'not-allowed'} : undefined}
            onClick={dislike}
          >
            Bad Answer
          </ActionButton>
        </div>
      </div>
    </StyledChatActionBar>
  );
}

function ActionButton (props: {
  name: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  Icon: React.ElementType;
  disabled?: boolean;
  sx?: SxProps;
}) {
  const { name, className, onClick, children, Icon, disabled, sx } = props;

  return (
    <ChatActionButton
      disabled={disabled}
      onClick={onClick}
      className={className + `-${name}`}
      sx={{
        padding: '0.25rem 0.5rem',
        border: 0,
        fontWeight: 'normal',
        fontSize: '0.75rem',
        color: 'mutedForeground',
        ...sx,
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
  }),
);
