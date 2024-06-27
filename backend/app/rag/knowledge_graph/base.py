import dspy
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional, Sequence, Tuple

from llama_index.core.data_structs import IndexLPG
from llama_index.core.callbacks import CallbackManager, trace_method
from llama_index.core.callbacks.schema import CBEventType, EventPayload
from llama_index.core.indices.base import BaseIndex
from llama_index.core.storage.docstore.types import RefDocInfo
from llama_index.core.storage.storage_context import StorageContext
from llama_index.core.schema import BaseNode, TransformComponent
import llama_index.core.instrumentation as instrument

from app.rag.knowledge_graph.extractor import SimpleGraphExtractor

dispatcher = instrument.get_dispatcher(__name__)


class KnowledgeGraphStore(ABC):
    @abstractmethod
    def save(self, entities_df, relationships_df) -> None:
        """Upsert entities and relationships to the graph store."""
        pass

    @abstractmethod
    def retrieve_with_weight(
        self,
        query: str,
        embedding: list,
        depth: int = 2,
        include_meta: bool = False,
        with_degree: bool = False,
        relationship_meta_filters: Dict = {},
    ) -> Tuple[list, list, list]:
        """Retrieve nodes and relationships with weights."""
        pass


class KnowledgeGraphIndex(BaseIndex[IndexLPG]):
    """An index for a property graph.

    Args:
        nodes (Optional[Sequence[BaseNode]]):
            A list of nodes to insert into the index.
        dspy_lm (dspy.BaseLLM):
            The language model of dspy to use for extracting triplets.
        callback_manager (Optional[CallbackManager]):
            The callback manager to use.
        transformations (Optional[List[TransformComponent]]):
            A list of transformations to apply to the nodes before inserting them into the index.
            These are applied prior to the `kg_extractors`.
        storage_context (Optional[StorageContext]):
            The storage context to use.
        show_progress (bool):
            Whether to show progress bars for transformations. Defaults to `False`.
    """

    index_struct_cls = IndexLPG

    def __init__(
        self,
        dspy_lm: dspy.LM,
        kg_store: KnowledgeGraphStore,
        nodes: Optional[Sequence[BaseNode]] = None,
        # parent class params
        callback_manager: Optional[CallbackManager] = None,
        transformations: Optional[List[TransformComponent]] = None,
        storage_context: Optional[StorageContext] = None,
        show_progress: bool = False,
        **kwargs: Any,
    ) -> None:
        self._dspy_lm = dspy_lm
        self._kg_store = kg_store

        super().__init__(
            nodes=nodes,
            callback_manager=callback_manager,
            storage_context=storage_context,
            transformations=transformations,
            show_progress=show_progress,
            **kwargs,
        )

    @classmethod
    def from_existing(
        cls: "KnowledgeGraphIndex",
        dspy_lm: dspy.LM,
        kg_store: KnowledgeGraphStore,
        callback_manager: Optional[CallbackManager] = None,
        transformations: Optional[List[TransformComponent]] = None,
        storage_context: Optional[StorageContext] = None,
        show_progress: bool = False,
        **kwargs: Any,
    ) -> "KnowledgeGraphIndex":
        return cls(
            dspy_lm=dspy_lm,
            kg_store=kg_store,
            nodes=[],  # no nodes to insert
            callback_manager=callback_manager,
            transformations=transformations,
            storage_context=storage_context,
            show_progress=show_progress,
            **kwargs,
        )

    def _insert_nodes(self, nodes: Sequence[BaseNode]):
        """Insert nodes to the index struct."""
        if len(nodes) == 0:
            return nodes

        extractor = SimpleGraphExtractor(dspy_lm=self._dspy_lm)
        for node in nodes:
            entities_df, rel_df = extractor.extract(
                text=node.get_content(), doc_id=node.node_id
            )
            self._kg_store.save(node.node_id, entities_df, rel_df)

    def _build_index_from_nodes(self, nodes: Optional[Sequence[BaseNode]]) -> IndexLPG:
        """Build index from nodes."""
        nodes = self._insert_nodes(nodes or [])
        # this isn't really used or needed
        return IndexLPG()

    def as_retriever(self, **kwargs: Any):
        """Return a retriever for the index."""
        # Our retriever params is more complex than the base retriever,
        # so we can't use the base retriever.
        raise NotImplementedError(
            "Retriever not implemented for KnowledgeGraphIndex, use `retrieve_with_weight` instead."
        )

    def retrieve_with_weight(
        self,
        query: str,
        embedding: list,
        depth: int = 2,
        include_meta: bool = False,
        with_degree: bool = False,
        # experimental feature to filter relationships based on meta, can be removed in the future
        relationship_meta_filters: Dict = {},
    ) -> Tuple[list, list, list]:
        """Retrieve entities, relations, and chunks with weights."""
        params = {
            "query": query,
            "depth": depth,
            "include_meta": include_meta,
            "with_degree": with_degree,
            "relationship_meta_filters": relationship_meta_filters,
        }
        with self._callback_manager.as_trace("retrieve_with_weight"):
            with self._callback_manager.event(
                CBEventType.RETRIEVE, payload={EventPayload.QUERY_STR: params}
            ) as event:
                entities, relations, chunks = self._kg_store.retrieve_with_weight(
                    query,
                    embedding,
                    depth,
                    include_meta,
                    with_degree,
                    relationship_meta_filters,
                )
                event.on_end(
                    payload={
                        "entities": entities,
                        "relations": relations,
                        "chunks": chunks,
                    },
                )
        return entities, relations, chunks

    def _delete_node(self, node_id: str, **delete_kwargs: Any) -> None:
        """Delete a node."""
        raise NotImplementedError(
            "Delete node not implemented for KnowledgeGraphIndex."
        )

    def _insert(self, nodes: Sequence[BaseNode], **insert_kwargs: Any) -> None:
        """Index-specific logic for inserting nodes to the index struct."""
        self._insert_nodes(nodes)

    def ref_doc_info(self) -> Dict[str, RefDocInfo]:
        """Retrieve a dict mapping of ingested documents and their nodes+metadata."""
        raise NotImplementedError(
            "Ref doc info not implemented for KnowledgeGraphIndex. "
            "All inserts are already upserts."
        )
