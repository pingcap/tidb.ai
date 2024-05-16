import {reCaptchas} from "@/core/schema/settings/security";
import {assetUrl, maxExampleQuestions, theme} from "@/core/schema/settings/website";
import {z} from "zod";

export const CustomJsSetting = z.object({
  api_base_url: z.string(),
  button_label: z.string({
    required_error: 'Button label is required',
  }),
  button_img_src: assetUrl('Button Image Src should be a correct URL of image').optional(),
  example_questions: z
    .array(z.object({text: z.string().min(1)}))
    .max(
      maxExampleQuestions,
      `example questions must has at most ${maxExampleQuestions} questions`,
    )
    .optional(),
  logo_src: assetUrl('Logo Src should be a correct URL of image').optional(),
  widget_title: z.string().min(1, 'title must has at latest 1 character').max(50, 'title must has at most 50 characters').optional(),
  widget_input_placeholder: z.string().min(1, 'input placeholder must has at latest 1 character').max(50, 'input placeholder must has at most 50 characters').optional(),
  widget_color_mode: theme.optional(),
  widget_site_key: z.string().optional(),
  widget_security_mode: reCaptchas.optional(),
});

export const CustomJsSettingResult = CustomJsSetting.partial();
export type ICustomJsSettingResult = z.infer<typeof CustomJsSettingResult>;
export const CustomJsSettingUpdatePayload = CustomJsSetting.partial();