import logging
from pydantic import BaseModel
from typing import Generator, IO
from pypdf import PdfReader

from app.models import Document, Upload
from app.file_storage import default_file_storage
from .base import BaseDataSource

logger = logging.getLogger(__name__)


class FileConfig(BaseModel):
    file_id: int


class FileDataSource(BaseDataSource):
    def validate_config(self):
        if not isinstance(self.config, list):
            raise ValueError("config must be a list")
        for f_config in self.config:
            FileConfig.model_validate(f_config)

    def load_documents(self) -> Generator[Document, None, None]:
        for f_config in self.config:
            upload_id = f_config["file_id"]
            upload = self.session.get(Upload, upload_id)
            if upload is None:
                logger.error(f"Upload with id {upload_id} not found")
                continue

            with default_file_storage.open(upload.path) as f:
                if upload.mime_type == "application/pdf":
                    content = extract_text_from_pdf(f)
                    mime_type = "text/plain"
                else:
                    content = f.read()
                    mime_type = upload.mime_type
            document = Document(
                name=upload.name,
                hash=hash(content),
                content=content,
                mime_type=mime_type,
                data_source_id=self.data_source_id,
                user_id=self.user_id,
                source_uri=upload.path,
                last_modified_at=upload.created_at,
            )
            yield document


def extract_text_from_pdf(file: IO) -> str:
    reader = PdfReader(file)
    return "\n\n".join([page.extract_text() for page in reader.pages])
