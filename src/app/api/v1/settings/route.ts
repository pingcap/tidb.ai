import {updateSettingSchema} from "@/app/api/v1/settings/schema";
import {GroupName} from '@/core/schema/settings';
import {getSetting, updateSetting} from '@/core/services/setting';
import {defineHandler} from "@/lib/next/handler";
import {notFound} from 'next/navigation';
import {NextResponse} from 'next/server';
import {z} from 'zod';

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
