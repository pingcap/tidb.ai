import { css, styled } from '@mui/system';
import { type ChatRequestOptions, Message } from 'ai';
import { useChat } from 'ai/react';
import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CfgContext } from '../../context';
import { useChatSession } from '../../lib/chat.ts';
import { withReCaptcha } from '../../lib/withCaptcha.ts';
import { themeClassPrefix } from '../../theme';
import { MDDarkCss, MDLightCss } from '../../theme/md';
import { ChatActionBar, ChatItemActionBar } from './ChatActionBar';

import { ChatItem, ChatItemError, ChatItemLoading, ExampleQuestions, getChatMessageAnnotations } from './ChatItem';
import ChatInput, { StyledChatMutedText } from './Input';

declare module 'ai/react' {
  interface Message {
    context?: string[];
  }
}

export default function ChatContainer (props: {
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

  const { session, create } = useChatSession();
  // const contextRef = React.useRef<string[]>([]);

  const cfg = React.useContext(CfgContext);
  const [submitting, setSubmitting] = useState(false);

  const chat = useChat({
    api: cfg.baseUrl + `/api/v1/chats/${session}/messages`,
    credentials: 'include',
  });
  const {
    messages,
    input,
    handleInputChange,
    isLoading,
    stop,
    error,
  } = chat;

  const chatRef = useRef(chat);
  useEffect(() => {
    chatRef.current = chat;
  });

  const __chat = (text: string, options?: ChatRequestOptions) => {
    chatRef.current.setInput('');
    return create(text)
      .then(() => {
        setTimeout(() => {
          void chatRef.current.append({
            role: 'user',
            content: text,
            createdAt: new Date(),
          }, options);
        }, 0);
      });
  };

  const appendText = (text: string) => {
    setSubmitting(true);
    __chat(text).finally(() => {
      setSubmitting(false);
    });
  };

  const handleSubmitWithReCaptcha = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!siteKey) {
        await __chat(chatRef.current.input);
      } else {
        await withReCaptcha(
          {
            action: 'submit',
            siteKey: siteKey || '',
            mode: securityMode,
          },
          async ({ token, action }) => {
            await __chat(chatRef.current.input, {
              options: {
                headers: {
                  'X-Recaptcha-Token': token,
                  'X-Recaptcha-Action': action,
                },
              },
            });
          },
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const regenerate = (m: Message) => {
    void chatRef.current.reload({ options: { body: { regenerate: true, messageId: getChatMessageAnnotations(m.annotations ?? [] as any).messageId } } });
    chatRef.current.setMessages(chatRef.current.messages.slice(0, -1));
  };

  const [streamError, setStreamError] = useState<string>();
  const annotation = useMemo(() => {
    return getChatMessageAnnotations(messages[messages.length - 1]?.annotations ?? [] as any);
  }, [messages[messages.length - 1]?.annotations]);

  useEffect(() => {
    if (annotation.state === 'ERROR') {
      setStreamError(annotation.stateMessage ?? 'Unknown error');
    }
  }, [annotation.state, annotation.stateMessage]);

  return (
    <>
      <StyledChatContainer
        className={themeClassPrefix + 'Conversation-Container'}
      >
        <StyledChatWrapper
          sx={{
            flexDirection: 'column-reverse',
          }}
          className="Conversation-Message-List"
        >
          {!session && !submitting && exampleQuestions.length > 0 && (
            <ExampleQuestions
              appendText={appendText}
              items={exampleQuestions}
            />
          )}
          {(isLoading || submitting) && <ChatItemLoading annotation={annotation} />}
          {streamError && <ChatItemError error={streamError} />}
          {error && <ChatItemError error={error.message} />}
          {[...messages]
            .reverse()
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
                        handleReload={idx === 0 ? () => regenerate(m) : undefined}
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
          {session && isLoading && (
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
              isLoading={submitting || isLoading}
              placeholder={inputPlaceholder}
            />
          </form>
          <StyledChatMutedTextGroup>
            <StyledChatMutedText>
              {`Powered by `}
              <a href="https://tidb.ai" target="_blank" rel="noreferrer">
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
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                {`Privacy`}
              </a>
              {` - `}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noreferrer"
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
  }),
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
    theme.palette.mode === 'dark' ? MDDarkCss : MDLightCss,
  ),
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
