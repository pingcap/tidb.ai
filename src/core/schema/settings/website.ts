import {z} from "zod";

export const languages = [
  {label: 'English', value: 'en-US'},
  {label: 'Chinese', value: 'zh-CN'},
] as const;

export const language = z.enum(['en-US', 'zh-CN']);

export const themes = [
  {label: 'Light', value: 'light'},
  {label: 'Dark', value: 'dark'},
  {label: 'System', value: 'system'},
] as const;

export const theme = z.enum(['light', 'dark', 'system']);

export const maxExampleQuestions = 5;

export const maxHomepageFooterLinks = 5;

export const assetUrl = (message: string) =>
  z.union([
    z.string().url(message),
    z.string().regex(/^\/assets\//, message)
  ]);

const urlOrEmpty = (message: string) => z.union([
  z.literal(''),
  z.string().url(),
]).optional();

export const WebsiteSetting = z.object({
  title: z.string().min(1, 'title must has at latest 1 character').max(20, 'title must has at most 20 characters'),
  description: z.string().max(200, 'description must has at most 200 characters'),
  logo_in_light_mode: assetUrl('logo_in_light_mode should be a correct URL of image'),
  logo_in_dark_mode: assetUrl('logo_in_dark_mode should be a correct URL of image'),
  language: language,
  homepage: z.object({
    title: z.string().min(1, 'homepage title must has at latest 1 character').max(50, 'homepage title must has at most 20 characters'),
    description: z.string().max(200, 'homepage description must has at most 200 characters'),
    example_questions: z.array(z.object({text: z.string().min(1)})).max(maxExampleQuestions, 'example questions must has at most 5 questions').optional(),
    footer_links: z.array(z.object({text: z.string().min(1), href: z.string().min(1)})).optional(),
  }),
  social: z.object({
    twitter: urlOrEmpty('twitter should be a correct URL').optional(),
    github: urlOrEmpty('github should be a correct URL').optional(),
    discord: urlOrEmpty('discord should be a correct URL').optional(),
  }).optional(),
});

export const defaultWebsiteSetting: IWebsiteSettingResult = {
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
      {text: 'What is TiDB?'},
      {text: 'Does TiDB support FOREIGN KEY?'},
      {text: 'Does TiDB support serverless?'},
    ],
    footer_links: [
      {text: 'Docs', href: '/docs'},
      {text: 'Deploy your own within 5 minutes for free', href: '/docs'},
      {text: 'How it works?', href: '/docs'},
      {text: 'Powered by TiDB', href: 'https://tidb.cloud'},
      {text: '© 2024 PingCAP', href: 'https://pingcap.com'},
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