import logging
from typing import Any, List, Optional

from llama_index.core.schema import BaseNode, MetadataMode, TextNode
from llama_index.core.bridge.pydantic import PrivateAttr
from llama_index.core.vector_stores.types import (
    BasePydanticVectorStore,
    VectorStoreQuery,
    VectorStoreQueryResult,
)
from llama_index.core.vector_stores.utils import (
    metadata_dict_to_node,
    node_to_metadata_dict,
)
from sqlmodel import Session, delete, select, asc

from app.core.db import engine
from app.models import Chunk as DBChunk

_logger = logging.getLogger(__name__)


class TiDBVectorStore(BasePydanticVectorStore):
    _session: Session = PrivateAttr()
    _owns_session: bool = PrivateAttr()

    stores_text = True
    flat_metadata = False

    def __init__(self, session: Optional[Session] = None, **kwargs: Any) -> None:
        self._session = session
        self._owns_session = session is None
        if self._session is None:
            self._session = Session(engine)
        super().__init__(**kwargs)

    def close_session(self) -> None:
        # Always call this method is necessary to make sure the session is closed
        if self._owns_session:
            self._session.close()

    @property
    def client(self) -> Any:
        """Get client."""
        return engine

    @classmethod
    def class_name(cls) -> str:
        return "TiDBVectorStore"

    def add(self, nodes: List[BaseNode], **add_kwargs: Any) -> List[str]:
        """
        Add nodes to the vector store.

        Args:
            nodes (List[BaseNode]): List of nodes to be added.
            **add_kwargs: Additional keyword arguments to be passed to the underlying storage.

        Returns:
            List[str]: List of node IDs that were added.
        """
        items = []
        for n in nodes:
            items.append(
                {
                    "id": n.node_id,
                    "hash": n.hash,
                    "text": n.get_content(metadata_mode=MetadataMode.NONE),
                    "meta": node_to_metadata_dict(n, remove_text=True),
                    "embedding": n.get_embedding(),
                    "document_id": n.ref_doc_id,
                }
            )

        self._session.bulk_insert_mappings(DBChunk, items)
        self._session.commit()
        return [i["id"] for i in items]

    def delete(self, ref_doc_id: str, **delete_kwargs: Any) -> None:
        """
        Delete all nodes of a document from the vector store.

        Args:
            ref_doc_id (str): The reference document ID to be deleted.
            **delete_kwargs: Additional keyword arguments to be passed to the delete method.

        Returns:
            None
        """
        assert ref_doc_id.isdigit(), "ref_doc_id must be an integer."
        delete_stmt = delete(DBChunk).where(DBChunk.document_id == int(ref_doc_id))
        self._session.exec(delete_stmt)
        self._session.commit()

    def query(self, query: VectorStoreQuery, **kwargs: Any) -> VectorStoreQueryResult:
        """
        Perform a similarity search with the given query embedding.

        Args:
            query (VectorStoreQuery): The query object containing the query data.
            **kwargs: Additional keyword arguments.

        Returns:
            VectorStoreQueryResult: The result of the similarity search.

        Raises:
            ValueError: If the query embedding is not provided.
        """
        # TODO:
        # - Support advanced query filters
        # - Support both pre-filter and post-filter
        if query.query_embedding is None:
            raise ValueError("Query embedding must be provided.")

        stmt = select(
            DBChunk.id,
            DBChunk.text,
            DBChunk.meta,
            DBChunk.embedding.cosine_distance(query.query_embedding).label("distance"),
        )

        if query.filters:
            for f in query.filters.filters:
                stmt = stmt.where(DBChunk.meta[f.key] == f.value)

        stmt = stmt.order_by(asc("distance")).limit(query.similarity_top_k)
        results = self._session.exec(stmt)

        nodes = []
        similarities = []
        ids = []
        for row in results:
            try:
                node = metadata_dict_to_node(row.meta)
                node.set_content(row.text)
            except Exception:
                # NOTE: deprecated legacy logic for backward compatibility
                _logger.warning(
                    "Failed to parse metadata dict, falling back to legacy logic."
                )
                node = TextNode(
                    id_=row.id,
                    text=row.text,
                    metadata=row.meta,
                )
            similarities.append((1 - row.distance) if row.distance is not None else 0)
            ids.append(row.id)
            nodes.append(node)
        return VectorStoreQueryResult(
            nodes=nodes,
            similarities=similarities,
            ids=ids,
        )
