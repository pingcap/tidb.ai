import GithubSvg from '@/components/icons/github.svg';
import TwitterXSvg from '@/components/icons/twitter-x.svg';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useHref } from '@/components/use-href';
import { useUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { LogInIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export type SiteSocialsType = {
  github?: string;
  twitter?: string;
};

export function SiteNavFooter ({ className, social }: { className?: string, social?: SiteSocialsType }) {
  return (
    <div className={cn('w-full', className)}>
      <div className={'h-header p-2 w-full border-t flex gap-0.5 items-center'}>
        <User />
      </div>
      <SiteNavActionBar className='border-t flex md:hidden p-2' social={social} />
    </div>
  );
}

export function SiteNavActionBar(props: {
  className?: string;
  social?: SiteSocialsType;
}) {
  const { className, social = {} } = props;
  return (
    <div className={clsx('h-header w-full gap-0.5 items-center', className)}>
      <ThemeToggle />
      {social?.github && (
        <NextLink href={social.github} target='_blank' className='ml-auto' >
          <Button size='icon' variant='ghost' className='rounded-full'>
            <GithubSvg />
          </Button>
        </NextLink>
      )}

      {social.twitter && (
        <NextLink href={social.twitter} target='_blank' className=''>
          <Button size='icon' variant='ghost' className='rounded-full'>
            <TwitterXSvg />
          </Button>
        </NextLink>
      )}
    </div>
  );
}

function User () {
  const href = useHref();
  const user = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <Button variant="ghost" asChild>
        <NextLink href={`/auth/login?callbackUrl=${encodeURIComponent(href)}`} prefetch={false} className="items-center w-full gap-2">
          <LogInIcon size="1em" />
          Login
        </NextLink>
      </Button>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="border dark:bg-primary bg-primary-foreground p-0.5 w-8 h-8">
            {user.image && <AvatarImage src={user.image} />}
            <AvatarFallback className="text-xs">
              {user.image ? <Skeleton className="w-full h-full" /> : user.name}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent collisionPadding={8} side="top">
          <DropdownMenuItem onClick={() => {
            signOut().finally(() => {
              router.refresh();
            });
          }}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="text-sm font-semibold">
        {user.name}
      </span>
    </div>
  );
}
