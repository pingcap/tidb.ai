import {CustomJsSettingUpdatePayload} from "@/core/schema/settings/custom_js";
import {SecuritySettingUpdatePayload} from "@/core/schema/settings/security";
import {WebsiteSettingUpdatePayload} from "@/core/schema/settings/website";
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';
import z from 'zod';

export const updateSettingCustomJS = withToast(
  async (data: z.infer<typeof CustomJsSettingUpdatePayload>) => {
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
      .then(handleErrors);
  },
);

export const updateSettingWebsite = withToast(
  async (data: z.infer<typeof WebsiteSettingUpdatePayload>) => {
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
      .then(handleErrors);
  },
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
  },
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
      .then(handleErrors);
  },
);
