from sqlmodel import Session, select
from celery.utils.log import get_task_logger

from app.celery import app as celery_app
from app.core.db import engine
from app.models import (
    DataSource,
    DataSourceType,
    Document,
    Upload,
)
from app.file_storage import default_file_storage
from .rag_build import build_vector_index_from_document


logger = get_task_logger(__name__)


@celery_app.task
def import_documents_from_datasource(datasource_id: int):
    with Session(engine) as session:
        datasource = session.get(DataSource, datasource_id)
        if datasource is None:
            logger.error(f"Data source with id {datasource_id} not found")
            return

        if datasource.data_source_type == DataSourceType.FILE:
            for config in datasource.config:
                upload_id = config["file_id"]
                upload = session.get(Upload, upload_id)
                if upload is None:
                    logger.error(f"Upload with id {upload_id} not found")
                    return

                with default_file_storage.open(upload.path) as f:
                    content = f.read()
                document = Document(
                    name=upload.name,
                    hash=hash(content),
                    content=content,
                    mime_type=upload.mime_type,
                    data_source_id=datasource.id,
                    user_id=datasource.user_id,
                    source_uri=upload.path,
                    last_modified_at=upload.created_at,
                )
                session.add(document)
                session.commit()
                build_vector_index_from_document.delay(document.id)
        else:
            logger.error("Data source type not supported")
            return
