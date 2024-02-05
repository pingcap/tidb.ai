import { LiquidEditor } from '@/app/(main)/(admin)/extensions/rag.prompting.direct/config/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import database from '@/core/db';
import { DirectPrompting } from '@/rag-spec/promptings/DirectPrompting';
import { notFound } from 'next/navigation';

export default async function Page () {
  const index = await database.index.findByName('default');
  if (!index) {
    notFound();
  }

  const config: DirectPrompting.Options = (index.config as any)['rag.prompting.direct'];

  return (
    <form className="space-y-4">
      <h1 className="text-xl font-semibold">{DirectPrompting.displayName} | Configuration</h1>
      <div className="space-y-2">
        <label>Retrieve Top K results</label>
        <Input name="top_k" type="number" defaultValue={config.top_k} />
      </div>
      <div className="space-y-2">
        <label>Prompt template</label>
        <LiquidEditor name="template" defaultValue={config.template} />
      </div>
      <div className="flex gap-2 items-center">
        <Button>Save</Button>
        <Button variant="ghost">Reset to defaults</Button>
      </div>
    </form>
  );
}