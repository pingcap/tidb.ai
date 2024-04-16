import { type CreateChatEngineFormValues, updateChatEngine } from '@/client/operations/chat_engines';
import { ChatEngineFields } from '@/components/dialogs/create-chat-engine-dialog';
import { ImportDialog } from '@/components/dialogs/import-dialog';
import { Button } from '@/components/ui/button';

export function UpdateChatEngineDialog ({
  id,
  defaultValues,
}: {
  id: number,
  defaultValues: CreateChatEngineFormValues
}) {
  return (
    <ImportDialog
      trigger={<Button className="gap-1" size="sm" variant="secondary">Update</Button>}
      title="Update Chat Engine Options"
      submitTitle="Update"
      onSubmit={data => updateChatEngine(id, data)}
      defaultValues={defaultValues}
    >
      <ChatEngineFields />
    </ImportDialog>
  );
}
