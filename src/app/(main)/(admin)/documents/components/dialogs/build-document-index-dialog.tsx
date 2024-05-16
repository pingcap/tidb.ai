import {BuildDocumentIndexOptions, BuildDocumentIndexOptionsSchema} from "@/app/api/v1/documents/index/schema";
import {buildDocumentIndex} from '@/client/operations/documents';
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {Switch} from "@/components/ui/switch";
import {IndexProviderName} from "@/core/schema/indexes";
import type {Document} from "@/core/repositories/document";
import type {Index} from "@/core/repositories/index_";
import {getErrorMessage} from "@/lib/errors";
import {fetcher} from "@/lib/fetch";
import {zodResolver} from "@hookform/resolvers/zod";
import {Row} from "@tanstack/table-core";
import {AlertTriangleIcon} from "lucide-react";
import {ReactNode, useState} from "react";
import {useForm} from "react-hook-form";
import useSWR from "swr";

export interface BuildDocumentIndexDialogProps {
  trigger?: ReactNode;
  documentRows: Row<Document>[];
  open: boolean;
  handleOpenChange: (open: boolean) => void;
}

export function BuildDocumentIndexDialog (props: BuildDocumentIndexDialogProps) {
  const { trigger, documentRows, open, handleOpenChange} = props;

  // Selected documents.
  const documents = documentRows.map((documentRow) => documentRow.original);
  const documentIds = documentRows.map((documentRow) => Number(documentRow.id));

  // Index options.
  const { data: indexData } = useSWR(['get', '/api/v1/indexes'], fetcher<any>);
  const indexes = indexData?.data || [];

  // Form instance.
  const form = useForm<BuildDocumentIndexOptions>({
    defaultValues: {
      indexName: 'default',
      documentIds: documentIds,
      runInBackground: true
    },
    resolver: zodResolver(BuildDocumentIndexOptionsSchema),
  });

  // UI state.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  // Handlers.
  const handleSubmit = form.handleSubmit(async (value) => {
    try {
      setLoading(true);
      await buildDocumentIndex(value);
      handleOpenChange(false);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {
        trigger && (<DialogTrigger asChild>{trigger}</DialogTrigger>)
      }
      <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
        <DialogHeader>Build document index</DialogHeader>
        <DialogDescription>Building index for the specify documents</DialogDescription>
        <Form {...form}>
          <form id="build-index-form" className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="indexName"
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Index</FormLabel>
                  <FormDescription>Select the index you want to build</FormDescription>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Specify a index" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          indexes.map((index: Index) => (
                            <SelectItem key={index.name} value={index.name}>
                              <span>{index.name}</span>
                              {
                                index.config?.provider === IndexProviderName.KNOWLEDGE_GRAPH && (
                                  <Badge className="ml-2">knowledge-graph</Badge>
                                )
                              }
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              }}
            />
            <FormField
              control={form.control}
              name="documentIds"
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Documents { documents ? `(${documents.length})` : ''}</FormLabel>
                  <FormDescription>Confirm the documents that need to be indexed</FormDescription>
                  <FormControl>
                    <ScrollArea className="h-72 w-full rounded-md border">
                      <div className="p-4">
                        {(documents || [])
                          .map((document: Document, i: number, arr: Document[]) => {
                            return (
                              <>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id={`select-document-${document.id}`} disabled={true} checked/>
                                  <label
                                    htmlFor={`select-document-${document.id}`}
                                    className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-5"
                                  >
                                    {document.name}
                                  </label>
                                </div>
                                {
                                  (i !== arr.length - 1) &&
                                    <Separator className="my-2"/>
                                }
                              </>
                            )
                          })}
                      </div>
                    </ScrollArea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />
            <FormField
              control={form.control}
              name="runInBackground"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Build in background</FormLabel>
                    <FormDescription>
                      Building index in the background, and the indexing progress can be checked in the Index Tasks page
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
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
          <Button form="build-index-form" type="submit" disabled={loading}>Start</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
