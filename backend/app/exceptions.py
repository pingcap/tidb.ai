from http import HTTPStatus
from fastapi import HTTPException

# Common

class InternalServerError(HTTPException):
    def __init__(self):
        super().__init__(HTTPStatus.INTERNAL_SERVER_ERROR)

# Chat

class ChatException(Exception):
    pass

class ChatNotFound(ChatException):
    pass


# LLM

class LLMNotFoundError(HTTPException):
    status_code = 404

    def __init__(self, llm_id: int):
        self.detail = f"llm #{llm_id} is not found"

class DefaultLLMNotFoundError(HTTPException):
    status_code = 404

    def __init__(self):
        self.detail = f"default llm is not found"


# Embedding model

class EmbeddingModelNotFoundError(HTTPException):
    status_code = 404

    def __init__(self, model_id: int):
        self.detail = f"embedding model with id {model_id} not found"

class DefaultEmbeddingModelNotFoundError(HTTPException):
    status_code = 404

    def __init__(self):
        self.detail = f"default embedding model is not found"


# Reranker model

class RerankerModelNotFoundError(HTTPException):
    status_code = 404

    def __init__(self, model_id: int):
        self.detail = f"reranker model #{model_id} not found"

class DefaultRerankerModelNotFoundError(HTTPException):
    status_code = 404

    def __init__(self):
        self.detail = f"default reranker model is not found"


# Knowledge base

class KBNotFoundError(HTTPException):
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
        self.detail = f"must configured a LLM for knowledge base"

class KBNoEmbedModelConfiguredError(HTTPException):
    status_code = 500

    def __init__(self):
        self.detail = f"must configured a embedding model for knowledge base"

class KBNoVectorIndexConfiguredError(HTTPException):
    status_code = 500

    def __init__(self):
        self.detail = f"must configured vector index as one of the index method for knowledge base, which is required for now"

class KBNotAllowedUpdateEmbedModel(HTTPException):
    status_code = 500

    def __init__(self):
        self.detail = f"update embedding model is not allowed once the knowledge base has been created"