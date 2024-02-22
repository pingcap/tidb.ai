import {z} from "zod";

export const GroupName = z.enum(['website'])

export type IGroupName = z.infer<typeof GroupName>;

export const languages = [
  { label: "English", value: "en-US" },
  { label: "Chinese", value: "zh-CN" }
] as const;

export const language = z.enum(["en-US", "zh-CN"]);

export const WebsiteSetting = z.object({
  title: z.string().min(1, 'title must has at latest 1 character').max(20, 'title must has at most 20 characters'),
  description: z.string().max(200, 'description must has at most 200 characters'),
  logo_in_light_mode: z.string().url('logo_in_light_mode should be a correct URL of image'),
  logo_in_dark_mode: z.string().url('logo_in_dark_mode should be a correct URL of image'),
  language: language
});

const defaultWebsiteSetting: IWebsiteSettingResult = {
  title: 'RAG Template',
  description: 'Hello TiDB Cloud!',
  logo_in_dark_mode: '/tidb-ai.svg',
  logo_in_light_mode: '/tidb-ai-light.svg',
  language: 'zh-CN'
}

export const WebsiteSettingResult = WebsiteSetting.partial();

export type IWebsiteSettingResult = z.infer<typeof WebsiteSettingResult>;

export const WebsiteSettingUpdatePayload = WebsiteSetting.partial();