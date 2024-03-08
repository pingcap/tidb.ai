import { GroupName, WebsiteSettingUpdatePayload, CustomJsSettingUpdatePayload } from '@/core/schema/setting';
import { getSetting, updateSetting } from '@/core/setting';
import { adminHandlerGuard } from '@/lib/auth-server';
import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

function InvalidParamsErrorResponse (parseResult: z.SafeParseError<any>) {
  return NextResponse.json({
    message: 'Invalid request parameters',
    issues: parseResult.error.issues,
  }, {
    status: 400,
  });
}

export async function GET (req: NextRequest) {
  const parseResult = GroupName.safeParse(req.nextUrl.searchParams.get('group'));
  if (!parseResult.success) {
    return InvalidParamsErrorResponse(parseResult);
  }
  const settings = await getSetting(parseResult.data);
  if (Object.keys(settings!).length === 0) {
    notFound();
  }

  return NextResponse.json(settings);
}

const UpdateSettingRequestSchema = z.object({
  group: GroupName,
  settings: WebsiteSettingUpdatePayload,
});
const UpdateCustomJsSettingRequestSchema = z.object({
  group: GroupName,
  settings: CustomJsSettingUpdatePayload,
});

export const PUT = adminHandlerGuard(async (req) => {
  const parseResult = await handleUpdateSetting(req);
  if (!parseResult) {
    return notFound();
  }
  if (!parseResult.success) {
    return InvalidParamsErrorResponse(parseResult);
  }
  const { group, settings } = parseResult.data;
  const updated = await updateSetting(group, settings);

  return NextResponse.json({
    message: 'success',
    updated,
  });
});

async function handleUpdateSetting (req: NextRequest) {
  const reqJson = await req.json();
  const group: string = reqJson.group || '';
  if (group === 'website') {
    const parseSettingResult = UpdateSettingRequestSchema.strict().safeParse(reqJson);
    return parseSettingResult;
  }
  if (group === 'custom_js') {
    const parseCustomJsResult = UpdateCustomJsSettingRequestSchema.strict().safeParse(reqJson);
    return parseCustomJsResult;
  }
  return undefined;
}

export const dynamic = 'force-dynamic';
