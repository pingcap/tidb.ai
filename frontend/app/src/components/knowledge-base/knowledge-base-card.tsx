import type { KnowledgeBaseSummary } from '@/api/knowledge-base';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Book, Ellipsis } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, startTransition } from 'react';

export function KnowledgeBaseCard ({ knowledgeBase, children }: { knowledgeBase: KnowledgeBaseSummary, children?: ReactNode }) {
  const router = useRouter();

  const handleCardClick = () => {
    startTransition(() => {
      router.push(`/knowledge-bases/${knowledgeBase.id}`);
    });
  };

  const handleMenuItemSettingSelect = () => {
    startTransition(() => {
      router.push(`/knowledge-bases/${knowledgeBase.id}/settings`);
    });
  };

  return (
    <Card className="cursor-pointer transition-colors hover:bg-muted/50 max-h-64" onClick={handleCardClick}>
      <CardHeader className="p-4">
        <div className="flex justify-start space-x-4">
          <div className="flex border w-10 h-10 rounded-md justify-center items-center bg-secondary">
            <Book className="size-5" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold">{knowledgeBase.name}</h4>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{knowledgeBase.documents_total ?? 0} documents</span>
              <span className="shrink-0 mx-0.5 px-1">·</span>
              <span>{knowledgeBase.data_sources_total ?? 0} data sources</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-xs line-clamp-2 text-muted-foreground">
          {knowledgeBase.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm p-2">
        <div className="flex items-center gap-2 pl-2">
          {knowledgeBase.index_methods.map(m => <Badge key={m} variant="secondary">{m}</Badge>)}
        </div>
        <div>
          <Separator orientation="vertical" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Ellipsis className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onSelect={handleMenuItemSettingSelect} onClick={(e: any) => e.stopPropagation()}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500" disabled={true}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}

export function KnowledgeBaseCardPlaceholder () {
  return (
    <Card className="max-h-64">
      <CardHeader className="p-4">
        <div className="flex justify-start space-x-4">
          <Skeleton className="size-10" />
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold"><Skeleton className="w-28 h-[1em] mt-[0.25em] mb-[0.5em]" /></h4>
            <div className="flex items-center text-xs text-muted-foreground gap-2">
              <Skeleton className="w-16 h-[1em]" />
              <Skeleton className="w-24 h-[1em]" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-xs line-clamp-2">
          <Skeleton className="w-full h-[1em] my-[0.25em]" />
          <Skeleton className="w-[70%] h-[1em] my-[0.25em]" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center text-sm p-2">
        <div className="flex items-center gap-2 pl-2">
          <Skeleton className="rounded-full w-16 h-[1.25em]" />
          <Skeleton className="rounded-full w-24 h-[1.25em]" />
        </div>
      </CardFooter>
    </Card>
  );
}