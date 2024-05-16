import {ChatEngineFields} from "@/app/(main)/(admin)/chat-engines/components/create-chat-engine-dialog";
import {updateChatEngine} from "@/client/operations/chat_engines";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import {Form} from '@/components/ui/form';
import {CreateChatEngineOptions, CreateChatEngineOptionsSchema} from "../../../../../core/schema/chat_engines";
import {getErrorMessage} from "@/lib/errors";
import {zodResolver} from "@hookform/resolvers/zod";
import {AlertTriangleIcon} from "lucide-react";
import {ReactNode, useState} from "react";
import {useForm} from "react-hook-form";

export type UpdateChatEngineDialogProps = {
  trigger: ReactNode;
  chatEngineId: number,
  defaultValues: CreateChatEngineOptions,
  open: boolean;
  handleOpenChange: (open: boolean) => void;
};

export function UpdateChatEngineDialog ({
  trigger,
  open,
  handleOpenChange,
  chatEngineId,
  defaultValues
}: UpdateChatEngineDialogProps) {
  // Form.
  const form = useForm<CreateChatEngineOptions>({
    defaultValues,
    resolver: zodResolver(CreateChatEngineOptionsSchema),
  });

  // UI state.
  const fromId = "update-chat-engine-from";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  // Handlers.
  const handleSubmit = form.handleSubmit(async (value) => {
    try {
      setLoading(true);
      await updateChatEngine(chatEngineId, value);
      handleOpenChange(false);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] min-w-[30vw] overflow-x-hidden overflow-y-auto">
        <DialogHeader>Update Chat Engine</DialogHeader>
        <DialogDescription>Update the config of chat engine as you need.</DialogDescription>
        <Form {...form}>
          <form id={fromId} className="space-y-4" onSubmit={handleSubmit}>
            <ChatEngineFields mode="update" />
          </form>
        </Form>
        {!!error && (
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4"/>
            <AlertTitle>
              Failed to operate
            </AlertTitle>
            <AlertDescription>
              {getErrorMessage(error)}
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <Button form={fromId} type="submit" disabled={loading}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
