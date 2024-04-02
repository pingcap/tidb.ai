import {z} from "zod";

export const GroupName = z.enum(['website', 'custom_js', 'security']);

export type IGroupName = z.infer<typeof GroupName>;

export const languages = [
  { label: "English", value: "en-US" },
  { label: "Chinese", value: "zh-CN" }
] as const;

export const language = z.enum(["en-US", "zh-CN"]);

export const themes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" }
] as const;

export const theme = z.enum(['light', 'dark', 'system']);

export const reCaptcha = [
  { label: 'V3', value: 'v3' },
  { label: 'Enterprise', value: 'enterprise' },
  { label: 'None', value: '' }
] as const;
export const reCaptchas = z.enum(['', 'v3', 'enterprise']);

export const maxExampleQuestions = 5;
export const maxHomepageFooterLinks = 5;

export const WebsiteSetting = z.object({
  title: z.string().min(1, 'title must has at latest 1 character').max(20, 'title must has at most 20 characters'),
  description: z.string().max(200, 'description must has at most 200 characters'),
  logo_in_light_mode: z.string().url('logo_in_light_mode should be a correct URL of image'),
  logo_in_dark_mode: z.string().url('logo_in_dark_mode should be a correct URL of image'),
  language: language,
  homepage: z.object({
    title: z.string().min(1, 'homepage title must has at latest 1 character').max(50, 'homepage title must has at most 20 characters'),
    description: z.string().max(200, 'homepage description must has at most 200 characters'),
    example_questions: z.array(z.object({ text: z.string().min(1) })).max(maxExampleQuestions, 'example questions must has at most 5 questions').optional(),
    footer_links: z.array(z.object({ text: z.string().min(1), href: z.string().min(1) })).optional(),
  }),
  social: z.object({
    twitter: z.string().url('twitter should be a correct URL').optional(),
    github: z.string().url('github should be a correct URL').optional(),
    discord: z.string().url('discord should be a correct URL').optional(),
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
    description:
      'Including company intro, user cases, product intro and usage, FAQ, etc.',
    example_questions: [
      { text: 'What is TiDB?' },
      { text: 'Does TiDB support FOREIGN KEY?' },
      { text: 'Does TiDB support serverless?' },
    ],
    footer_links: [
      { text: 'Docs', href: '/docs' },
      { text: 'Deploy your own within 5 minutes for free', href: '/docs' },
      { text: 'How it works?', href: '/docs' },
      { text: 'Powered by TiDB', href: 'https://tidb.cloud' },
      { text: '© 2024 PingCAP', href: 'https://pingcap.com' },
    ],
  },
  social: {
    github: 'https://github.com/pingcap/tidb.ai',
    twitter: 'https://twitter.com/PingCAP',
    discord: 'https://discord.gg/XzSW23Jg9p',
  },
};

export const WebsiteSettingResult = WebsiteSetting.partial();

export type IWebsiteSettingResult = z.infer<typeof WebsiteSettingResult>;

export const WebsiteSettingUpdatePayload = WebsiteSetting.partial();

export const CustomJsSetting = z.object({
  api_base_url: z.string(),
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
  widget_title: z.string().min(1, 'title must has at latest 1 character').max(50, 'title must has at most 50 characters').optional(),
  widget_input_placeholder: z.string().min(1, 'input placeholder must has at latest 1 character').max(50, 'input placeholder must has at most 50 characters').optional(),
  widget_color_mode: theme.optional(),
  widget_site_key: z.string().optional(),
  widget_security_mode: reCaptchas.optional(),
});
export const CustomJsSettingResult = CustomJsSetting.partial();
export type ICustomJsSettingResult = z.infer<typeof CustomJsSettingResult>;
export const CustomJsSettingUpdatePayload = CustomJsSetting.partial();

export const SecuritySetting = z.object({
  google_recaptcha: reCaptchas,
  google_recaptcha_site_key: z.string().optional(),
  google_recaptcha_secret_key: z.string().optional(),
  google_recaptcha_enterprise_project_id: z.string().optional(),
});
export const SecuritySettingResult = SecuritySetting.partial();
export type ISecuritySettingResult = z.infer<typeof SecuritySettingResult>;
export const SecuritySettingUpdatePayload = SecuritySetting.partial();
