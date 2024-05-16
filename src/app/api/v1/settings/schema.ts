import {CustomJsSettingUpdatePayload} from "@/core/schema/settings/custom_js";
import {SecuritySettingUpdatePayload} from "@/core/schema/settings/security";
import {WebsiteSettingUpdatePayload} from "@/core/schema/settings/website";
import {z} from "zod";

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

export const updateSettingSchema = z.discriminatedUnion("group", [
  UpdateSettingRequestSchema,
  UpdateCustomJsSettingRequestSchema,
  UpdateSecuritySettingRequestSchema
]);