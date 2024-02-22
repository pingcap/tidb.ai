import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from "zod";
import {
  getSetting,
  updateSetting,
} from "@/core/setting";
import {GroupName, WebsiteSettingUpdatePayload} from "@/core/schema/setting";

function InvalidParamsErrorResponse(parseResult: z.SafeParseError<any>) {
  return NextResponse.json({
    message: 'Invalid request parameters',
    issues: parseResult.error.issues
  }, {
    status: 400
  });
}

export async function GET (req: NextRequest, { params }: { params: { group: string } }) {
  const parseResult = GroupName.safeParse(req.nextUrl.searchParams.get("group"));
  if (!parseResult.success) {
    return InvalidParamsErrorResponse(parseResult);
  }
  const settings = await getSetting(parseResult.data);
  if (Object.keys(settings!).length === 0) {
    notFound()
  }

  return NextResponse.json(settings);
}

const UpdateSettingRequestSchema = z.object({
  group: GroupName,
  settings: WebsiteSettingUpdatePayload
});

export async function PUT (req: NextRequest) {
  const parseResult = UpdateSettingRequestSchema.strict().safeParse(await req.json());
  if (!parseResult.success) {
    return InvalidParamsErrorResponse(parseResult)
  }
  const { group, settings } = parseResult.data;
  const updated = await updateSetting(group, settings);

  return NextResponse.json({
    message: 'success',
    updated
  });
}

export const dynamic = 'force-dynamic';
