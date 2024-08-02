from typing import Optional, List

from fastapi import APIRouter
from app.models import Document
from app.api.deps import SessionDep, CurrentSuperuserDep
from app.rag.retrieve import RetrieveService

router = APIRouter()


@router.get("/admin/retrieve/documents")
async def retrieve_documents(
    session: SessionDep,
    user: CurrentSuperuserDep,
    question: str,
    chat_engine: str = "default",
    top_k: Optional[int] = None,
) -> List[Document]:
    retrieve_service = RetrieveService(session, chat_engine)
    return retrieve_service.retrieve(question, top_k=top_k)
