import {BasicFormDialog} from "@/components/dialogs/basic-form-dialog";

import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {buildDocumentIndex, BuildDocumentIndexOptions} from '@/client/operations/documents';
import type {ReactElement} from "react";

export function BuildDocumentIndexDialog (trigger: ReactElement) {
  return (
    <BasicFormDialog<BuildDocumentIndexOptions>
      fromId="build-document-index-form"
      trigger={trigger}
      title="Build document index"
      onSubmit={buildDocumentIndex}
      submitButtonTitle={'Confirm'}
    >
      <FormItem>
        <FormLabel>URL List</FormLabel>
        <FormField
          name="uriList"
          render={({ field }) => <Textarea {...field} />}
        />
      </FormItem>
    </BasicFormDialog>
  );
}
