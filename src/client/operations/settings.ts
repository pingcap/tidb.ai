import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';
import { z } from '../../../packages/zod-extension';
import {
  CustomJsSettingUpdatePayload,
  WebsiteSettingUpdatePayload,
  SecuritySettingUpdatePayload,
} from '@/core/schema/setting';

export const updateSettingCustomJS = withToast(
  async (data: z.infer<typeof CustomJsSettingUpdatePayload>, mutate: any) => {
    await fetch('/api/v1/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        group: 'custom_js',
        settings: data,
      }),
    })
      .then(handleErrors)
      .then(() => mutate(['GET', '/api/v1/settings?group=custom_js']));
  }
);

export const updateSettingWebsite = withToast(
  async (data: z.infer<typeof WebsiteSettingUpdatePayload>, mutate: any) => {
    await fetch('/api/v1/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        group: 'website',
        settings: data,
      }),
    })
      .then(handleErrors)
      .then(() => {
        mutate(['GET', '/api/v1/settings?group=website']);
      });
  }
);

export const updateSettingImage = withToast(
  async (image: File, onChange: any) => {
    const form = new FormData();
    form.append('file', image);
    const resData = await fetch('/api/v1/settings/upload', {
      method: 'POST',
      body: form,
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((data) => {
        onChange(data.url);
      });
    return resData;
  },
  {
    error: (resData: any) => resData?.message || 'Failed to upload image.',
  }
);

export const updateSettingSecurity = withToast(
  async (data: z.infer<typeof SecuritySettingUpdatePayload>, mutate: any) => {
    await fetch('/api/v1/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        group: 'security',
        settings: data,
      }),
    })
      .then(handleErrors)
      .then(() => mutate(['GET', '/api/v1/settings?group=security']));
  }
);
