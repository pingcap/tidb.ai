import { handleErrors, ServerError } from '@/lib/request';
import { cn } from '@/lib/utils';

type Status = {
  html_url: string
  status: 'diverged' | 'identical' | 'ahead' | 'behind'
  ahead_by: number
  behind_by: number
}

export interface VersionStatusProps {
  gitCommitHash?: string | null;
}

export async function VersionStatus ({ gitCommitHash }: VersionStatusProps) {
  if (!gitCommitHash) {
    return <span className="text-xs text-muted-foreground">No git revision info</span>;
  }
  try {
    const response = await fetch(`https://api.github.com/repos/pingcap/tidb.ai/compare/HEAD...${gitCommitHash}`, {
      headers: {
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }).then(handleErrors);
    const data: Status = await response.json();
    switch (data.status) {
      case 'identical':
        return <span><StatusDot className="bg-green-500" />Updated</span>;
      case 'ahead':
        return <span><StatusDot className="text-yellow-500" />{data.ahead_by} commits ahead</span>;
      case 'behind':
        return <span><StatusDot className="text-yellow-500" />{data.behind_by} commits behind</span>;
      case 'diverged':
        return <span><StatusDot className="text-yellow-500" />{data.ahead_by} commits ahead, {data.behind_by} commits behind.</span>;
    }
  } catch (e) {
    if (e instanceof ServerError) {
      if (e.response.status === 404) {
        return <span className="text-xs text-muted-foreground"><StatusDot className="text-zink-500" />Revision not found</span>;
      }
    }
    console.error(e);
    return <span className="text-xs text-muted-foreground"><StatusDot className="text-red-500" />Failed to get revision info</span>;
  }
}

function StatusDot ({ className }: { className: string }) {
  return <span className={cn('inline-block w-1.5 h-1.5 rounded-full mr-1 bg-current', className)} />;
}