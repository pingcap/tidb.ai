// GET https://api.github.com/repos/pingcap/tidb.ai/compare/399279a0a6838dfe109ef627138a3612b915f1fd...d5d536
// X-GitHub-Api-Version: 2022-11-28

import { handleErrors } from '@/lib/request';

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
        return <span>Updated</span>;
      case 'ahead':
        return <span>{data.ahead_by} commits ahead</span>;
      case 'behind':
        return <span>{data.behind_by} commits behind</span>;
      case 'diverged':
        return <span>{data.ahead_by} commits ahead, {data.behind_by} commits behind.</span>;
    }
  } catch {
    return <span className="text-xs text-muted-foreground">Failed to get revision info</span>;
  }
}