import {IWebsiteSettingResult} from "@/core/schema/settings/website";

export function Branding ({ setting }: { setting: IWebsiteSettingResult }) {
  return (
    <span className="flex items-center gap-4">
      <img className="h-8 dark:hidden" src={setting.logo_in_light_mode} alt="logo" />
      <img className="h-8 hidden dark:block" src={setting.logo_in_dark_mode} alt="logo" />
      <span className="text-2xl font-light flex-shrink-0 tracking-widest">
        {setting.title}
      </span>
    </span>
  );
}