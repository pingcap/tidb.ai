import { LoaderIcon } from 'lucide-react';
import { useContext, useMemo } from 'react';
import * as React from 'react';
import { styled, css, Theme, SxProps } from '@mui/system';
import { CfgContext } from '../../context';

import { MDMessage } from './Markdown';
import { a11yDark, a11yLight } from '../../theme/code';

export type AppChatStreamSource = { title: string, uri: string };

export const enum AppChatStreamState {
  CONNECTING = 'CONNECTING', // only client side
  CREATING = 'CREATING',
  KG_RETRIEVING = 'KG_RETRIEVING',
  SEARCHING = 'SEARCHING',
  RERANKING = 'RERANKING',
  GENERATING = 'GENERATING',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

export type MyChatMessageAnnotation = {
  ts: number;
  messageId: number;
  traceURL?: string,
  context?: AppChatStreamSource[],
  state?: AppChatStreamState,
  stateMessage?: string
};


export function ChatItem(props: {
  role?: 'user' | 'bot';
  children: string;
  Action?: React.ReactNode;
  className?: string;
  contentSx?: SxProps<Theme>;
  wrapperSx?: SxProps<Theme>;
  // dataItems?: {
  //   title: string;
  //   uri: string;
  // }[];
}) {
  const { role = 'user', children, className, Action } = props;

  return (
    <StyledChatItemRow
      role={role}
      className={className + '-Item'}
      sx={props.wrapperSx}
    >
      <StyledChatItem
        role={role}
        className={className + '-Item-Content'}
        sx={{
          width: 'fill-available',
          ...props.contentSx,
        }}
      >
        {/* <StyledChatItemSpan
          role={role}
          sx={{
            '&> p': {
              margin: 0,
            },
          }}
        >
          <MDMessage>{children}</MDMessage>
        </StyledChatItemSpan> */}
        {/* {dataItems && <ChatItemRelatedLinkCardWrapper items={dataItems} />} */}
        <MDMessage>{children}</MDMessage>
        {Action}
      </StyledChatItem>
    </StyledChatItemRow>
  );
}

function getHost (baseUrl: string) {
  try {
    return new URL(baseUrl).hostname;
  } catch {
    return location.hostname;
  }
}

export function ChatItemLoading({ annotations }: { annotations: MyChatMessageAnnotation[] }) {
  const annotation = useMemo(() => {
    return getChatMessageAnnotations(annotations);
  }, [annotations])

  const { baseUrl } = useContext(CfgContext);
  let text: string;
  switch (annotation.state) {
    case undefined:
    case 'CONNECTING':
      text = `Connecting to ${getHost(baseUrl)}...`;
      break;
    case 'CREATING':
      text = 'Preparing to ask...';
      break;
    case 'KG_RETRIEVING':
      text = 'Retrieving knowledge...';
      break;
    case 'SEARCHING':
      text = 'Gathering resources...';
      break;
    case 'RERANKING':
      text = 'Reranking resources...';
      break;
    case 'GENERATING':
      text = 'Generating answer...';
      break;
    default:
      return null;
  }

  return (
    <StyledChatItemRow
      role='bot'
      sx={{
        borderBottom: 'none',
      }}
    >
      <StyledChatItem role='bot'>
        <StyledChatMutedText>
          <StyledLoaderIcon sx={{
            animation: "spin 2s linear infinite",
            "@keyframes spin": {
              "0%": {
                transform: "rotate(360deg)",
              },
              "100%": {
                transform: "rotate(0deg)",
              },
            }
          }} />
          {text}
        </StyledChatMutedText>
      </StyledChatItem>
    </StyledChatItemRow>
  );
}

export function ChatItemRelatedLinkCard(props: { title: string; uri: string }) {
  const { title, uri } = props;

  const hostnameMemo = React.useMemo(() => {
    try {
      return new URL(uri).hostname;
    } catch {
      return '';
    }
  }, [uri]);

  return (
    <StyledChatItemLinkCard href={uri} target='_blank'>
      <div>{title}</div>
      <div>{hostnameMemo}</div>
    </StyledChatItemLinkCard>
  );
}

export function ChatItemRelatedLinkCardWrapper(props: {
  items: AppChatStreamSource[];
}) {
  const { items } = props;

  return (
    <StyledChatItemLinkCardWrapper>
      {items.map((item, index) => (
        <ChatItemRelatedLinkCard key={index} {...item} />
      ))}
    </StyledChatItemLinkCardWrapper>
  );
}

export function ExampleQuestions(props: {
  items: string[];
  appendText: (text: string) => void;
}) {
  const { items, appendText } = props;

  return (
    <StyledExampleQuestionWrapper>
      <h3>Example Questions</h3>
      {items.map((item, index) => (
        <StyledExampleQuestionItem
          key={index}
          onClick={() => {
            appendText(item);
          }}
        >
          {item}
        </StyledExampleQuestionItem>
      ))}
    </StyledExampleQuestionWrapper>
  );
}

export const StyledChatItemRow = styled('div')(({ theme, role }) =>
  css({
    display: 'flex',
    alignItems: 'flex-end',
    paddingBottom: '0.5rem',
    marginBottom: role === 'bot' ? '1rem' : '0.5rem',
    borderBottom: role === 'bot' ? '1px solid' : 'none',
    borderBottomColor: theme.palette.muted,
  })
);

export const StyledChatItem = styled('div')(({ theme, role }) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gapY: '0.5rem',
    // fontSize: '1rem',
    lineHeight: '1.5rem',
    marginX: '0.5rem',
    // order: role === 'bot' ? 2 : 1,
    // alignItems: role === 'bot' ? 'flex-start' : 'flex-end',
    // maxWidth: '80%',
    fontSize: role === 'bot' ? '1rem' : '1.25rem',
    fontWeight: role === 'bot' ? 400 : 700,
    width: '100%',
    '& *': {
      ...(theme.palette.mode === 'dark' ? a11yDark : a11yLight),
    },
    '&> p': {
      margin: 0,
    },
  })
);

export const StyledChatMutedText = styled('div')(({ theme }) =>
  css({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: theme.palette.mutedForeground,
    '& > a': {
      color: 'inherit',
    },
  })
);

const StyledLoaderIcon = styled(LoaderIcon)`
  width: 1em;
  height: 1em;
`

// export const StyledTextSkeleton = styled('div')(({ theme }) =>
//   css({
//     backgroundColor: theme.palette.muted,
//     color: theme.palette.primary,
//     borderRadius: theme.shape.borderRadius,
//     padding: '0.5rem 0.75rem',
//     display: 'inline-block',
//     animation: 'animation-breath 1.5s infinite',
//     '@keyframes animation-breath': {
//       '0%': {
//         opacity: 1,
//       },
//       '50%': {
//         opacity: 0.4,
//       },
//       '100%': {
//         opacity: 1,
//       },
//     },
//   })
// );

export const StyledChatItemLinkCard = styled('a')(({ theme }) =>
  css({
    display: 'block',
    padding: '0.5rem',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.muted,
    color: theme.palette.accentForeground,
    '&:hover': {
      backgroundColor: theme.palette.muted,
      color: theme.palette.accentForeground,
    },
  })
);

export const StyledChatItemLinkCardWrapper = styled('div')(() =>
  css({
    display: 'flex',
    gapX: '0.5rem',
    overflowX: 'auto',
  })
);

export const StyledExampleQuestionItem = styled('div')(({ theme }) =>
  css({
    width: '100%',
    display: 'inline-flex',
    fontFamily: `'IBM Plex Sans', sans-serif`,
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    backgroundColor: theme.palette.muted,
    padding: '8px 16px',
    borderRadius: '8px',
    color: theme.palette.primary,
    transition: 'all 150ms ease',
    cursor: 'pointer',
    border: `2px solid ${theme.shape.borderRadius}`,
    '&:hover': {
      borderColor: theme.palette.ring,
    },
  })
);

export const StyledExampleQuestionWrapper = styled('div')(() =>
  css({
    width: '100%',
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    '& h3': {
      width: '100%',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 700,
      margin: 0,
    },
  })
);

// export const StyledChatItemSpan = styled('span')(({ theme, role }) =>
//   css({
//     fontSize: '1rem',
//     lineHeight: '1.5rem',
//     padding: '0.5rem 0.75rem',
//     borderRadius: theme.shape.borderRadius,
//     display: 'inline-block',
//     ...(role === 'bot' && {
//       borderBottomLeftRadius: 0,
//       backgroundColor: theme.palette.muted,
//       color:
//         theme.palette.accentForeground,
//     }),
//     ...(role === 'user' && {
//       borderBottomRightRadius: 0,
//       backgroundColor:
//         theme.palette.primary,
//       color:
//         theme.palette.primaryForeground,
//     }),
//   })
// );

export function getChatMessageAnnotations (annotations: MyChatMessageAnnotation[] | undefined) {
  return ((annotations ?? []) as MyChatMessageAnnotation[])
    .reduce((annotation, next) => Object.assign(annotation, next), {} as MyChatMessageAnnotation);
}
