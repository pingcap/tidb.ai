import { updateChatEngine } from '@/client/operations/chat_engines';
import {BasicFormDialog} from "@/components/dialogs/basic-form-dialog";
import { ChatEngineFields } from '@/components/dialogs/create-chat-engine-dialog';
import { Button } from '@/components/ui/button';
import {CreateChatEngineOptions, CreateChatEngineOptionsSchema} from "@/core/config/chat_engines";

export type UpdateChatEngineDialogProps = {
  id: number,
  defaultValues: CreateChatEngineOptions
};

export function UpdateChatEngineDialog ({ id, defaultValues }: UpdateChatEngineDialogProps) {
  return (
    <BasicFormDialog
      title="Update Chat Engine Options"
      trigger={<Button className="gap-1" size="sm" variant="secondary">Update Config</Button>}
      fromId={`update-chat-engine-form-${id}`}
      schema={CreateChatEngineOptionsSchema}
      defaultValues={defaultValues}
      submitButtonTitle="Update"
      onSubmit={data => updateChatEngine(id, data)}
    >
      <ChatEngineFields />
    </BasicFormDialog>
  );
}
