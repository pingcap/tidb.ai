import type { KnowledgeBase } from '@/api/knowledge-base';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function KnowledgeBaseCard ({ knowledgeBase }: { knowledgeBase: KnowledgeBase }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {knowledgeBase.name}
        </CardTitle>
        <CardDescription>
          {knowledgeBase.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>

      </CardFooter>
    </Card>
  );
}