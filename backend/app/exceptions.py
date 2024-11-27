from http import HTTPStatus
from fastapi import HTTPException


class InternalServerError(HTTPException):
    def __init__(self):
        super().__init__(HTTPStatus.INTERNAL_SERVER_ERROR)


class ChatException(Exception):
    pass


class ChatNotFound(ChatException):
    pass


class DBLLMNotFoundError(HTTPException):
    status_code = 404

    def __init__(self, llm_id: int):
        self.detail = f"llm #{llm_id} is not found"


class DefaultLLMNotFoundError(HTTPException):
    status_code = 404

    def __init__(self):
        self.detail = f"default llm is not found"


class DefaultEmbeddingModelNotFoundError(HTTPException):
    status_code = 404

    def __init__(self):
        self.detail = f"default embedding model is not found"


class DBRerankerNotFoundError(HTTPException):
    status_code = 404

    def __init__(self, reranker_id: int):
        self.detail = f"reranker #{reranker_id} is not found"

class DefaultRerankerNotFoundError(HTTPException):
    status_code = 404

    def __init__(self):
        self.detail = f"default reranker is not found"


class KnowledgeBaseNotFoundError(HTTPException):
    status_code = 404

    def __init__(self, knowledge_base_id: int):
        self.detail = f"knowledge base #{knowledge_base_id} is not found"

class KBDataSourceNotFoundError(HTTPException):
    status_code = 404

    def __init__(self, kb_id: int, data_source_id: int):
        self.detail = f"data source #{data_source_id} is not found in knowledge base #{kb_id}"

class KBNoLLMConfiguredError(HTTPException):
    status_code = 500

    def __init__(self):
        self.detail = f"Must configured a LLM for knowledge base"


class KBNoEmbedModelConfiguredError(HTTPException):
    status_code = 500

    def __init__(self):
        self.detail = f"Must configured a embedding model for knowledge base"


class KBNoVectorIndexConfiguredError(HTTPException):
    status_code = 500

    def __init__(self):
        self.detail = f"Must configured vector index as one of the index method for knowledge base, which is required for now"


class EmbeddingModelNotFoundError(HTTPException):
    status_code = 404

    def __init__(self, model_id: int):
        self.detail = f"Embedding model with id {model_id} not found"


class NotAllowedUpdateEmbeddingModel(HTTPException):
    status_code = 500

    def __init__(self):
        self.detail = f"Doesn't allowed update embedding model once knowledge base been created"