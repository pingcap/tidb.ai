import type { KnowledgeBaseSummary } from '@/api/knowledge-base';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReactNode } from 'react';

export function KnowledgeBaseCard ({ knowledgeBase, children }: { knowledgeBase: KnowledgeBaseSummary, children?: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {knowledgeBase.name}
          {knowledgeBase.index_methods.map(m => <Badge key={m} className="ml-2" variant="secondary">{m}</Badge>)}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {knowledgeBase.description}
        </CardDescription>
      </CardHeader>
      {children != null && <CardFooter className="gap-4">
        {children}
      </CardFooter>}
    </Card>
  );
}