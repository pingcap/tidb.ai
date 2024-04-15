import {
  CustomJsSettingUpdatePayload,
  GroupName,
  SecuritySettingUpdatePayload,
  WebsiteSettingUpdatePayload
} from '@/core/schema/setting';
import {getSetting, updateSetting} from '@/core/setting';
import {defineHandler} from "@/lib/next/handler";
import {notFound} from 'next/navigation';
import {NextResponse} from 'next/server';
import { z} from 'zod';

const searchParamsSchema = z.object({
  group: GroupName,
});

export const GET = defineHandler({
  searchParams: searchParamsSchema,
}, async ({
  searchParams: { group }
}) => {
  const settings = await getSetting(group);
  if (Object.keys(settings!).length === 0) {
    notFound();
  }

  return NextResponse.json(settings);
});

const UpdateSettingRequestSchema = z.object({
  group: z.literal('website'),
  settings: WebsiteSettingUpdatePayload,
});
const UpdateCustomJsSettingRequestSchema = z.object({
  group: z.literal('custom_js'),
  settings: CustomJsSettingUpdatePayload,
});
const UpdateSecuritySettingRequestSchema = z.object({
  group: z.literal('security'),
  settings: SecuritySettingUpdatePayload,
});

const updateSettingSchema = z.discriminatedUnion("group", [
  UpdateSettingRequestSchema,
  UpdateCustomJsSettingRequestSchema,
  UpdateSecuritySettingRequestSchema
]);

export const PUT = defineHandler({
  auth: 'admin',
  body: updateSettingSchema,
}, async ({
  body,
}) => {
  const { group, settings } = body;
  const updated = await updateSetting(group, settings);

  return NextResponse.json({
    message: 'success',
    updated,
  });
});

export const dynamic = 'force-dynamic';
