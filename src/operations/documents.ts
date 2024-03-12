import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';

export type ImportWebsiteFormValues = {
  uriList: string;
};

export const importWebsite = withToast(
  async ({ uriList }: ImportWebsiteFormValues) => {
    await fetch('/api/v1/documents', {
      method: 'put',
      body: uriList,
      headers: {
        'Content-Type': 'text/uri-list',
      },
    }).then(handleErrors);
  }
);

export type UploadFileFormValues = {
  file: File;
  sourceUri: string;
};

export const uploadFile = withToast(
  async ({ file, sourceUri }: UploadFileFormValues) => {
    const formData = new FormData();
    formData.set('file', file);
    formData.set('sourceUri', sourceUri);

    await fetch('/api/v1/documents', {
      method: 'put',
      body: formData,
    }).then(handleErrors);
  }
);
