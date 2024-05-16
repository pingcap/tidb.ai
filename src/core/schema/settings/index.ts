import {ICustomJsSettingResult} from "@/core/schema/settings/custom_js";
import {ISecuritySettingResult} from "@/core/schema/settings/security";
import {IWebsiteSettingResult} from "@/core/schema/settings/website";
import {z} from 'zod';

export const GroupName = z.enum(['website', 'custom_js', 'security']);

export type IGroupName = z.infer<typeof GroupName>;

export type SettingGroups = {
  website: IWebsiteSettingResult,
  security: ISecuritySettingResult,
  custom_js: ICustomJsSettingResult,
}
