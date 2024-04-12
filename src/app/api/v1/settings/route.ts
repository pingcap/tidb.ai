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

type UpdateSetting = z.infer<typeof updateSettingSchema>;

async function parseUpdateSetting (reqJson: any): Promise<UpdateSetting> {
  switch (reqJson?.group) {
    case GroupName.enum.website:
      return UpdateSettingRequestSchema.parse(reqJson);
    case GroupName.enum.custom_js:
      return UpdateCustomJsSettingRequestSchema.parse(reqJson);
    case GroupName.enum.security:
      return UpdateSecuritySettingRequestSchema.parse(reqJson);
    default:
      throw new Error('Invalid setting group');
  }
}

const updateSettingBodySchema = z.object({
  group: GroupName,
  settings: updateSettingSchema,
});

export const PUT = defineHandler({
  auth: 'admin',
  body: updateSettingBodySchema,
}, async ({
  request
}) => {
  const { group, settings } = await parseUpdateSetting(request.json());
  const updated = await updateSetting(group, settings);

  return NextResponse.json({
    message: 'success',
    updated,
  });
});

export const dynamic = 'force-dynamic';
