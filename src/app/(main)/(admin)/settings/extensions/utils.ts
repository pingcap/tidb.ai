import { ArchiveIcon, ArrowDownWideNarrowIcon, BinaryIcon, CpuIcon, HardDriveDownloadIcon, type LucideIcon, ScanTextIcon, SplitSquareVerticalIcon, WorkflowIcon } from 'lucide-react';

export const enum ExtensionCategory {
  LOADER = 'rag.loader',
  TASK_PROCESSOR = 'rag.import-source-task',
  EMBEDDINGS = 'rag.embeddings',
  CHAT_MODEL = 'rag.chat-model',
  DOCUMENT_STORAGE = 'rag.document-storage',
  PROMPTING = 'rag.prompting',
  RERANKER = 'rag.reranker',
}

export type ExtensionDef = {
  test: RegExp
  category: ExtensionCategory
  title: string
  icon: LucideIcon
  playground: boolean
}

export const extensionsDefs: ExtensionDef[] = [
  { category: ExtensionCategory.LOADER, test: /\.loader\./, title: 'Loader', icon: ScanTextIcon, playground: false },
  { category: ExtensionCategory.TASK_PROCESSOR, test: /\.import-source-task\./, title: 'Task processor', icon: HardDriveDownloadIcon, playground: false },
  { category: ExtensionCategory.EMBEDDINGS, test: /\.embeddings\./, title: 'Embeddings', icon: BinaryIcon, playground: false },
  { category: ExtensionCategory.CHAT_MODEL, test: /\.chat-model\./, title: 'Chat model', icon: CpuIcon, playground: false },
  { category: ExtensionCategory.DOCUMENT_STORAGE, test: /\.document-storage\./, title: 'Document storage', icon: ArchiveIcon, playground: false },
  { category: ExtensionCategory.PROMPTING, test: /\.prompting\./, title: 'Prompting', icon: WorkflowIcon, playground: false },
  { category: ExtensionCategory.RERANKER, test: /\.reranker\./, title: 'Reranker', icon: ArrowDownWideNarrowIcon, playground: false },
];

export function getDef (identifier: string) {
  return extensionsDefs.find(def => def.test.test(identifier));
}
