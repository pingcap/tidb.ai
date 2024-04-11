import { ImportDialog } from '@/components/dialogs/import-dialog';
import { Button } from '@/components/ui/button';
import { FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { importWebsite, type ImportWebsiteFormValues } from '@/operations/documents';
import { ImportIcon } from 'lucide-react';

export function ImportSiteDialog () {
  return (
    <ImportDialog<ImportWebsiteFormValues>
      trigger={(
        <Button size="sm" className="gap-1">
          Import website
          <ImportIcon size="1em" />
        </Button>
      )}
      title="Import website"
      onSubmit={importWebsite}
    >
      <FormItem>
        <FormLabel>URL List</FormLabel>
        <FormField
          name="uriList"
          render={({ field }) => <Textarea {...field} />}
        />
        <FormDescription>
          One line for each url. Make sure your site has <code>robots.txt</code> containing sitemap.
        </FormDescription>
      </FormItem>
    </ImportDialog>
  );
}
