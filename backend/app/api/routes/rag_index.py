from fastapi import APIRouter
from sqlmodel import select, func

from app.api.deps import SessionDep, CurrentSuperuserDep
from app.models import Document, Chunk

router = APIRouter()


@router.get("/rag/index-progress")
def status(session: SessionDep, user: CurrentSuperuserDep):
    statement = (
        select(Chunk.index_status, func.count(Chunk.id))
        .group_by(Chunk.index_status)
        .order_by(Chunk.index_status)
    )
    status = session.exec(statement).all()
    chunk_index_status = {s: c for s, c in status}

    statement = (
        select(Document.index_status, func.count(Document.id))
        .group_by(Document.index_status)
        .order_by(Document.index_status)
    )
    status = session.exec(statement).all()
    document_index_status = {s: c for s, c in status}

    return {
        "kg_index": chunk_index_status,
        "vector_index": document_index_status,
    }
