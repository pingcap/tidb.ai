import re
from typing import Callable, Any, Dict, List, Optional, Sequence
from llama_index.core.bridge.pydantic import Field, PrivateAttr

from llama_index.core.callbacks.base import CallbackManager
from llama_index.core.node_parser.interface import NodeParser
from llama_index.core.node_parser.node_utils import build_nodes_from_splits
from llama_index.core.schema import BaseNode, MetadataMode, TextNode
from llama_index.core.utils import get_tqdm_iterable


class MarkdownNodeParser(NodeParser):
    """Markdown node parser.

    Splits a document into Nodes using custom Markdown splitting logic.

    Args:
        include_metadata (bool): whether to include metadata in nodes
        include_prev_next_rel (bool): whether to include prev/next relationships
        chunk_header_level (int): The header level to split on
    """

    chunk_header_level: int = Field(
        default=2,
        description="The header level to split on",
    )

    _tokenizer: Callable = PrivateAttr()

    def __init__(
        self,
        chunk_header_level: int = 2,
        include_metadata: bool = True,
        include_prev_next_rel: bool = True,
        callback_manager: Optional[CallbackManager] = None,
    ):
        super().__init__(
            include_metadata=include_metadata,
            include_prev_next_rel=include_prev_next_rel,
            callback_manager=callback_manager or CallbackManager([]),
        )

        if chunk_header_level < 1 or chunk_header_level > 6:
            raise ValueError("chunk_header_level must be between 1 and 6")

        self.chunk_header_level = chunk_header_level

    @classmethod
    def from_defaults(
        cls,
        chunk_header_level: int = 2,
        include_metadata: bool = True,
        include_prev_next_rel: bool = True,
        callback_manager: Optional[CallbackManager] = None,
    ) -> "MarkdownNodeParser":
        callback_manager = callback_manager or CallbackManager([])

        if chunk_header_level < 1 or chunk_header_level > 6:
            raise ValueError("chunk_header_level must be between 1 and 6")

        return cls(
            chunk_header_level,
            include_metadata=include_metadata,
            include_prev_next_rel=include_prev_next_rel,
            callback_manager=callback_manager,
        )

    @classmethod
    def class_name(cls) -> str:
        """Get class name."""
        return "MarkdownNodeParser"

    def _parse_nodes(
        self,
        nodes: Sequence[BaseNode],
        show_progress: bool = False,
        **kwargs: Any,
    ) -> List[BaseNode]:
        all_nodes: List[BaseNode] = []
        nodes_with_progress = get_tqdm_iterable(nodes, show_progress, "Parsing nodes")

        for node in nodes_with_progress:
            nodes = self.get_nodes_from_node(node)
            all_nodes.extend(nodes)

        return all_nodes

    def get_nodes_from_node(self, node: BaseNode) -> List[TextNode]:
        """Get nodes from document."""
        text = node.get_content(metadata_mode=MetadataMode.NONE)
        markdown_nodes = []
        lines = text.split("\n")
        metadata: Dict[str, str] = {}
        code_block = False
        current_section = ""
        first_header = True

        for line in lines:
            if line.lstrip().startswith("```"):
                code_block = not code_block
            header_match = re.match(
                r"^(#{1," + str(self.chunk_header_level) + "})\s(.*)", line
            )
            if header_match and not code_block:
                header = f"{header_match.group(1)} {header_match.group(2)}\n"
                if first_header:
                    # If this is the first header, add it to the current section,
                    # do not create a new node
                    first_header = False
                    current_section += header
                else:
                    if current_section != "":
                        markdown_nodes.append(
                            self._build_node_from_split(
                                current_section.strip(), node, metadata
                            )
                        )
                    metadata = self._update_metadata(
                        metadata,
                        header_match.group(2),
                        len(header_match.group(1).strip()),
                    )
                    current_section = header
            else:
                current_section += line + "\n"

        markdown_nodes.append(
            self._build_node_from_split(current_section.strip(), node, metadata)
        )

        return markdown_nodes

    def _update_metadata(
        self, headers_metadata: dict, new_header: str, new_header_level: int
    ) -> dict:
        """Update the markdown headers for metadata.

        Removes all headers that are equal or less than the level
        of the newly found header
        """
        updated_headers = {}

        for i in range(1, new_header_level):
            key = f"Header_{i}"
            if key in headers_metadata:
                updated_headers[key] = headers_metadata[key]

        updated_headers[f"Header_{new_header_level}"] = new_header
        return updated_headers

    def _build_node_from_split(
        self,
        text_split: str,
        node: BaseNode,
        metadata: dict,
    ) -> TextNode:
        """Build node from single text split."""
        node = build_nodes_from_splits([text_split], node, id_func=self.id_func)[0]

        if self.include_metadata:
            node.metadata = {**node.metadata, **metadata}

        return node
