import traceback
from uuid import UUID
from sqlmodel import Session, select
from celery.utils.log import get_task_logger
from llama_index.llms.openai import OpenAI
from llama_index.llms.gemini import Gemini

from app.celery import app as celery_app
from app.core.db import engine
from app.models import (
    Document as DBDocument,
    Chunk as DBChunk,
    LLM as DBLLM,
    DataSource,
    DocIndexTaskStatus,
    KgIndexStatus,
)
from app.rag.build import BuildService
from app.rag.chat_config import get_llm, get_default_embedding_model
from app.rag.types import OpenAIModel, GeminiModel
from app.utils.dspy import get_dspy_lm_by_llama_llm


logger = get_task_logger(__name__)


def get_llm_by_data_source_id(session: Session, data_source_id: int) -> Gemini:
    datasource = session.get(DataSource, data_source_id)
    if datasource is None:
        raise ValueError(f"DataSource {data_source_id} not found")

    if datasource.llm_id is None:
        return get_default_embedding_model(session)

    llm = session.get(DBLLM, datasource.llm_id)
    return get_llm(
        provider=llm.provider,
        model=llm.model,
        config=llm.config,
        credentials=llm.credentials,
    )


@celery_app.task
def build_vector_index_from_document(document_id: int):
    with Session(engine, expire_on_commit=False) as session:
        db_document = session.get(DBDocument, document_id)
        if db_document is None:
            logger.error(f"Document {document_id} not found")
            return

        if db_document.index_status not in (
            DocIndexTaskStatus.PENDING,
            DocIndexTaskStatus.NOT_STARTED,
        ):
            logger.info(f"Document {document_id} not in pending state")
            return

        llm = get_llm_by_data_source_id(session, db_document.data_source_id)

        db_document.index_status = DocIndexTaskStatus.RUNNING
        session.commit()

        if (
            session.exec(
                select(DBChunk).where(DBChunk.document_id == document_id)
            ).first()
            is not None
        ):
            logger.info(f"Document {document_id} already indexed")
            return

    try:
        with Session(engine) as index_session:
            build_service = BuildService(
                llm=llm,
                dspy_lm=get_dspy_lm_by_llama_llm(llm),
            )

            build_service.build_vector_index_from_document(index_session, db_document)
    except Exception:
        with Session(engine) as session:
            error_msg = traceback.format_exc()
            logger.error(f"Error while indexing document {document_id}: {error_msg}")
            db_document.index_status = DocIndexTaskStatus.FAILED
            db_document.index_result = error_msg
            session.commit()
            return

    with Session(engine, expire_on_commit=False) as session:
        db_document.index_status = DocIndexTaskStatus.COMPLETED
        session.add(db_document)
        session.commit()
        logger.info(f"Document {document_id} indexed successfully")

        datasource = session.get(DataSource, db_document.data_source_id)
        if datasource and datasource.build_kg_index:
            for chunk in session.exec(
                select(DBChunk).where(DBChunk.document_id == document_id)
            ):
                build_kg_index_from_chunk.delay(chunk.id)


@celery_app.task
def build_kg_index_from_chunk(chunk_id: UUID):
    with Session(engine, expire_on_commit=False) as session:
        db_chunk = session.get(DBChunk, chunk_id)
        if db_chunk is None:
            logger.error(f"Chunk {chunk_id} not found")
            return

        if db_chunk.index_status not in (
            KgIndexStatus.PENDING,
            KgIndexStatus.NOT_STARTED,
        ):
            logger.info(f"Chunk {chunk_id} not in pending state")
            return

        llm = get_llm_by_data_source_id(session, db_chunk.document.data_source_id)

        db_chunk.index_status = KgIndexStatus.RUNNING
        session.commit()

    try:
        with Session(engine) as index_session:
            build_service = BuildService(
                llm=llm,
                dspy_lm=get_dspy_lm_by_llama_llm(llm),
            )
            build_service.build_kg_index_from_chunk(index_session, db_chunk)
    except Exception:
        with Session(engine) as session:
            error_msg = traceback.format_exc()
            logger.error(f"Error while indexing chunk {chunk_id}: {error_msg}")
            db_chunk.index_status = KgIndexStatus.FAILED
            db_chunk.index_result = error_msg
            session.commit()
            return

    with Session(engine, expire_on_commit=False) as session:
        db_chunk.index_status = KgIndexStatus.COMPLETED
        session.add(db_chunk)
        session.commit()
        logger.info(f"Chunk {chunk_id} indexed successfully")
