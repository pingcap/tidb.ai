import {
  ImportDocumentsFromUrlsOptions,
  ImportDocumentsFromUrlsOptionsSchema
} from "@/app/api/v1/documents/import/from/urls/schema";
import {BuildDocumentIndexOptionsSchema} from "@/app/api/v1/documents/index/schema";
import {importDocuments} from '@/client/operations/documents';
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import {Form, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {getErrorMessage} from "@/lib/errors";
import {zodResolver} from "@hookform/resolvers/zod";
import {AlertTriangleIcon} from "lucide-react";
import {ReactNode, useState} from "react";
import {useForm} from "react-hook-form";

export interface ImportDocumentsDialogProps {
  trigger: ReactNode;
}

export function ImportDocumentsDialog (props: ImportDocumentsDialogProps) {
  const { trigger } = props;
  const [open, setOpen] = useState(false);

  // Form instance.
  const form = useForm<ImportDocumentsFromUrlsOptions>({
    defaultValues: {},
    resolver: zodResolver(ImportDocumentsFromUrlsOptionsSchema),
  });

  // UI state.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  // Handlers.
  const handleSubmit = form.handleSubmit(async (value) => {
    try {
      setLoading(true);
      await importDocuments({
        ...value,
        urls: value.urls.map(url => url.trim()).filter(Boolean),
      });
      setOpen(false);
    } catch (e) {
      console.log(e)
      setError(e);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {
        trigger && (<DialogTrigger asChild>{trigger}</DialogTrigger>)
      }
      <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
        <DialogHeader>Import documents</DialogHeader>
        <DialogDescription>Import documents from urls (one URL per line)</DialogDescription>
        <Form {...form}>
          <form id="import-document-form" className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="urls"
              render={({ field }) => {
                return <FormItem>
                  <Textarea {...field} value={(field.value ?? []).join('\n')} onChange={(e) => {
                    return field.onChange((e.target.value ?? '').split('\n'))
                  }} />
                  <FormMessage />
                </FormItem>
              }}
            />
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
          <Button form="import-document-form" type="submit" disabled={loading}>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
