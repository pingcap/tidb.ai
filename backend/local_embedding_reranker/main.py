import os
import sys
import logging
import uvicorn
from pydantic import BaseModel
from fastapi import FastAPI, APIRouter
from sentence_transformers import SentenceTransformer, CrossEncoder
from contextlib import asynccontextmanager

logging.basicConfig(
    format="%(asctime)s - %(name)s:%(lineno)d - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)


DEFAULT_EMBEDDING_MODEL = os.environ.get("DEFAULT_EMBEDDING_MODEL", "BAAI/bge-m3")
DEFAULT_RERANKER_MODEL = os.environ.get(
    "DEFAULT_RERANKER_MODEL", "BAAI/bge-reranker-v2-m3"
)
router = APIRouter()


@router.get("/healthz")
def healthz():
    return "OK"


EMBEDDING_MODEL_DICT: dict[str, SentenceTransformer] = {}
RERANKER_MODEL_DICT: dict[str, CrossEncoder] = {}


def get_embedding_model(model_name: str) -> SentenceTransformer:
    global EMBEDDING_MODEL_DICT
    embed_model = EMBEDDING_MODEL_DICT.get(model_name)
    if not embed_model:
        embed_model = SentenceTransformer(
            model_name_or_path=model_name,
            trust_remote_code=True,
        )
        EMBEDDING_MODEL_DICT[model_name] = embed_model
    return embed_model


def get_reranker_model(model_name: str) -> CrossEncoder:
    global RERANKER_MODEL_DICT
    reranker_model = RERANKER_MODEL_DICT.get(model_name)
    if not reranker_model:
        reranker_model = CrossEncoder(
            model_name=model_name,
            automodel_args={"torch_dtype": "auto"},
            trust_remote_code=True,
        )
        RERANKER_MODEL_DICT[model_name] = reranker_model
    return reranker_model


class EmbeddingRequest(BaseModel):
    sentences: list[str]
    model: str = DEFAULT_EMBEDDING_MODEL
    normalize_embeddings: bool = True


class EmbeddingResponse(BaseModel):
    model: str
    embeddings: list[list]


@router.post("/embedding")
def get_texts_embedding(request: EmbeddingRequest) -> EmbeddingResponse:
    embed_model = get_embedding_model(model_name=request.model)
    embeddings = embed_model.encode(
        sentences=request.sentences,
        normalize_embeddings=request.normalize_embeddings,
    )
    return EmbeddingResponse(
        model=request.model,
        embeddings=embeddings.tolist(),
    )


class RerankerRequest(BaseModel):
    model: str = DEFAULT_RERANKER_MODEL
    query: str
    passages: list[str]


class RerankerResponse(BaseModel):
    model: str
    scores: list[float]


@router.post("/reranker")
def reranker_texts(request: RerankerRequest) -> RerankerResponse:
    reranker_model = get_reranker_model(request.model)
    sentence_pairs = [(request.query, p) for p in request.passages]
    scores = reranker_model.predict(sentence_pairs, convert_to_tensor=True)
    return RerankerResponse(model=request.model, scores=scores.tolist())


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Loading default embedding and reranker models...")
    get_embedding_model(DEFAULT_EMBEDDING_MODEL)
    get_reranker_model(DEFAULT_RERANKER_MODEL)
    logger.info("Default embedding and reranker models loaded")
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(router=router, prefix="/api/v1")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)
