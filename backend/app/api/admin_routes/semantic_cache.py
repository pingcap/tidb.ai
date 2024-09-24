from typing import Optional, List

from fastapi import APIRouter
from app.models import Document
from app.api.deps import SessionDep, CurrentSuperuserDep
from app.rag.chat_config import ChatEngineConfig, get_default_embedding_model
from app.rag.semantic_cache import SemanticCacheManager, SemanticItem

router = APIRouter()

@router.post("/admin/semantic_cache")
async def retrieve_documents(
    session: SessionDep,
    user: CurrentSuperuserDep,
    question: str,
    answer: str,
    namespace: str = "default",
    metadata: Optional[dict] = None,
    chat_engine: str = "default",
) -> List[Document]:
    chat_engine_config = ChatEngineConfig.load_from_db(session, chat_engine)
    _dspy_lm = chat_engine_config.get_dspy_lm(session)

    scm = SemanticCacheManager(
        dspy_llm=_dspy_lm,
    )

    return scm.add_cache(
        session,
        item=SemanticItem(question=question, answer=answer),
        namespace=namespace,
        metadata=metadata,
    )


@router.get("/admin/semantic_cache")
async def retrieve_documents(
    session: SessionDep,
    user: CurrentSuperuserDep,
    query: str,
    namespace: str = "default",
    chat_engine: str = "default",
) -> List[Document]:
    chat_engine_config = ChatEngineConfig.load_from_db(session, chat_engine)
    _dspy_lm = chat_engine_config.get_dspy_lm(session)

    scm = SemanticCacheManager(
        dspy_llm=_dspy_lm,
    )

    return scm.search(
        session=session,
        query=query,
        namespace=namespace,
    )
