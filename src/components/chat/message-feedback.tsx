import type { ContentSource } from '@/components/chat/use-message-feedback';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { type ReactElement, useEffect, useState } from 'react';

export function MessageFeedback ({ initial, source, sourceLoading, onFeedback, children }: { initial?: { detail: Record<string, 'like' | 'dislike'>, comment: string }, source: ContentSource | undefined, sourceLoading: boolean, onFeedback: (detail: Record<string, 'like' | 'dislike'>, comment: string) => Promise<void>, children: ReactElement }) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<Record<string, 'like' | 'dislike'>>(() => (initial ?? {}));
  const [comment, setComment] = useState(initial?.comment ?? '');
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (initial) {
      setDetail(initial.detail);
      setComment(initial.comment);
    }
  }, [initial])

  const disabled = running || !!initial;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Feedback
          </DialogTitle>
        </DialogHeader>
        <h6 className="text-sm">Sources from Knowledge Graph</h6>
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
        <Textarea
          placeholder="Comments..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          disabled={disabled}
        />
        <Button
          className="w-full gap-2"
          disabled={disabled}
          onClick={() => {
            setRunning(true);
            onFeedback(detail, comment)
              .then(() => setOpen(false))
              .finally(() => {
                setRunning(false);
              });
          }}>
          {running && <Loader2Icon className="w-4 h-4 animate-spin repeat-infinite" />}
          Add feedback
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function SourceActions ({ disabled, current, onChange }: { current: 'like' | 'dislike' | undefined, onChange: (action: 'like' | 'dislike' | undefined) => void, disabled: boolean }) {
  switch (current) {
    case 'like':
      return (
        <Button disabled={disabled} className="w-7 h-7 rounded-full flex-shrink-0" variant="ghost" size="icon" onClick={() => onChange(undefined)}>
          <ThumbsUpIcon className="w-4 h-4 fill-current" />
        </Button>
      );

    case 'dislike':
      return (
        <Button disabled={disabled} className="w-7 h-7 rounded-full flex-shrink-0" variant="ghost" size="icon" onClick={() => onChange(undefined)}>
          <ThumbsDownIcon className="w-4 h-4 fill-current" />
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
