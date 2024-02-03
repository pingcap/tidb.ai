import { fetcher } from '@/lib/fetch';
import { ArchiveIcon, BinaryIcon, CpuIcon, HardDriveDownloadIcon, type LucideIcon, ScanTextIcon, SplitSquareVerticalIcon } from 'lucide-react';

export const enum ExtensionCategory {
  LOADER = 'rag.loader',
  SPLITTER = 'rag.splitter',
  TASK_PROCESSOR = 'rag.import-source-task',
  EMBEDDINGS = 'rag.embeddings',
  CHAT_MODEL = 'rag.chat-model',
  DOCUMENT_STORAGE = 'rag.document-storage'
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
  { category: ExtensionCategory.SPLITTER, test: /\.splitter\./, title: 'Splitter', icon: SplitSquareVerticalIcon, playground: true },
  { category: ExtensionCategory.TASK_PROCESSOR, test: /\.import-source-task\./, title: 'Task processor', icon: HardDriveDownloadIcon, playground: false },
  { category: ExtensionCategory.EMBEDDINGS, test: /\.embeddings\./, title: 'Embeddings', icon: BinaryIcon, playground: false },
  { category: ExtensionCategory.CHAT_MODEL, test: /\.chat-model\./, title: 'Chat model', icon: CpuIcon, playground: false },
  { category: ExtensionCategory.DOCUMENT_STORAGE, test: /\.document-storage\./, title: 'Document storage', icon: ArchiveIcon, playground: false },
];

export function getDef (identifier: string) {
  return extensionsDefs.find(def => def.test.test(identifier));
}
