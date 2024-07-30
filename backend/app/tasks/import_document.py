from sqlmodel import Session
from celery.utils.log import get_task_logger

from app.celery import app as celery_app
from app.core.db import engine
from app.models import DataSource
from app.rag.datasource import get_data_source_loader
from .rag_build import build_vector_index_from_document


logger = get_task_logger(__name__)


@celery_app.task
def import_documents_from_datasource(datasource_id: int):
    with Session(engine, autocommit=True) as session:
        datasource = session.get(DataSource, datasource_id)
        if datasource is None:
            logger.error(f"Data source with id {datasource_id} not found")
            return

        loader = get_data_source_loader(
            session,
            datasource.data_source_type,
            datasource.id,
            datasource.user_id,
            datasource.config,
        )
        for document in loader.load_documents():
            session.add(document)
            session.commit()
            build_vector_index_from_document.delay(document.id)
