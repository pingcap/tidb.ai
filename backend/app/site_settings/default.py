import yaml
import threading
from collections import defaultdict

from app.site_settings.types import SettingValue


DEFAULT_YAML_FILE = "./app/site_settings/default_settings.yml"


class DefaultSettings:
    setting_groups: dict[str, list[SettingValue]] = defaultdict(list)

    __mutex = threading.Lock()
    __loaded = False

    def __init__(self):
        with self.__mutex:
            if not self.__loaded:
                self.load_default_from_yaml()
                self.__loaded = True

    def load_default_from_yaml(self):
        with open(DEFAULT_YAML_FILE, "r") as f:
            data = yaml.safe_load(f)
            for group, settings in data.items():
                for name, value in settings.items():
                    setattr(
                        self,
                        name,
                        SettingValue(**value, name=name, group=group),
                    )
                    self.setting_groups[group].append(getattr(self, name))


default_settings = DefaultSettings()
