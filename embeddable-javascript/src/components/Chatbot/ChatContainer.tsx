import * as React from 'react';
import { styled, css } from '@mui/system';
import { useChat } from 'ai/react';
import { withReCaptcha } from '../../lib/withCaptcha.ts';

import { ChatItem, ChatItemLoading, ExampleQuestions } from './ChatItem';
import { ChatActionBar, ChatItemActionBar } from './ChatActionBar';
import ChatInput, { StyledChatMutedText } from './Input';
import { useLocalCreateRAGSessionId, useRemoteAuth } from '../../lib/hook';
import { MDLightCss, MDDarkCss } from '../../theme/md';
import { themeClassPrefix } from '../../theme';
import { CfgContext } from '../../context';

declare module 'ai/react' {
  interface Message {
    context?: string[];
  }
}

export default function ChatContainer(props: {
  exampleQuestions: string[];
  inputPlaceholder?: string;
  siteKey?: string;
  securityMode?: 'v3' | 'enterprise';
}) {
  const {
    exampleQuestions,
    inputPlaceholder,
    siteKey = '',
    securityMode,
  } = props;

  const { session, setSession, sessionId, setSessionId } = useLocalCreateRAGSessionId();
  // const contextRef = React.useRef<string[]>([]);

  const cfg = React.useContext(CfgContext);

  // TODO: useRemoteAuth
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const remotaAuthData = useRemoteAuth();
  useRemoteAuth(cfg);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    append,
  } = useChat({
    api: cfg.baseUrl + '/api/v1/chats',
    credentials: 'include',
    body: {
      ...(session && { sessionID: session }),
    },
    onResponse: (response) => {
      if (session !== response.headers.get('X-CreateRag-Session')) {
        setSession(response.headers.get('X-CreateRag-Session') ?? undefined);
      }
      if (sessionId !== response.headers.get('X-CreateRag-Session-Id')) {
        setSessionId(response.headers.get('X-CreateRag-Session-Id') ?? undefined);
      }
    },
  });

  const appendText = (text: string) => {
    append({
      role: 'user',
      content: text,
      createdAt: new Date(),
    });
  };

  const handleSubmitWithReCaptcha = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!siteKey) {
      return handleSubmit(e);
    }
    withReCaptcha(
      {
        action: 'submit',
        siteKey: siteKey || '',
        mode: securityMode,
      },
      ({ token, action }) => {
        handleSubmit(e, {
          options: {
            headers: {
              'X-Recaptcha-Token': token,
              'X-Recaptcha-Action': action,
            },
          },
        });
      }
    );
  };

  return (
    <>
      <StyledChatContainer
        className={themeClassPrefix + 'Conversation-Container'}
      >
        <StyledChatWrapper
          sx={{
            flexDirection: 'column-reverse',
          }}
          className='Conversation-Message-List'
        >
          {messages.length === 0 && exampleQuestions.length > 0 && (
            <ExampleQuestions
              appendText={appendText}
              items={exampleQuestions}
            />
          )}
          {isLoading && <ChatItemLoading annotations={messages[messages.length - 1]?.annotations ?? [] as any} />}
          {messages
            .sort((a, b) => {
              const aTime = new Date(a.createdAt || 0).getTime();
              const bTime = new Date(b.createdAt || 0).getTime();
              return bTime - aTime;
            })
            .map((m, idx) => {
              const showAction = idx === 0 ? !isLoading : m.role !== 'user';
              return (
                <ChatItem
                  key={m.id}
                  role={m.role === 'user' ? 'user' : 'bot'}
                  className={themeClassPrefix + 'Conversation-Message'}
                  Action={
                    showAction ? (
                      <ChatItemActionBar
                        sessionId={sessionId}
                        annotations={m.annotations as any}
                        handleReload={idx === 0 ? reload : undefined}
                        content={m.content}
                        className={
                          themeClassPrefix + 'Conversation-Message-Action'
                        }
                      />
                    ) : null
                  }
                  wrapperSx={{
                    ...(idx === 0 && {
                      border: 'none',
                      marginBottom: 0,
                    }),
                  }}
                >
                  {m.content}
                </ChatItem>
              );
            })}
          {/* <ChatItem
            role='bot'
            className={themeClassPrefix + 'Conversation-Message'}
            contentSx={{
              p: '1rem',
              backgroundColor: (theme) => theme.palette.muted,
              borderRadius: (theme) => theme.shape.borderRadius,
              fontSize: '0.875rem',
            }}
            wrapperSx={{
              border: 'none',
            }}
          >
            {WidgetCodeMock}
          </ChatItem> */}
        </StyledChatWrapper>
        <div>
          {messages?.length > 0 && isLoading && (
            <ChatActionBar
              className={themeClassPrefix + 'Conversation-Action'}
              handleStop={stop}
            />
          )}
          <form onSubmit={handleSubmitWithReCaptcha}>
            <ChatInput
              className={themeClassPrefix + 'Conversation-Input'}
              value={input}
              onChange={handleInputChange}
              isLoading={isLoading}
              placeholder={inputPlaceholder}
            />
          </form>
          <StyledChatMutedTextGroup>
            <StyledChatMutedText>
              {`Powered by `}
              <a href='https://tidb.ai' target='_blank' rel='noreferrer'>
                TiDB.ai
              </a>
            </StyledChatMutedText>
            <StyledChatMutedText
              sx={{
                marginLeft: 'auto',
                marginRight: '0',
              }}
            >
              {`protected by reCAPTCHA (`}
              <a
                href='https://policies.google.com/privacy'
                target='_blank'
                rel='noreferrer'
              >
                {`Privacy`}
              </a>
              {` - `}
              <a
                href='https://policies.google.com/terms'
                target='_blank'
                rel='noreferrer'
              >
                {`Terms`}
              </a>
              {`)`}
            </StyledChatMutedText>
          </StyledChatMutedTextGroup>
        </div>
      </StyledChatContainer>
    </>
  );
}

// const WidgetCodeMock = `Copy the follow script to another webiste to get a same **bottom-right widget**\n\`\`\`javascript\n<script
//   async
//   src="https://s3.us-west-2.amazonaws.com/rag.tidb.ai/rag-widget.js"
//   data-id="tidb-ai-widget"
//   data-name="tidb-ai-widget"
//   data-api-base-url="https://tidb.ai"
//   data-btn-label="Ask xxx"
//   data-btn-img-src="https://tidb.ai/tidb-ai.svg"
//   data-example-questions='["What is TiDB","Does TiDB support Foreign Key","What is TiDB Serverless","How to use TiDB Serverless"]'
//   data-logo-src="https://tidb.ai/tidb-ai.svg"
// ></script>\n\`\`\``;

const StyledChatContainer = styled('div')(({ theme }) =>
  css({
    display: 'flex',
    flex: '1 1 0%',
    // padding: '0.5rem',
    // '@media (min-width: 640px)': {
    //   padding: '2rem',
    // },
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: 'calc(100% - 40px)',
    backgroundColor: theme.palette.background,
  })
);

const StyledChatWrapper = styled('div')(({ theme }) =>
  css(
    {
      display: 'flex',
      flexDirection: 'column',
      // rowGap: '1rem',
      padding: '0.75rem 0',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: `${theme.palette.accent} ${theme.palette.background}`,
      '&::-webkit-scrollbar': {
        width: '0.5rem',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.background,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.background,
        borderRadius: theme.shape.borderRadius,
      },
    },
    theme.palette.mode === 'dark' ? MDDarkCss : MDLightCss
  )
);

const StyledChatMutedTextGroup = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    paddingTop: '1rem',
    fontSize: '12px',
    color: theme.palette.mutedForeground,
    '& >* a': {
      color: 'inherit',
    },
  };
});
