import {BasicFormDialog} from "@/components/dialogs/basic-form-dialog";

import { Button } from '@/components/ui/button';
import { FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { importWebsite, type ImportWebsiteFormValues } from '@/client/operations/documents';
import { ImportIcon } from 'lucide-react';

export function ImportSiteDialog () {
  return (
    <BasicFormDialog<ImportWebsiteFormValues>
      fromId="import-site-form"
      trigger={(
        <Button size="sm" className="gap-1">
          Import website
          <ImportIcon size="1em" />
        </Button>
      )}
      title="Import website"
      onSubmit={importWebsite}
      submitButtonTitle={'Import'}
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
    </BasicFormDialog>
  );
}
