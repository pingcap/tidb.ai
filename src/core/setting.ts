import {z} from "zod";
import database from "@/core/db";
import {cache} from "react";
import {
    GroupName,
    IGroupName,
    IWebsiteSettingResult,
    WebsiteSettingResult,
    WebsiteSettingUpdatePayload,
    CustomJsSettingResult,
    CustomJsSettingUpdatePayload,
} from "@/core/schema/setting";
import { flattenSettings, unflattenSettings } from "@/lib/utils";

type ListSettingsReturnType<G extends IGroupName> =
    G extends typeof GroupName.enum.website ? IWebsiteSettingResult :
        {};

export const getSetting = async <G extends IGroupName>(group: G) => {
    const options = await database.option.findByGroup(group);
    const settings: any = {};
    for (const option of options) {
        settings[option.option_name] = option.option_value
    }

    let result;
    switch (group) {
        case GroupName.enum.website:
            const unflattenedSettings = unflattenSettings(settings);
            result = WebsiteSettingResult.parse(unflattenedSettings);
            break
        case GroupName.enum.custom_js:
            result = CustomJsSettingResult.parse(settings);
            break
        default:
            result = {}
    }

    return result as ListSettingsReturnType<G>;
}

export const getCachedSetting = cache(getSetting);
export async function updateSetting(group: string, settings: z.infer<typeof WebsiteSettingUpdatePayload | typeof CustomJsSettingUpdatePayload>) {
    const parsedSettings = group === GroupName.enum.website ? flattenSettings(settings, 2) : settings;

    const options: any[] = Object.entries(parsedSettings).map(([key, value]) => {
        return {
            option_name: key,
            option_value: value
        }
    });
    return await database.option.updateByGroup(group, options);
}
