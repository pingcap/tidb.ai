'use client';

import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { handleErrors } from '@/lib/fetch';
import { CommandIcon, LinkIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

export function SemanticSearch () {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && ((e.metaKey || e.ctrlKey) && e.shiftKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button size="sm" variant="outline" className="hidden md:inline-flex text-xs w-max gap-2 items-center rounded-full cursor-text font-normal text-foreground/70" onClick={() => setOpen(true)}>
        <SearchIcon size="1em" className='hidden md:block lg:hidden' />
        <span className='block md:hidden lg:block'>Search documents...</span>
        <span className="flex-shrink-0 gap-1 items-center rounded-full hidden md:flex">
          <CommandIcon size="1em" /> Shift K
        </span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          <InternalSearchBox />
        </DialogContent>
      </Dialog>
    </>
  );
}

type SearchResult = {
  'queryId': string,
  'relevantChunks': {
    'document_index_chunk_id': string,
    'document_id': string,
    'text_content': string,
    'source_uri': string,
    'score': number,
    'source_name': string,
    'relevance_score': number
  }[]
}

function InternalSearchBox () {
  const [loading, setLoading] = useState(false);
  const [transitioning, startTransition] = useTransition();
  const [result, setResult] = useState<SearchResult>();

  const disabled = loading || transitioning;

  const search = (text: string) => {
    setLoading(true);
    startTransition(() => {
      fetch('/api/v1/indexes/default/retrieve', {
        method: 'post',
        body: JSON.stringify({
          text,
          top_k: 5,
        }),
      }).then(handleErrors)
        .then(res => res.json())
        .then((res: SearchResult) => {
          const set = new Set<string>();
          res.relevantChunks = res.relevantChunks.filter(res => {
            if (set.has(res.source_uri)) {
              return false;
            } else {
              set.add(res.source_uri);
              return true;
            }
          });
          setResult(res);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Search documents..."
        onKeyDown={e => {
          if (!e.nativeEvent.isComposing && e.key === 'Enter' && !disabled) {
            e.preventDefault();
            search(e.currentTarget.value);
          }
        }}
      />
      <CommandList className="relative min-h-20">
        {!result && !disabled && <div className="p-4 my-8 text-center text-xs text-foreground/50 font-semibold">Search anything about your documents with AI embedding!</div>}
        <Loader loading={disabled} />
        {result && <CommandGroup heading="Search results">
          {result.relevantChunks.map(item => (
            <CommandItem key={item.source_uri} value={item.source_uri} className="space-y-1 text-xs block cursor-pointer group" onSelect={() => window.open(item.source_uri, '_blank')}>
              <div className="flex gap-1 items-center whitespace-nowrap overflow-hidden overflow-ellipsis font-bold">
                <LinkIcon size="1em" />
                {item.source_name}
              </div>
              <div className='text-muted-foreground'>
                {item.source_uri}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>}
      </CommandList>
    </Command>
  );
}
