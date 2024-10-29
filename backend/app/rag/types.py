import enum
from typing import Any
from pydantic import BaseModel


class MessageRole(str, enum.Enum):
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"


# Cannot reuse the llama-index's ChatMessage
# because it use pydantic v1 and this project use pydantic v2.
# https://github.com/run-llama/llama_index/issues/13477
class ChatMessage(BaseModel):
    role: MessageRole = MessageRole.USER
    content: str = ""
    additional_kwargs: dict[str, Any] = {}


# Langfuse needs an enum class for event types,
# but the CBEventType in llama-index does not have sufficient types.
class MyCBEventType(str, enum.Enum):
    CHUNKING = "chunking"
    NODE_PARSING = "node_parsing"
    EMBEDDING = "embedding"
    LLM = "llm"
    QUERY = "query"
    RETRIEVE = "retrieve"
    SYNTHESIZE = "synthesize"
    TREE = "tree"
    SUB_QUESTION = "sub_question"
    TEMPLATING = "templating"
    FUNCTION_CALL = "function_call"
    RERANKING = "reranking"
    EXCEPTION = "exception"
    AGENT_STEP = "agent_step"
    CONDENSE_QUESTION = "condense_question"
    RETRIEVE_FROM_GRAPH = "retrieve_from_graph"
    INTENT_DECOMPOSITION = "intent_decomposition"
    GRAPH_SEMANTIC_SEARCH = "graph_semantic_search"


# Chat stream response event types
class ChatEventType(int, enum.Enum):
    # Following vercel ai sdk's event type
    # https://github.com/vercel/ai/blob/84871281ab5a2c080e3f8e18d02cd09c7e1691c4/packages/ui-utils/src/stream-parts.ts#L368
    TEXT_PART = 0
    DATA_PART = 2
    ERROR_PART = 3
    MESSAGE_ANNOTATIONS_PART = 8


class ChatMessageSate(int, enum.Enum):
    TRACE = 0
    SOURCE_NODES = 1
    KG_RETRIEVAL = 2
    REFINE_QUESTION = 3
    SEARCH_RELATED_DOCUMENTS = 4
    GENERATE_ANSWER = 5
    FINISHED = 9
    # See https://github.com/pingcap/tidb.ai/issues/345
    EXTERNAL_STREAM_START = 10
