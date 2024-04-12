import { getIndexByName } from '@/core/repositories/index_';
import { defaultCondenseQuestionPrompt, defaultRefinePrompt, defaultTextQaPrompt } from 'llamaindex';
import ClientPage from './page.client';

export default async function Page () {
  const index = await getIndexByName('default');

  return (
    <ClientPage
      defaultIndexId={index?.id ?? 0}
      defaultCondenseQuestionPrompt={defaultCondenseQuestionPrompt({ chatHistory: '{{chatHistory}}', question: '{{question}}' })}
      defaultTextQaPrompt={defaultTextQaPrompt({ context: '{{context}}', query: '{{query}}' })}
      defaultRefinePrompt={defaultRefinePrompt({ query: '{{query}}', context: '{{context}}', existingAnswer: '{{existingAnswer}}' })}
    />
  );
}