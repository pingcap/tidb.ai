import { Badge, badgeVariants } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';

type ModelBase = {
  provider: string
  id: number
  name: string
  model: string
}

export interface ModelComponentInfoProps<Model extends ModelBase> {
  className?: string;
  isLoading: boolean;
  model: Model | undefined;
  detailed?: boolean;
  reverse?: boolean;
  url: (model: Model) => string;
  defaultName?: string;
}

export function ModelComponentInfo<Model extends ModelBase> ({ className, reverse = false, detailed = false, isLoading, model, url, defaultName }: ModelComponentInfoProps<Model>) {

  if (isLoading) {
    return <Loader2Icon className={cn('size-4 animate-spin repeat-infinite', className)} />;
  }

  if (!model) {
    return defaultName && <Badge variant="outline" className={cn('text-muted-foreground', className)}>{defaultName}</Badge>;
  }

  return (
    <span className={cn('flex gap-1 items-center', reverse && 'flex-row-reverse', className)}>
      {detailed && <Badge variant="secondary"><span className="font-bold">{model.provider}</span>:<span className="opacity-50">{model.model}</span></Badge>}
      <Link className={badgeVariants({ variant: detailed ? 'default' : 'secondary' })} href={url(model)}>{model.name}</Link>
    </span>
  );
}
