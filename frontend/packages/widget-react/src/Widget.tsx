import type { BootstrapStatus } from '@/api/system';
import { ManualScrollVoter } from '@/components/auto-scroll';
import { AutoScroll } from '@/components/auto-scroll/auto-scroll';
import { ChatsProvider } from '@/components/chat/chat-hooks';
import { Conversation } from '@/components/chat/conversation';
import { useGtagFn } from '@/components/gtag-provider';
import { PortalProvider } from '@/components/portal-provider';
import { BootstrapStatusProvider } from '@/components/system/BootstrapStatusProvider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type ExperimentalFeatures, ExperimentalFeaturesProvider } from '@/experimental/experimental-features-provider';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './Widget.css';

export interface WidgetProps {
  trigger?: HTMLElement | true | null;
  container: HTMLElement;
  bootstrapStatus: BootstrapStatus;
  experimentalFeatures: Partial<ExperimentalFeatures>;
  exampleQuestions: string[];
  buttonLabel: string;
  buttonIcon: string;
  icon: string;
  disableAutoThemeDetect?: boolean;
}

export interface WidgetInstance {
  open: boolean;
  dark: boolean;
  initialized: true;
}

export const Widget = forwardRef<WidgetInstance, WidgetProps>(({ container, trigger, experimentalFeatures, disableAutoThemeDetect = false, bootstrapStatus, exampleQuestions, icon, buttonIcon, buttonLabel }, ref) => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => matchMedia('(prefers-color-scheme: dark)').matches);
  const openRef = useRef(open);
  const darkRef = useRef(dark);
  const [scrollTarget, setScrollTarget] = useState<HTMLDivElement | null>(null);
  const gtagFn = useGtagFn();

  useEffect(() => {
    openRef.current = open;
    darkRef.current = dark;
  });

  const toggleDark = (dark: boolean) => {
    setDark(dark);
  };

  useEffect(() => {
    if (disableAutoThemeDetect) {
      return;
    }
    const match = matchMedia('(prefers-color-scheme: dark)');
    const change = () => {
      toggleDark(match.matches);
    };
    match.addEventListener('change', change);
    change();
    return () => {
      match.removeEventListener('change', change);
    };
  }, [disableAutoThemeDetect]);

  useEffect(() => {
    if (disableAutoThemeDetect) {
      return;
    }
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
  }, [disableAutoThemeDetect]);

  useEffect(() => {
    if (dark) {
      container.classList.add('dark');
    } else {
      container.classList.remove('dark');
    }
  }, [dark]);

  useEffect(() => {
    if (trigger && trigger !== true) {
      const open = () => {
        setOpen(true);
        gtagFn('event', 'tidbai.events.open-widget-dialog');
      };
      trigger.addEventListener('click', open);
      return () => {
        trigger.removeEventListener('click', open);
      };
    }
  }, [trigger]);

  useImperativeHandle(ref, () => ({
    get open () {
      return openRef.current;
    },
    set open (o) {
      if (o) {
        gtagFn('event', 'tidbai.events.open-widget-dialog');
      }
      setOpen(o);
    },
    get dark () {
      return darkRef.current;
    },
    set dark (d) {
      setDark(d);
    },
    get initialized (): true { return true; },
  }), []);

  return (
    <PortalProvider container={container}>
      <BootstrapStatusProvider bootstrapStatus={bootstrapStatus}>
        <ExperimentalFeaturesProvider features={experimentalFeatures}>
          <ChatsProvider>
            <Dialog open={open} onOpenChange={(open) => {
              setOpen(open);
              if (!open) {
                gtagFn('event', 'tidbai.events.close-widget-dialog');
              }
            }}>
              {!trigger && <DialogTrigger asChild>
                <Button id="tidb-ai-widget-trigger" className="hidden sm:flex fixed right-8 bottom-8 gap-2 items-center" onClick={() => {
                  gtagFn('event', 'tidbai.events.open-widget-dialog');
                }}>
                  <img src={buttonIcon} alt="Logo" className="size-4" />
                  <span>
                  {buttonLabel}
                </span>
                </Button>
              </DialogTrigger>}
              <DialogPortal container={container}>
                <DialogOverlay />
                <DialogPrimitive.Content
                  className="fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg w-[calc(100%-32px)] lg:w-[50vw]">
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
                  <AutoScroll target={scrollTarget} edgePixels={12}>
                    <ManualScrollVoter />
                    <ScrollArea viewportRef={setScrollTarget} className="relative h-[60vh] w-[calc(100vw-82px)] lg:w-[calc(50vw-50px)]">
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
                                    disabled={!!myChat.postState.params}
                                    onClick={() => myChat.post({ content: question })}>
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
                    <div className="text-muted-foreground text-xs">
                      Powered by <a className="underline" href="https://github.com/pingcap/tidb.ai" target="_blank">pingcap/tidb.ai</a>, deploy your own for free.
                    </div>
                  </AutoScroll>
                </DialogPrimitive.Content>
              </DialogPortal>
            </Dialog>
          </ChatsProvider>
        </ExperimentalFeaturesProvider>
      </BootstrapStatusProvider>
    </PortalProvider>
  );
});
