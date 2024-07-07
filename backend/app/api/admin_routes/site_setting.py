from typing import Dict
from pydantic import BaseModel
from fastapi import APIRouter

from app.api.deps import CurrentSuperuserDep
from app.site_settings import SiteSetting, SettingValue

router = APIRouter()


@router.get("/admin/site-settings", response_model=Dict[str, SettingValue])
def site_settings(current_superuser: CurrentSuperuserDep):
    return SiteSetting.get_all_settings()
