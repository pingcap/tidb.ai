import {z} from "zod";
import database from "@/core/db";
import {cache} from "react";
import {
    GroupName,
    IGroupName,
    IWebsiteSettingResult,
    WebsiteSettingResult,
    WebsiteSettingUpdatePayload
} from "@/core/schema/setting";

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
            result = WebsiteSettingResult.parse(settings);
            break
        default:
            result = {}
    }

    return result as ListSettingsReturnType<G>;
}

export const getCachedSetting = cache(getSetting);
export async function updateSetting(group: string, settings: z.infer<typeof WebsiteSettingUpdatePayload>) {

    const options: any[] = Object.entries(settings).map(([key, value]) => {
        return {
            option_name: key,
            option_value: value
        }
    });
    return await database.option.updateByGroup(group, options);
}
