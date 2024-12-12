import os
import time
from typing import List
from fastapi import APIRouter, UploadFile, HTTPException, status

from app.api.deps import SessionDep, CurrentSuperuserDep
from app.file_storage import default_file_storage
from app.utils.uuid6 import uuid7
from app.models import Upload
from app.types import MimeTypes
from app.core.config import settings

router = APIRouter()


SUPPORTED_FILE_TYPES = {
    ".txt": MimeTypes.PLAIN_TXT,
    ".md": MimeTypes.MARKDOWN,
    ".pdf": MimeTypes.PDF,
    ".docx": MimeTypes.DOCX,
    ".pptx": MimeTypes.PPTX,
    ".xlsx": MimeTypes.XLSX,
}


@router.post("/admin/uploads")
def upload_files(
    session: SessionDep, user: CurrentSuperuserDep, files: List[UploadFile]
) -> List[Upload]:
    uploads = []
    for file in files:
        if not file.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File name cannot be empty",
            )
        if file.size > settings.CLIENT_MAX_BODY_SIZE:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File size {file.size} exceeds CLIENT_MAX_BODY_SIZE {settings.CLIENT_MAX_BODY_SIZE} bytes",
            )

        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in SUPPORTED_FILE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File type {file_ext} not supported. Supported types: {SUPPORTED_FILE_TYPES.keys()}",
            )
        file_path = f"uploads/{user.id.hex}/{int(time.time())}-{uuid7().hex}{file_ext}"
        default_file_storage.save(file_path, file.file)
        uploads.append(
            Upload(
                name=file.filename,
                size=default_file_storage.size(file_path),
                path=file_path,
                mime_type=SUPPORTED_FILE_TYPES[file_ext],
                user_id=user.id,
            )
        )
    session.add_all(uploads)
    session.commit()
    return uploads
