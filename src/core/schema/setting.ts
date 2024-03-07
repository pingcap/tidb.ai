import {z} from "zod";

export const GroupName = z.enum(['website', 'custom_js'])

export type IGroupName = z.infer<typeof GroupName>;

export const languages = [
  { label: "English", value: "en-US" },
  { label: "Chinese", value: "zh-CN" }
] as const;

export const language = z.enum(["en-US", "zh-CN"]);

export const maxExampleQuestions = 5;

export const WebsiteSetting = z.object({
  title: z.string().min(1, 'title must has at latest 1 character').max(20, 'title must has at most 20 characters'),
  description: z.string().max(200, 'description must has at most 200 characters'),
  logo_in_light_mode: z.string().url('logo_in_light_mode should be a correct URL of image'),
  logo_in_dark_mode: z.string().url('logo_in_dark_mode should be a correct URL of image'),
  language: language,
  homepage: z.object({
    title: z.string().min(1, 'homepage title must has at latest 1 character').max(50, 'homepage title must has at most 20 characters'),
    description: z.string().max(200, 'homepage description must has at most 200 characters'),
    example_questions: z.array(z.object({text: z.string().min(1)})).max(maxExampleQuestions, 'example questions must has at most 5 questions').optional(),
  }),
  social: z.object({
    twitter: z.string().url('twitter should be a correct URL').optional(),
    github: z.string().url('github should be a correct URL').optional(),
  }).optional(),
});

const defaultWebsiteSetting: IWebsiteSettingResult = {
  title: 'RAG Template',
  description: 'Hello TiDB Cloud!',
  logo_in_dark_mode: '/tidb-ai.svg',
  logo_in_light_mode: '/tidb-ai-light.svg',
  language: 'zh-CN',
  homepage: {
    title: 'Ask anything about TiDB',
    description: 'Including company intro, user cases, product intro and usage, FAQ, etc.',
    example_questions: [{text: 'What is TiDB?'}, {text: 'Does TiDB support FOREIGN KEY?'}, {text: 'Does TiDB support serverless?'}]
  },
  social: {
    github: 'https://github.com/pingcap/tidb.ai',
    twitter: 'https://twitter.com/PingCAP',
  }
}

export const WebsiteSettingResult = WebsiteSetting.partial();

export type IWebsiteSettingResult = z.infer<typeof WebsiteSettingResult>;

export const WebsiteSettingUpdatePayload = WebsiteSetting.partial();

export const CustomJsSetting = z.object({
  button_label: z.string({
    required_error: 'Button label is required',
  }),
  button_img_src: z
    .string()
    .url('Button Image Src should be a correct URL of image')
    .optional(),
  example_questions: z
    .array(z.object({ text: z.string().min(1) }))
    .max(
      maxExampleQuestions,
      `example questions must has at most ${maxExampleQuestions} questions`
    )
    .optional(),
  logo_src: z
    .string()
    .url('Logo Src should be a correct URL of image')
    .optional(),
});
export const CustomJsSettingResult = CustomJsSetting.partial();
export type ICustomJsSettingResult = z.infer<typeof CustomJsSettingResult>;
export const CustomJsSettingUpdatePayload = CustomJsSetting.partial();
