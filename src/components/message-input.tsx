import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function MessageInput ({ className }: { className?: string }) {
  return (
    <div className={cn('bg-background flex gap-2', className)}>
      <div className="p-4 flex gap-2 items-start w-full h-full">
        <Avatar className="rounded-lg">
          <AvatarFallback className="rounded-lg">
            Me
          </AvatarFallback>
        </Avatar>
        <Textarea className="h-full flex-1 resize-none" placeholder="Edit...">
        </Textarea>
        <Button className="h-full flex-col gap-1">
          Send
        </Button>
      </div>
    </div>
  );
}