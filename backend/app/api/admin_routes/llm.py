import logging
from typing import List
from pydantic import BaseModel

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_pagination import Params, Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import select, update
from langfuse import Langfuse
from llama_index.core.schema import NodeWithScore, TextNode

from app.core.config import settings
from app.api.deps import SessionDep, CurrentSuperuserDep
from app.rag.llm_option import admin_llm_options, LLMOption
from app.rag.embed_model_option import admin_embed_model_options, EmbeddingModelOption
from app.rag.reranker_model_option import (
    admin_reranker_model_options,
    RerankerModelOption,
)
from app.rag.chat_config import get_llm, get_embedding_model, get_reranker_model
from app.models import (
    ChatEngine,
    LLM,
    AdminLLM,
    EmbeddingModel,
    AdminEmbeddingModel,
    RerankerModel,
    AdminRerankerModel,
)

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/admin/llms/options")
def get_llm_options(user: CurrentSuperuserDep) -> List[LLMOption]:
    return admin_llm_options


@router.get("/admin/llms")
def list_llms(
    session: SessionDep,
    user: CurrentSuperuserDep,
    params: Params = Depends(),
) -> Page[AdminLLM]:
    return paginate(
        session,
        select(LLM).order_by(LLM.created_at.desc()),
        params,
    )


@router.post("/admin/llms")
def create_llm(
    llm: LLM,
    session: SessionDep,
    user: CurrentSuperuserDep,
) -> AdminLLM:
    session.add(llm)
    session.commit()
    session.refresh(llm)
    return llm


class LLMTestResult(BaseModel):
    success: bool
    error: str = ""


@router.post("/admin/llms/test")
def test_llm(
    db_llm: LLM,
    user: CurrentSuperuserDep,
) -> LLMTestResult:
    try:
        llm = get_llm(
            provider=db_llm.provider,
            model=db_llm.model,
            config=db_llm.config,
            credentials=db_llm.credentials,
        )
        response = llm.complete("Who are you?")
        success = True
        error = ""
    except Exception as e:
        logger.debug(e)
        success = False
        error = str(e)
    return LLMTestResult(success=success, error=error)


@router.get("/admin/llms/{llm_id}")
def get_llm_detail(
    llm_id: int,
    session: SessionDep,
    user: CurrentSuperuserDep,
) -> AdminLLM:
    llm = session.get(LLM, llm_id)
    if llm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="LLM not found"
        )
    return llm


@router.delete("/admin/llms/{llm_id}")
def delete_llm(
    llm_id: int,
    session: SessionDep,
    user: CurrentSuperuserDep,
) -> AdminLLM:
    llm = session.get(LLM, llm_id)
    if llm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="LLM not found"
        )
    session.exec(
        update(ChatEngine).where(ChatEngine.llm_id == llm_id).values(llm_id=None)
    )
    session.exec(
        update(ChatEngine)
        .where(ChatEngine.fast_llm_id == llm_id)
        .values(fast_llm_id=None)
    )
    session.delete(llm)
    session.commit()
    return llm


@router.get("/admin/embedding-model/options")
def get_embedding_model_options(
    user: CurrentSuperuserDep,
) -> List[EmbeddingModelOption]:
    return admin_embed_model_options


@router.post("/admin/embedding-model/test")
def test_embedding_model(
    db_embed_model: EmbeddingModel,
    user: CurrentSuperuserDep,
) -> LLMTestResult:
    try:
        embed_model = get_embedding_model(
            provider=db_embed_model.provider,
            model=db_embed_model.model,
            config=db_embed_model.config,
            credentials=db_embed_model.credentials,
        )
        embedding = embed_model.get_query_embedding("Hello, world!")
        expected_length = settings.EMBEDDOMG_DIMS
        if len(embedding) != expected_length:
            raise ValueError(
                f"Currently we only support {expected_length} dims embedding, got {len(embedding)} dims."
            )
        success = True
        error = ""
    except Exception as e:
        success = False
        error = str(e)
    return LLMTestResult(success=success, error=error)


@router.get("/admin/embedding-model")
def get_embedding_model_detail(
    session: SessionDep,
    user: CurrentSuperuserDep,
) -> AdminEmbeddingModel:
    db_embedding_model = session.exec(select(EmbeddingModel).limit(1)).first()
    if db_embedding_model is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Embedding model not found"
        )
    return db_embedding_model


@router.post("/admin/embedding-model")
def create_embedding_model(
    embed_model: EmbeddingModel,
    session: SessionDep,
    user: CurrentSuperuserDep,
) -> AdminEmbeddingModel:
    db_embedding_model = session.exec(select(EmbeddingModel).limit(1)).first()
    if db_embedding_model is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Embedding model already exists",
        )
    session.add(embed_model)
    session.commit()
    session.refresh(embed_model)
    return embed_model


class LangfuseSetting(BaseModel):
    host: str = "https://us.cloud.langfuse.com"
    public_key: str
    secret_key: str


class LangfuseTestResult(BaseModel):
    success: bool
    error: str = ""


@router.post("/admin/langfuse/test")
def test_langfuse(
    user: CurrentSuperuserDep,
    request: LangfuseSetting,
) -> LangfuseTestResult:
    try:
        lf = Langfuse(
            host=request.host,
            secret_key=request.secret_key,
            public_key=request.public_key,
        )
        success = lf.auth_check()
        if not success:
            error = "Langfuse authentication failed, please check public_key, secret_key and host."
        else:
            error = ""
    except Exception as e:
        success = False
        error = str(e)
    return LangfuseTestResult(success=success, error=error)


@router.get("/admin/reranker-models/options")
def get_reranker_model_options(
    user: CurrentSuperuserDep,
) -> List[RerankerModelOption]:
    return admin_reranker_model_options


@router.post("/admin/reranker-models/test")
def test_reranker_model(
    db_reranker_model: RerankerModel,
    user: CurrentSuperuserDep,
) -> LLMTestResult:
    try:
        reranker = get_reranker_model(
            provider=db_reranker_model.provider,
            model=db_reranker_model.model,
            # for testing purpose, we only rerank 2 nodes
            top_n=2,
            config=db_reranker_model.config,
            credentials=db_reranker_model.credentials,
        )
        nodes = reranker.postprocess_nodes(
            nodes=[
                NodeWithScore(
                    node=TextNode(
                        text="TiDB is a distributed SQL database.",
                    ),
                    score=0.8,
                ),
                NodeWithScore(
                    node=TextNode(
                        text="TiDB is compatible with MySQL protocol.",
                    ),
                    score=0.6,
                ),
                NodeWithScore(
                    node=TextNode(
                        text="TiFlash is a columnar storage engine.",
                    ),
                    score=0.4,
                ),
            ],
            query_str="What is TiDB?",
        )
        success = True
        error = ""
    except Exception as e:
        success = False
        error = str(e)
    return LLMTestResult(success=success, error=error)


@router.get("/admin/reranker-models")
def list_reranker_models(
    session: SessionDep,
    user: CurrentSuperuserDep,
    params: Params = Depends(),
) -> Page[AdminRerankerModel]:
    return paginate(
        session,
        select(RerankerModel).order_by(RerankerModel.created_at.desc()),
        params,
    )


@router.post("/admin/reranker-models")
def create_reranker_model(
    reranker_model: RerankerModel,
    session: SessionDep,
    user: CurrentSuperuserDep,
) -> AdminRerankerModel:
    session.add(reranker_model)
    session.commit()
    session.refresh(reranker_model)
    return reranker_model


@router.get("/admin/reranker-models/{reranker_model_id}")
def get_reranker_model_detail(
    reranker_model_id: int,
    session: SessionDep,
    user: CurrentSuperuserDep,
) -> AdminRerankerModel:
    reranker_model = session.get(RerankerModel, reranker_model_id)
    if reranker_model is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Reranker model not found"
        )
    return reranker_model


@router.delete("/admin/reranker-models/{reranker_model_id}")
def delete_reranker_model(
    reranker_id: int,
    session: SessionDep,
    user: CurrentSuperuserDep,
):
    reranker_model = session.get(RerankerModel, reranker_id)
    if reranker_model is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Reranker model not found"
        )
    session.exec(
        update(ChatEngine)
        .where(ChatEngine.reranker_id == reranker_id)
        .values(reranker_id=None)
    )
    session.delete(reranker_model)
    session.commit()
