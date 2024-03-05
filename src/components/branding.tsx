import {IWebsiteSettingResult} from "@/core/schema/setting";

export function Branding ({ setting }: { setting: IWebsiteSettingResult }) {
  return (
    <span className="flex items-center gap-4">
      <img className="dark:hidden" src={setting.logo_in_light_mode} alt="logo" width={32} height={32} />
      <img className="hidden dark:block" src={setting.logo_in_dark_mode} alt="logo" width={32} height={32} />
      <span className="text-2xl font-light flex-shrink-0 tracking-widest">
        {setting.title}
      </span>
    </span>
  );
}