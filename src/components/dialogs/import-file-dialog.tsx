import { ImportDialog } from '@/components/dialogs/import-dialog';
import { Button } from '@/components/ui/button';
import { FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';
import { UploadIcon } from 'lucide-react';

type UploadFileFormValues = {
  file: File;
  sourceUri: string;
}

export function ImportFileDialog () {
  return (
    <ImportDialog
      trigger={<Button className='gap-1' size="sm" variant="secondary">Upload file<UploadIcon size='1em' /></Button>}
      title="Upload file"
      onSubmit={uploadFile}>
      <FormItem>
        <FormField
          name="file"
          render={({ field: { onChange, value, ...field } }) => <Input type="file" {...field} onChange={e => onChange(e.target.files?.item(0))} />}
        />
        <FormDescription>
          Text, html, markdown or PDF
        </FormDescription>
      </FormItem>
      <FormItem>
        <FormLabel>Source URL</FormLabel>
        <FormField
          name="sourceUri"
          render={({ field }) => <Input {...field} />}
        />
        <FormDescription>
          Source URL is useful when AI generating answers.
        </FormDescription>
      </FormItem>
    </ImportDialog>
  );
}

const uploadFile = withToast(async ({ file, sourceUri }: UploadFileFormValues) => {
  const formData = new FormData();
  formData.set('file', file);
  formData.set('sourceUri', sourceUri);

  await fetch('/api/v1/documents', {
    method: 'put',
    body: formData,
  }).then(handleErrors);
});
