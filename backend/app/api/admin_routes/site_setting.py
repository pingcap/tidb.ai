from typing import Dict
from pydantic import BaseModel
from http import HTTPStatus
from fastapi import APIRouter, HTTPException

from app.api.deps import CurrentSuperuserDep, SessionDep
from app.site_settings import SiteSetting, SettingValue, SettingType

router = APIRouter()


@router.get("/admin/site-settings", response_model=Dict[str, SettingValue])
def site_settings(user: CurrentSuperuserDep):
    return SiteSetting.get_all_settings(force_check_db_cache=True)


class SettingUpdate(BaseModel):
    value: SettingType


@router.put(
    "/admin/site-settings/{setting_name}",
    status_code=HTTPStatus.NO_CONTENT,
    responses={
        HTTPStatus.BAD_REQUEST: {
            "content": {
                "application/json": {
                    "examples": {
                        "invalid_data_type": {
                            "summary": "Invalid data type",
                            "value": {"detail": "title must be of type `str`"},
                        },
                    }
                }
            },
        },
        HTTPStatus.NOT_FOUND: {
            "content": {
                "application/json": {
                    "examples": {
                        "setting_not_found": {
                            "summary": "Setting not found",
                            "value": {"detail": "Setting not found"},
                        },
                    }
                }
            },
        },
    },
)
def update_site_setting(
    session: SessionDep,
    user: CurrentSuperuserDep,
    setting_name: str,
    request: SettingUpdate,
):
    if not SiteSetting.setting_exists(setting_name):
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail="Setting not found"
        )

    try:
        SiteSetting.update_setting(session, setting_name, request.value)
    except ValueError as e:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail=str(e))
