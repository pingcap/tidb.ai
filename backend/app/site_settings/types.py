from typing import TypeAlias
from dataclasses import dataclass


SettingType: TypeAlias = bool | str | int | float | list | dict | None


@dataclass
class SettingValue:
    name: str
    default: SettingType
    data_type: str
    description: str
    group: str
    # Whether the setting can be viewed by the client
    client: bool = False
    value: SettingType = None
