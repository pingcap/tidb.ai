from datetime import datetime

from pydantic import BaseModel

from app.api.admin_routes.models import DataSourceDescriptor, KnowledgeBaseDescriptor
from app.models import DocIndexTaskStatus
from app.types import MimeTypes

class DocumentItem(BaseModel):
    id: int
    hash: str
    name: str
    content: str
    mime_type: MimeTypes | None
    source_uri: str  | None
    meta: dict | list | None
    index_status: DocIndexTaskStatus  | None
    index_result: str | None
    data_source: DataSourceDescriptor | None
    knowledge_base: KnowledgeBaseDescriptor | None
    last_modified_at: datetime
    created_at: datetime
    updated_at: datetime