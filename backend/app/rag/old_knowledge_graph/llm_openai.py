import dspy
import openai
import json
from typing import Mapping, Any

from app.core.config import settings

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

oai_client = dspy.OpenAI(
    model="gpt-4o", api_key=settings.OPENAI_API_KEY, max_tokens=4096
)
dspy.settings.configure(lm=oai_client)


def get_query_embedding(query: str):
    response = client.embeddings.create(
        input=[query], model=settings.OPENAI_EMBEDDING_MODEL
    )
    return response.data[0].embedding


def get_entity_description_embedding(name: str, description: str):
    combined_text = f"{name}: {description}"
    return get_query_embedding(combined_text)


def get_entity_metadata_embedding(metadata: Mapping[str, Any]):
    combined_text = json.dumps(metadata)
    return get_query_embedding(combined_text)


def get_relationship_description_embedding(
    source_entity_name: str,
    source_entity_description,
    target_entity_name: str,
    target_entity_description: str,
    relationship_desc: str,
):
    combined_text = (
        f"{source_entity_name}({source_entity_description}) -> "
        f"{relationship_desc} -> {target_entity_name}({target_entity_description}) "
    )
    return get_query_embedding(combined_text)
