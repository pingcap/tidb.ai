import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DotIcon } from 'lucide-react';

export interface MessageProps {
  id: string;
  username: string;
  avatarUrl?: string;
  content: string;
  time: Date;
}

export function Message ({ username, avatarUrl, content, time }: MessageProps) {
  return (
    <div className="flex gap-2">
      <div className="flex-shrink-0">
        <Avatar className="rounded-lg">
          <AvatarFallback className="rounded-lg">
            {username}
          </AvatarFallback>
          {avatarUrl && <AvatarImage className="rounded-lg" src={avatarUrl} alt={username} />}
        </Avatar>
      </div>
      <div className="space-y-2">
        <div className="text-xs text-foreground/70 flex items-center justify-between">
          <span>
            @{username}
          </span>
          <time>
            {time.toString()}
          </time>
        </div>
        <Card>
          <CardContent className='p-4 text-sm text-secondary-foreground'>
            {content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}