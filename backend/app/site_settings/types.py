from typing import TypeAlias
from dataclasses import dataclass


SettingType: TypeAlias = str | int | float | bool | list | dict | None


@dataclass
class SettingValue:
    name: str
    default: SettingType
    data_type: str
    description: str
    group: str
    value: SettingType = None
