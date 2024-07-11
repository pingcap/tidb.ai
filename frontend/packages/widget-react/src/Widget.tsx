import { ChatsProvider } from '@/components/chat/chat-hooks';
import { Conversation } from '@/components/chat/conversation';
import { PortalProvider } from '@/components/portal-provider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useEffect, useRef, useState } from 'react';

export interface WidgetProps {
  exampleQuestions: string[];
  buttonLabel: string;
  buttonIcon: string;
  icon: string;
}

export function Widget ({ exampleQuestions, icon, buttonIcon, buttonLabel }: WidgetProps) {
  const [_, setDark] = useState(() => matchMedia('(prefers-color-scheme: dark)').matches);
  const container = useRef<HTMLDivElement>();
  if (!container.current) {
    container.current = document.getElementById('tidb-ai-widget')! as any;
  }

  const toggleDark = (dark: boolean) => {
    setDark(dark);
    if (dark) {
      container.current?.classList.add('dark');
    } else {
      container.current?.classList.remove('dark');
    }
  };

  useEffect(() => {
    const match = matchMedia('(prefers-color-scheme: dark)');
    const change = () => {
      toggleDark(match.matches);
    };
    match.addEventListener('change', change);
    change();
    return () => {
      match.removeEventListener('change', change);
    };
  }, []);

  useEffect(() => {
    const mo = new MutationObserver(() => {
      toggleDark(document.documentElement.classList.contains('dark'));
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    toggleDark(document.documentElement.classList.contains('dark'));

    return () => {
      mo.disconnect();
    };
  }, []);

  return (
    <PortalProvider container={container.current}>
      <ChatsProvider>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed right-8 bottom-8 flex gap-2 items-center">
              <img src={buttonIcon} alt="Logo" className="size-4" />
              <span>
              {buttonLabel}
            </span>
            </Button>
          </DialogTrigger>
          <DialogPortal container={container.current}>
            <DialogOverlay />
            <DialogPrimitive.Content
              className="fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg w-[calc(100%-32px)] lg:w-[50vw] h-max">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-4">
                  <img className="h-8" src={icon} alt="logo" height={32} />
                  <span className="w-[1px] h-full py-2">
                  <span className="bg-border w-full h-full block" />
                </span>
                  <span>
                  Ask AI
                </span>
                </DialogTitle>
                <DialogDescription className="sr-only">
                  .
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="relative h-[60vh] w-[calc(100vw-82px)] lg:w-[calc(50vw-50px)]">
                <div className="w-[calc(100vw-82px)] lg:w-[calc(50vw-50px)]">
                  <Conversation
                    className="w-full overflow-hidden md:max-w-[unset] md:min-h-[unset] md:p-0 [&>div>section]:pt-4 [&>div>section]:pb-0"
                    open
                    chat={undefined}
                    history={[]}
                    placeholder={(myChat) => (
                      <div className="mt-4 space-y-6">
                        <div className="font-medium text-lg">Example questions:</div>
                        <div className="flex gap-4 flex-wrap">
                          {exampleQuestions.map((question, index) => (
                            <Button
                              key={index}
                              variant="secondary"
                              disabled={!!myChat.ongoingMessageController || !!myChat.pendingPost}
                              onClick={() => myChat.controller.post({ content: question })}>
                              {question}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    preventMutateBrowserHistory
                    preventShiftMessageInput
                  />
                </div>
              </ScrollArea>
              <div className="text-muted-foreground text-xs">Powered by TiDB.ai</div>
            </DialogPrimitive.Content>
          </DialogPortal>
        </Dialog>
      </ChatsProvider>
    </PortalProvider>
  );
}