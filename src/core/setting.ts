import {getOptionsByGroup, updateOptionsByGroup} from "@/core/v1/option";
import {z} from "zod";
import {cache} from "react";
import {
    GroupName,
    IGroupName,
    IWebsiteSettingResult,
    WebsiteSettingResult,
    WebsiteSettingUpdatePayload,
    ICustomJsSettingResult,
    CustomJsSettingResult,
    CustomJsSettingUpdatePayload,
    ISecuritySettingResult,
    SecuritySettingResult,
    SecuritySettingUpdatePayload, defaultWebsiteSetting,
} from '@/core/schema/setting';
import { flattenSettings, unflattenSettings } from "@/lib/utils";

type ListSettingsReturnType<G extends IGroupName> =
  G extends typeof GroupName.enum.website
    ? IWebsiteSettingResult
    : G extends typeof GroupName.enum.custom_js
    ? ICustomJsSettingResult
    : G extends typeof GroupName.enum.security
    ? ISecuritySettingResult
    : {};

export const getSetting = async <G extends IGroupName>(group: G): Promise<ListSettingsReturnType<G>> => {
    if (!process.env.DATABASE_URL) {
        switch (group) {
            case 'website': return defaultWebsiteSetting as any;
            case 'custom_js': return {} as any;
            case 'security': return {} as any;
        }
    }

    const options = await getOptionsByGroup(group);
    const settings: any = {};
    for (const option of options) {
        settings[option.option_name] = option.option_value
    }

    let result;
    switch (group) {
        case GroupName.enum.website:
            const unFlattenedSettings = unflattenSettings(settings);
            result = WebsiteSettingResult.parse(unFlattenedSettings);
            break
        case GroupName.enum.custom_js:
            result = CustomJsSettingResult.parse(settings);
            break
        case GroupName.enum.security:
            result = SecuritySettingResult.parse(settings);
            break
        default:
            result = {}
    }

    return result as ListSettingsReturnType<G>;
}

export const getCachedSetting = cache(getSetting);
export async function updateSetting(group: string, settings: z.infer<typeof WebsiteSettingUpdatePayload | typeof CustomJsSettingUpdatePayload | typeof SecuritySettingUpdatePayload>) {
    const parsedSettings = group === GroupName.enum.website ? flattenSettings(settings, 2) : settings;

    const options: any[] = Object.entries(parsedSettings).map(([key, value]) => {
        return {
            option_name: key,
            option_value: value
        }
    });
    return await updateOptionsByGroup(group, options);
}
