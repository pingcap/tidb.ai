import type { ContentSource } from '@/components/chat/use-message-feedback';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { Feedback } from '@/core/repositories/feedback';
import { Loader2Icon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { type ReactElement, useEffect, useState } from 'react';

export function MessageFeedback ({ initial, source, sourceLoading, onFeedback, onDeleteFeedback, children }: { initial?: Feedback, source: ContentSource | undefined, sourceLoading: boolean, onFeedback: (action: 'like' | 'dislike', detail: Record<string, 'like' | 'dislike'>, comment: string) => Promise<void>, onDeleteFeedback: () => Promise<void>, children: ReactElement }) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<'like' | 'dislike'>(initial?.action ?? 'like');
  const [detail, setDetail] = useState<Record<string, 'like' | 'dislike'>>(() => (initial ?? {}));
  const [comment, setComment] = useState(initial?.comment ?? '');
  const [running, setRunning] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (initial) {
      setAction(initial.action);
      setDetail(initial.knowledge_graph_detail);
      setComment(initial.comment);
    }
  }, [initial]);

  const disabled = running || deleting || !!initial;
  const deleteDisabled = running || deleting || !initial;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>
            Feedback
          </DialogTitle>
        </DialogHeader>
        <section className="space-y-2">
          <h6 className="text-sm font-bold">Do you like this answer</h6>
          <ToggleGroup disabled={disabled} className="w-max" type="single" value={action} onValueChange={value => setAction(value as any)}>
            <ToggleGroupItem value="like" className="data-[state=on]:text-green-500 data-[state=on]:bg-green-500/5">
              <ThumbsUpIcon className="w-4 h-4 mr-2" />
              Like
            </ToggleGroupItem>
            <ToggleGroupItem value="dislike" className="data-[state=on]:text-red-500 data-[state=on]:bg-red-500/5">
              <ThumbsDownIcon className="w-4 h-4 mr-2" />
              Dislike
            </ToggleGroupItem>
          </ToggleGroup>
        </section>
        <section className="space-y-2">
          <h6 className="text-sm font-bold">Sources from Knowledge Graph</h6>
          {!source && sourceLoading && <div className="flex gap-2 items-center"><Loader2Icon className="w-4 h-4 animate-spin repeat-infinite" /> Loading...</div>}
          {source && (
            <ul>
              {source.markdownSources.kgRelationshipUrls.map(url => (
                <li key={url} className="flex gap-2 items-start p-2 border-b last-of-type:border-b-0">
                  <div className="flex-1 overflow-hidden w-0">
                    <a className="block w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs" href={url} target="_blank">
                    <span>
                      {url}
                    </span>
                    </a>
                    <p className="line-clamp-3 text-xs text-muted-foreground">{source.kgSources[url].description}</p>
                  </div>
                  <SourceActions
                    disabled={disabled}
                    current={detail[url]}
                    onChange={action => setDetail(detail => {
                      if (action) {
                        return { ...detail, [url]: action };
                      } else {
                        detail = { ...detail };
                        delete detail[url];
                        return detail;
                      }
                    })}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <Textarea
            placeholder="Comments..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={disabled}
          />
        </section>
        <div className="flex w-full justify-end items-center gap-2">
          <Button
            className="gap-2"
            disabled={disabled}
            onClick={() => {
              setRunning(true);
              onFeedback(action, detail, comment)
                .then(() => setOpen(false))
                .finally(() => {
                  setRunning(false);
                });
            }}>
            {running && <Loader2Icon className="w-4 h-4 animate-spin repeat-infinite" />}
            Add feedback
          </Button>
          <Button
            className="gap-2 hover:text-destructive hover:bg-transparent"
            variant="ghost"
            disabled={deleteDisabled}
            type='button'
            onClick={() => {
              setDeleting(true);
              onDeleteFeedback()
                .then(() => {
                  setOpen(false);
                  setAction('like');
                  setComment('');
                  setDetail({});
                })
                .finally(() => {
                  setDeleting(false);
                });
            }}
          >
            Cancel feedback
            {deleting && <Loader2Icon className="w-4 h-4 animate-spin repeat-infinite" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SourceActions ({ disabled, current, onChange }: { current: 'like' | 'dislike' | undefined, onChange: (action: 'like' | 'dislike' | undefined) => void, disabled: boolean }) {
  switch (current) {
    case 'like':
      return (
        <Button disabled={disabled} className="w-7 h-7 rounded-full flex-shrink-0" variant="ghost" size="icon" onClick={() => onChange(undefined)}>
          <ThumbsUpIcon className="w-4 h-4 fill-green-500/10 stroke-green-500" />
        </Button>
      );

    case 'dislike':
      return (
        <Button disabled={disabled} className="w-7 h-7 rounded-full flex-shrink-0" variant="ghost" size="icon" onClick={() => onChange(undefined)}>
          <ThumbsDownIcon className="w-4 h-4 fill-red-500/10 stroke-red-500" />
        </Button>
      );

    default:
      return (
        <div className="flex gap-1 items-center flex-shrink-0">
          <Button disabled={disabled} className="w-7 h-7 rounded-full" variant="ghost" size="icon" onClick={() => onChange('like')}>
            <ThumbsUpIcon className="w-4 h-4" />
          </Button>
          <Button disabled={disabled} className="w-7 h-7 rounded-full" variant="ghost" size="icon" onClick={() => onChange('dislike')}>
            <ThumbsDownIcon className="w-4 h-4" />
          </Button>
        </div>
      );
  }
}
