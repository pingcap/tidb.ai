from sqlmodel import Session, func, select

from app.models import Chunk


def import_status_overview(session: Session):
    statement = (
        select(Chunk.import_status, func.count(Chunk.id))
        .group_by(Chunk.import_status)
        .order_by(Chunk.import_status)
    )
    status = session.execute(statement).all()
    return {s: c for s, c in status}
